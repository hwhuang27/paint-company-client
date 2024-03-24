import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
  
`
function AuthForm({ formType }: { formType: 'login' | 'register'}) {    
    return (
    <div>
        <GlobalStyle />
        {formType === 'login' && <LoginForm />}
        {formType === 'register' && <SignupForm />}
    </div>
    )
}

export default AuthForm;