import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";

export default function Upload() {
  const [itemName, setItemName] = useState();
  const [file, setFile] = useState();
  const { userData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const addItem = new FormData();
    addItem.append("itemName", itemName);
    addItem.append("file", file);

    const addRes = await Axios.post(
      "http://localhost:8001/users/addItem",
      addItem,
      {
        headers: {
          "x-auth-token": userData.token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(addRes);
    history.push("/");
  };

  return (
    <div>
      <h2 className="page">Add Item to Menu</h2>
      <form onSubmit={submit} className="form" enctype="multipart/form-data">
        <label htmlFor="item-name">Item Name</label>
        <input
          id="item-Name"
          type="item-Name"
          onChange={(e) => setItemName(e.target.value)}
        />

        <label htmlFor="item-Image">Image</label>
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
