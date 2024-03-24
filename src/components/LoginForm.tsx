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
    margin: 8px 0 0;
`
const FormContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const SignupText = styled.p`
  display: inline;
  font-size: 22px;
`
const SignupLink = styled(Link)`
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
    margin: 0 0 4px;
`

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (email === "" || password === "") {
                setError('Fields cannot be empty');
                throw new Error('Fields cannot be empty');
            }
            const res = await fetch(`https://paint-company-api-production.up.railway.app/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            
            if(res.status === 200){
                const result = await res.json();
                localStorage.setItem('token', result.accessToken);
                localStorage.setItem('role', result.role);
                setError("");
                navigate('/');
            } else{
                setError('Invalid email or password');
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <HeaderWrapper>
                <HeaderText>A Paint Company</HeaderText>
            </HeaderWrapper>
            
            <FormContentWrapper>
                <FormInput
                    label='Email'
                    type='email'
                    id='email'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <FormInput
                    label='Password'
                    type='password'
                    id='password'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <FormButton type='submit' text='Login' />

                <div>
                    <SignupText>Don't have an account?</SignupText>
                    <SignupLink to='/register'>Sign Up</SignupLink>
                </div>
            </FormContentWrapper>
        </StyledForm>
    )
}

export default LoginForm;