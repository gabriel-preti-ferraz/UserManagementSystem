import "../css/SignUp.css"
import { BsArrowRightShort, BsEye, BsEyeSlash } from "react-icons/bs"
import { useState } from "react"
import Wrapper from "../components/Wrapper"
import TextField from "../components/TextField"
import Button from "../components/Button"

function SignUp() {
    const [email, setEmail, user, setUser, password, setPassword] = useState('')
    const [visible, setVisible] = useState('')

    return (
        <Wrapper
            headerContent={<>
                <h1>Create account</h1>
                <h5>Already have an account? <a href="/login">Sign in</a></h5>
            </>}

            formContent={<>
                <TextField
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    name="user"
                    type="text"
                    placeholder="Username"
                    required
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />                

                <TextField
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={visible ? "text" : "password"}
                >
                    <div className='eye' onClick={() => setVisible(!visible)}>
                        {visible ? <BsEye /> : <BsEyeSlash />}
                    </div>
                </TextField>
                <TextField
                    name="confirm-password"
                    placeholder="Confirm your Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={visible ? "text" : "password"}
                >
                    <div className='eye' onClick={() => setVisible(!visible)}>
                        {visible ? <BsEye /> : <BsEyeSlash />}
                    </div>
                </TextField>

                <label className="check-field">
                    <input type="checkbox" name="checkbox" required />
                    <span></span>
                    <p>I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>
                </label>
            
                <Button
                    type="submit"
                    icon="right"
                    span={<BsArrowRightShort />}
                    text="Sign Up"
                />
            </>}
        />
    )
}

// TODO: confirm password input

export default SignUp