import "../css/Dashboard.css"
import Wrapper from "../components/Wrapper"
import { BsSearch } from "react-icons/bs"
import TextField from "../components/TextField"
import { UserListAPI } from "../services/api"
import { useState, useEffect } from "react"

function Dashboard() {
    const [error, setError] = useState(null)
    const [users, setUsers] = useState([])

    //TODO: overflow respnsive

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userList = await UserListAPI()
                setUsers(userList)
            } catch (err) {
                console.log(err)
                setError("Failed to load users")
            }
        }
    
        loadUsers()
    }, [])

    return (
        <Wrapper
            wrapperProps={{ id: "dash-wrapper"}}
            cardProps={{id: "dash-card"}}
        >
            <div className="search-container">
                <TextField
                    type="text"
                    name="search"
                    placeholder="Search for a User"
                >
                    <button className="dash-button" type="submit">Search <span><BsSearch /></span></button>
                </TextField>
                {error && <p  style={{ color: "red", fontSize: "0.9rem", marginTop: "4px", textAlign: "center" }}>{error}</p>}
            </div>
            
            <div className="users-field">
                {users.map((user) => (
                    <div className="user-card">
                        <div className="user-info">
                            <h2>{user.username}</h2>
                            <p style={{textTransform: "capitalize"}}>{user.role}</p>
                            <p>{user.email}</p>
                        </div>
                        <button className="user-button">Edit User</button>
                    </div>
                ))}
            </div>
        </Wrapper>
    )
}

export default Dashboard