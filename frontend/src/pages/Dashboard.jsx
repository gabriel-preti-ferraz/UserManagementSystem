import "../css/Dashboard.css"
import Wrapper from "../components/Wrapper"
import { BsSearch } from "react-icons/bs"
import TextField from "../components/TextField"

function Dashboard() {
    return (
        <Wrapper
            wrapperProps={{ style: {paddingTop: "5%"}}}
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
            </div>
            
            <div className="users-field">
                <div className="user-card">
                    <div className="user-photo">
                        <img src="https://avatars.githubusercontent.com/u/125829214?v=4"/>
                    </div>
                    <div className="user-info">
                        <h2>Username</h2>
                        <p>email@email.com</p>
                    </div>
                    <button className="user-button">Edit User</button>
                </div>
            </div>
        </Wrapper>
    )
}

export default Dashboard

//TODO: other pages overflow