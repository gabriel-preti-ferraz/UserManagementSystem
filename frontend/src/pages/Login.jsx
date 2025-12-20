import '../css/Login.css'
import { BsArrowRightShort } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"
import TextField from "../components/TextField"
import Button from "../components/Button"
import Divider from "../components/Divider"
import Wrapper from "../components/Wrapper"
import PasswordField from '../components/PasswordField'
import { useFormState } from '../hooks/useFormState'
import { LoginAPI } from '../services/api'
import { useState } from "react"

function Login() {
    const [ error, setError ] = useState("")
    const { values, handleChange, reset } = useFormState({
        email: '',
        password: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const data = await LoginAPI(values.email, values.password)
            reset()
            setError("")
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            } else {
                setError("An unexpected error ocurred. Please try again.")
            }
        }
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

                {error && <p  style={{ color: "red", fontSize: "0.9rem", marginTop: "4px", textAlign: "center" }}>{error}</p>}

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