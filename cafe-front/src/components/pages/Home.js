import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Upload from "../items/Upload";

export default function Home() {
  const { userData } = useContext(UserContext);
  console.log("user data: " + userData.user);

  return (
    <div className="page">
      {userData.user ? (
        <>
          <h1>Welcome {userData.user}</h1>
          <Upload />
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}