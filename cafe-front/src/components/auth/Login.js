import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        const loginUser = {username, password};

        const loginRes = await Axios.post(
            "http://localhost:8001/users/login", 
            loginUser
            );
        console.log(loginRes);
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.id
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    }

    return (
        <div>
            <h2 className="page">Login</h2>
            <form onSubmit={submit} className="form">
                <label htmlFor="login-username">Username</label>
                <input id="login-username" type="username" onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)}/>

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}
