import "../css/components/Navbar.css"
import {useNavigate} from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    // TODO: dashboard route protect

    return (
        <div className="nav-wrapper">
            <div className="nav-left">
                <a href="/dashboard">Dashboard</a>
            </div>
            <div className="nav-right">
                <a href="/login">Login</a>
                <a href="/signup">Signup</a>
                <button  id="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar