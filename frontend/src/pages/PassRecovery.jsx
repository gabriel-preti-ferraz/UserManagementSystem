import "../css/PassRecovery.css"
import TextField from "../components/TextField"
import Button from "../components/Button"
import Divider from "../components/Divider"
import Wrapper from "../components/Wrapper"
import Form from "../components/Form"
import { useFormState } from '../hooks/useFormState'

function PassRecovery() {
    const { values, handleChange } = useFormState({
            email: '',
    })

    return (
        <Wrapper
            headerContent={<h1>Forget Password</h1>}
            footContent={<>
                <Divider text="or" />
                <p style={{margin: "0"}}>Return to the <a href=" /login">login page</a></p>
            </>}
        >
            <Form>
                <TextField
                    label="Enter your e-mail address to continue"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
                    value={values.email}
                    onChange={handleChange}
                />
                <Button type="submit" text="Continue"/>
            </Form>
        </Wrapper>
    )
}

export default PassRecovery