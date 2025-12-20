import "../css/SignUp.css"
import { BsArrowRightShort } from "react-icons/bs";

function SignUp() {
    return (
        <div className='signup-wrapper'>
            <div className='signup-card'>
                <h1>Create account</h1>
                <h5>Already have an account? <a href="">Sign in</a></h5>
                <form action="">
                    <div className='text-field'>
                        <input type="email" name="email" placeholder='E-mail' required/>
                    </div>
                    <div className='text-field'>
                        <input type="text" name="user" placeholder='User' required/>
                    </div>
                    <div className='text-field'>
                        <input type="password" name="password" placeholder='Password' required/>
                    </div>
                    <div className='text-field'>
                        <input type="password" name="password-confirm" placeholder='Confirm Password' required/>
                    </div>
                    <label className="check-field">
                        <input type="checkbox" name="checkbox" required />
                        <span></span>
                        <p>I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>
                    </label>
                    <button type="submit">Sign Up <span><BsArrowRightShort /></span></button>
                </form>
            </div>
        </div>
    )
}

export default SignUp