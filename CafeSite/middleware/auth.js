const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try{
        const token = req.header("x-auth-token");
        //console.log(token);
        if(!token)
            return res.status(401).json({msg: "No auth token, authorization denied"});

         jwt.verify(token, process.env.JWT_SECRET,function(err, verified){
            if(err){
                return res.status(401).json({msg: "token verification failed, authorization denied"});
            }else{
                console.log(verified);
                req.user = verified.id;
            }
            });

        next();
    }catch(err){
        res.status(500).json({error: err.message});
    }

};

module.exports = auth;