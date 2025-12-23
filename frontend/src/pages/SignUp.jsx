import "../css/SignUp.css"
import { BsArrowRightShort } from "react-icons/bs"
import { useState } from "react"
import Wrapper from "../components/Wrapper"
import Form from "../components/Form"
import TextField from "../components/TextField"
import Button from "../components/Button"
import PasswordField from "../components/PasswordField"
import { useFormState } from '../hooks/useFormState'
import { RegisterAPI, LoginAPI } from "../services/api"
import {useNavigate} from "react-router-dom"

function SignUp() {
    const navigate = useNavigate()

    const { values, handleChange } = useFormState({
            email: '',
            password: '',
            username: ''
    })
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (values.password != values.confirmPassword) {
            setError(`The passwords don't match!`)
            return
        }
        if (!checked) {
            setError("You must accept the Terms of Use and Privacy Policy.")
            return
        }

        try {
            await RegisterAPI(values.username, values.email, values.password)
            const loginData = await LoginAPI(values.email, values.password)
            localStorage.setItem("token", loginData.token)
            navigate("/dashboard")
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError("An unexpected error ocurred. Please try again.")
            }
        }
    }

    return (
        <Wrapper
            headerContent={<>
                <h1>Create account</h1>
                <h5>Already have an account? <a href="/login">Sign in</a></h5>  
            </>}
        >
            <Form formProps={{onSubmit: handleSubmit}}>
                <TextField
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                    value={values.email}
                    onChange={handleChange}
                />

                <TextField
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    value={values.username}
                    onChange={handleChange}
                />                

                <PasswordField
                    name="password"
                    placeholder="Password"
                    required
                    value={values.password}
                    onChange={handleChange}
                />

                <PasswordField
                    name="confirmPassword"
                    placeholder="Confirm your Password"
                    required
                    values={values.confirmPassword}
                    onChange={handleChange}
                />

                <label className="check-field">
                    <input type="checkbox" name="checkbox" onChange={(e) => setChecked(e.target.checked)}/>
                    <span></span>
                    <p>I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>
                </label>
            
                {error && <p  style={{ color: "red", fontSize: "0.9rem", marginTop: "4px", textAlign: "center" }}>{error}</p>}

                <Button
                    type="submit"
                    icon="right"
                    span={<BsArrowRightShort />}
                    text="Sign Up"
                />
            </Form>
        </Wrapper>
    )
}

export default SignUp