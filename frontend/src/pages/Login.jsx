import '../css/Login.css'
import { BsArrowRightShort } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

function Login() {
    return (
        <div className='login-wrapper'>
            <div className='login-card'>
                <h1>Log in to <br />your account</h1>
                <h5>Don't have an account? <a href="">Sign up</a></h5>
                <form action="">
                    <div className='text-field'>
                        <input type="email" name="email" placeholder='E-mail' required/>
                    </div>
                    <div className='text-field'>
                        <input type="password" name="password" placeholder='Password' required/>
                    </div>
                    <button type="submit">Log in <span><BsArrowRightShort /></span></button>
                </form>
                <h5 className='forgot-h5'><a href="">Forgot password?</a></h5>
                <div className='divider'><span>or</span>
                </div>
                <button className='google'><span><FcGoogle /></span> Sign In with Google</button>
            </div>
        </div>
    )
}

export default Login

// TODO: Sign up href
// TODO: Forgot password href