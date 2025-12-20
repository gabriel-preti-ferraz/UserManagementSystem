import { useState } from "react"
import "../css/PassRecovery.css"
import TextField from "../components/TextField"
import Button from "../components/Button"
import Divider from "../components/Divider"
import Wrapper from "../components/Wrapper"

function PassRecovery() {
    const [email, setEmail] = useState('')

    return (
        <Wrapper
            headerContent={<h1>Forget Password</h1>}
            
            formContent={<>
                <TextField
                    label="Enter your e-mail address to continue"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" text="Continue"/>
            </>}

            footContent={<>
                <Divider text="or" />
                <p style={{margin: "0"}}>Return to the <a href=" /login">login page</a></p>
            </>}
        />
    )
}

export default PassRecovery