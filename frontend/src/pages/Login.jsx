import '../css/Login.css'
import { BsArrowRightShort } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"
import TextField from "../components/TextField"
import Button from "../components/Button"
import Divider from "../components/Divider"
import Wrapper from "../components/Wrapper"
import PasswordField from '../components/PasswordField'
import { useFormState } from '../hooks/useFormState'
import axios from 'axios'

function Login() {
    const { values, handleChange } = useFormState({
        email: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/login')
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <Wrapper 
            headerContent={<>
                <h1>Log in to <br />your account</h1>
                <h5>Don't have an account? <a href="/signup">Sign up</a></h5>
            </>}

            formProps={{
                onSubmit: handleSubmit,
            }}
            
            formContent={<>
                <TextField
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                    value={values.email}
                    onChange={handleChange}
                />

                <PasswordField
                    name="password"
                    placeholder="Password"
                    required
                    value={values.password}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    icon="right"
                    span={<BsArrowRightShort />}
                    text="Log in"
                />
            </>}

            footContent={<>
                <h5 className='forgot-h5'><a href="/pass-recovery">Forgot password?</a></h5>
                <Divider text="or" />
                <Button
                    className="google"
                    icon="left"
                    span={<FcGoogle />}
                    text="Sign In with google"
                />
            </>}
        />
    )
}

export default Login