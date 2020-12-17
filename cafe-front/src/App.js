import React, {useState, useEffect} from 'react';
import Axios from "axios";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";
import "./style.css";
import UserContext from "./context/UserContext";

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if(token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            };
            
            const tokenRes = await Axios.post(
                "http://localhost:8001/users/tokenIsValid",
                null,
                {headers: { "x-auth-token": token } }
                );
                if (tokenRes.data) {
                    const userRes = await Axios.get("http://localhost:8001/users/",
                    {headers: { "x-auth-token": token },
                });
                console.log("User Res: " + userRes.data.user);

                setUserData({
                    token,
                    user: userRes.data.user
                });
                }
        };
        checkLoggedIn();
    }, []);

    return (
    <>
        <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }} >
            <Header />
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </UserContext.Provider>
        </BrowserRouter>
    </>
    );
}
