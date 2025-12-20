import "../css/PassRecovery.css"

function PassRecovery() {
    return (
        <div className='recovery-wrapper'>
            <div className='recovery-card'>
                <h1>Forget Password</h1>
                <form action="">
                    <div className='text-field'>
                        <label>Enter your e-mail address to continue</label>
                        <input type="email" name="email" placeholder='E-mail' required/>
                    </div>
                    <button type="submit">Continue</button>
                </form>
                <div className='divider'><span>or</span></div>
                <p id="return">Return to the <a href=" /login">login page</a></p>
            </div>
        </div>
    )
}

export default PassRecovery