import "../css/Dashboard.css"
import Wrapper from "../components/Wrapper"
import { BsSearch } from "react-icons/bs"
import TextField from "../components/TextField"

function Dashboard() {
    return (
        <Wrapper>
            <div className="search-container">
                <TextField
                    type="text"
                    name="search"
                    placeholder="Search User"
                >
                    <button className="dash-button" type="submit">Search <span><BsSearch /></span></button>
                </TextField>
            </div>
            
            <div className="users-field">
                <div className="user-card">
                    <div className="user-photo">
                        <img src=""/>
                    </div>
                    <div className="user-info">
                        <h2>Username</h2>
                        <p>email</p>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Dashboard