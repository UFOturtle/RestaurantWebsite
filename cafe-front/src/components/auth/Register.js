import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
export default function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        const newUser = {username, password, passwordCheck};
        await Axios.post(
            "http://localhost:8001/users/register",
            newUser
        );

        const loginRes = await Axios.post(
            "http://localhost:8001/users/login", {
            username, 
            password
            });
            console.log("loginRes: "+ loginRes.data.user);
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.id
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    }
    return (
        <div className="page">
            <h2 className="page">Register</h2>
            <form onSubmit={submit} className="form">
                <label htmlFor="register-username">Username</label>
                <input id="register-username" type="username" onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Verify password" onChange={(e) => setPasswordCheck(e.target.value)}/>

                <input type="submit" value="Register" />
            </form>
        </div>
    )
}
