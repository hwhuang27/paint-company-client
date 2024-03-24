import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from './form/FormInput';
import FormButton from './form/FormButton';
import styled from 'styled-components';

const StyledForm = styled.form`
    font-family: serif;
    background-color: white;
    padding: 20px 40px;
    border: 4px outset grey;
    border-radius: 24px;
`
const HeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const HeaderText = styled.p`
    color: #739072;
    font-size: 40px;
    letter-spacing: 0.1rem;
    margin: 4px 0 12px;
`
const FormContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const LoginText = styled.p`
  display: inline;
  font-size: 22px;
`
const LoginLink = styled(Link)`
  font-size: 24px;
  color: #609966;
  margin-left: 6px;
  transition: all .15s ease-in-out;

  &:hover {
    color: #40513B;
  }
`
const ErrorMessage = styled.p`
    color: #ef4444;
    margin: 8px 0;
`

function SignupForm() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [role, setRole] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPass === "" || role === "") {
                setError('Fields cannot be empty');
                throw new Error('Fields cannot be empty');
            } else if (password !== confirmPass) {
                setError('Passwords do not match');
                throw new Error('Passwords do not match');
            } else if (!(role === "Painter" || role === "Manager" || role === "Admin")) {
                setError("Role must be either Painter, Manager or Admin");
                throw new Error("Role must be either Painter, Manager or Admin");
            }   

            const res = await fetch(`https://paint-company-api-production.up.railway.app/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    password: password,
                    confirm_password: confirmPass,
                    role: role,
                }),
            });

            if(res.status === 200){
                setError("");
                navigate("/");
                console.log(`User registration successful.`);
            } else if (res.status === 400){
                setError(`This email is already registered!`);
                console.log(`Email is already registered.`);
            } else {
                setError(`Server error occured!`)
                console.log(`Server error occurred.`);
            }

        } catch(err){
            console.log(err);
        }
    }       

    return (
        <StyledForm onSubmit={handleSubmit}>
            <HeaderWrapper>
                <HeaderText>Sign Up</HeaderText>
            </HeaderWrapper>

            <FormContentWrapper>
                <FormInput
                    label='Email'
                    type='email'
                    id='email'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <FormInput
                    label='First Name'
                    type='text'
                    id='firstName'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                />
                <FormInput
                    label='Last Name'
                    type='text'
                    id='lastName'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                />
                <FormInput
                    label='Password'
                    type='password'
                    id='password'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <FormInput
                    label='Confirm Password'
                    type='password'
                    id='confirmPassword'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPass(e.target.value)}
                />
                <FormInput
                    label='Role (Painter, Manager, or Admin)'
                    type='text'
                    id='role'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
                />

                {error && <ErrorMessage>{error}</ErrorMessage>}
  
                <FormButton type='submit' text='Sign Up' />

                <div>
                    <LoginText>Already have an account?</LoginText>
                    <LoginLink to='/'>Login</LoginLink>
                </div>
            </FormContentWrapper>
        </StyledForm>
    )
}

export default SignupForm;