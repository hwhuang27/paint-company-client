import styled from 'styled-components';

const StyledButton = styled.button`
  margin: 16px 0 12px;
  background-color: white;
  border: 2px solid #40513B;
  border-radius: 20px;
  color: #40513B;
  font-size: 24px;
  font-weight: bold;
  padding: 6px 20px;
  transition: all .1s ease-in-out;

  &:hover {
    border: 2px solid #40513B;
    background-color: white;
    color: #40513B;
  }

  &:focus {
    border: 2px solid #40513B;
    outline: none;
  }
`
interface ButtonProps {
    type: 'button' | 'submit' | 'reset' | undefined,
    text: string,
}

function FormButton({type, text} : ButtonProps) {

    return (
        <StyledButton type={type}>
            {text}
        </StyledButton>
    )
}

export default FormButton;