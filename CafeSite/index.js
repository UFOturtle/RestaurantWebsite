const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Users = require('../CafeSite/models/users.js');

//set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8001

app.listen(PORT, () => console.log(`port: ${PORT}`));


//set routes
app.use("/users", require("./routes/userRouter"));
app.use("/menu", require("./routes/menuRouter"));