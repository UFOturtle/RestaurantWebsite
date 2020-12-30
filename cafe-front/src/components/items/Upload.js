import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";

export default function Upload() {
  const [itemName, setItemName] = useState();
  const [file, setFile] = useState();
  const [itemPrice, setPrice] = useState();
  const [itemDescription, setDescription] = useState();
  const { userData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const addItem = new FormData();
    addItem.append("itemName", itemName);
    addItem.append("file", file);
    addItem.append("itemPrice" , itemPrice);
    addItem.append("itemDescription", itemDescription);

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
    history.push("/menu");
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

        <label htmlFor="item-price">Price</label>
        <input
          id="item-price"
          type="number"
          step="0.01"
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="item-description">Description</label>
        <textarea id="item-description" name="description" 
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="filename">Image</label>
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input type="submit" value="Add Item" />
      </form>
    </div>
  );
}
