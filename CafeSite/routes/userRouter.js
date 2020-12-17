const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Database UserModel
const Users = require("../models/users");
const auth = require("../middleware/auth")
const u = new Users.UsersModel("us-east-1");

router.post("/register", async (req, res) => {
    try {
        let {username, password, passwordCheck} = req.body;

        //validation
        if(!username || !password || !passwordCheck)
            return res.status(400).json({msg: "Not all fields have been entered."});

        if(password.length < 5 && password.length > 20)
            return res.status(400).json({msg: "The password needs to be between 5 - 20 characters long."})

        if(password != passwordCheck)
            return res.status(400).json({msg: "Make sure both password fields match."})

        let existingUser = await u.checkUser(username)
        console.log("existing user: " + existingUser);
    
        if(existingUser == true)
            return res.status(400).json({msg: "This account already exists"})

        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(password, salt);

        u.addUser(username, passwordHash);

    } catch(err) {
        res.status(500).json({error: err.message + "on register"});
    }
    return res.send("User Registered");
});



router.post("/login", async (req, res) => {
    try {
        let {username, password} = req.body;

        if(!username || !password)
            return res.status(400).json({msg: "Not all fields have been entered."});
        
        if(password.length < 5 && password.length > 20)
            return res.status(400).json({msg: "The password needs to be between 5 - 20 characters long."});

        console.log("username to check: " + username);
        
        const userValid = await u.checkUser(username);

        console.log("user valid: " + userValid);

        if(userValid  == false)
            return res.status(400).json({msg: "Invalid info"});

        let pass = await u.login(username);
        const match = await bcrypt.compare(password, pass);

        console.log("Match: " + match);

        if(match == false) return res.status(400).json({msg: "Invalid login."});

        const token = jwt.sign({id: username}, process.env.JWT_SECRET);
        console.log("logged in")
        res.
        json({
                token, 
                id: username
            });

        console.log(username);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.delete("/delete", auth, async (req, res) => {
    try{
        return res.json(u.deleteUser(req.user))
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post("/tokenIsValid", async(req, res) => {
    try {
        const token = req.header("x-auth-token");
        console.log(token);
        if(!token) return res.json(false);
        jwt.verify(token, process.env.JWT_SECRET,function(err, verified){
            if(err)
                return res.status(401).json(false);
            else
                if( u.checkUser(verified.id) == false)
                    return res.status(400).json(false);
            });
        
        return res.json(true);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post("/addItem", auth, upload.any(), async (req, res) => {
    try{
        const { originalname, buffer } = req.files[0];
        console.log(originalname);
        u.addItem(buffer, originalname, req.body.itemName);
        return res.json({msg: "Item added"})
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.get("/", auth, async (req, res) => {
    const user = await u.checkUser(req.user);
    console.log("user: " + req.user)
    res.json({
        user: req.user,
    });
});
module.exports = router;