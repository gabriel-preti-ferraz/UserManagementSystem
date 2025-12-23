import "../css/Dashboard.css"
import Wrapper from "../components/Wrapper"
import { BsSearch } from "react-icons/bs"
import TextField from "../components/TextField"
import Form from "../components/Form"
import { UserListAPI, UserEditAPI, UserDeleteAPI, SearchUserAPI } from "../services/api"
import { useState, useEffect } from "react"

function Dashboard() {
    const [error, setError] = useState(null)
    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedUser, setSelectedUser] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

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

    const openModal = (user) => {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedUser(null)
        setIsModalOpen(false)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setSelectedUser((prev) => ({...prev, [name]: value}))
    }

    const handleSave = async () => {
        try {
            await UserEditAPI(
                selectedUser.id,
                selectedUser.username,
                selectedUser.email,
                selectedUser.role
            )
            window.location.reload()
            alert("User modified!")
        } catch (err) {
            console.log(err)
            alert("The user could not be saved.")
        }
    }

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?")
        if (confirmDelete) {
            try {
                await UserDeleteAPI(userId)
                window.location.reload()
                alert("User deleted!")
            } catch (err) {
                console.log(err)
                alert("An error occured while deleting the user.")
            }
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        
        try {
            const searchResults = await SearchUserAPI(searchQuery)
            setUsers(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search user...")
        }
    }

    return (
        <Wrapper
            wrapperProps={{ id: "dash-wrapper"}}
            cardProps={{id: "dash-card"}}
        >
            <div className="search-container">
                <Form formProps={{onSubmit: handleSearch}}>
                    <TextField
                        type="text"
                        name="search"
                        placeholder="Search for a User"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    >
                        <button className="dash-button">Search <span><BsSearch /></span></button>
                    </TextField>
                </Form>
                {error && <p  style={{ color: "red", fontSize: "0.9rem", marginTop: "4px", textAlign: "center" }}>{error}</p>}
            </div>
            
            <div className="users-field">
                {users.map((user) => (
                    <div className="user-card" key={user.id}>
                        <div className="user-info">
                            <h2>{user.username}</h2>
                            <p style={{textTransform: "capitalize"}}>{user.role}</p>
                            <p>{user.email}</p>
                        </div>
                        <button className="user-button" onClick={() => openModal(user)}>Edit User</button>
                        <button className="user-button" style={{ fontSize: "13pt" }} onClick={() => handleDelete(user.id)}>Delete User</button>
                    </div>
                ))}

                {isModalOpen && selectedUser && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Edit User</h2>
                            <label>Username:</label>
                            <input type="text" name="username" value={selectedUser.username} onChange={handleChange} />
                            <label>E-mail:</label>
                            <input type="email" name="email" value={selectedUser.email} onChange={handleChange}/>
                            <label>Role:</label>
                            <select name="role" value={selectedUser.role} onChange={handleChange}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>

                            <div className="modal-buttons">
                                <button onClick={handleSave}>Save Changes</button>
                                <button onClick={closeModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Wrapper>
    )
}

export default Dashboard