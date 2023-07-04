const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next)=>{
    // Get the user id from the jwt token and append it to the next req body
    const token = req.header('auth-token')
    if (!token){
        res.status(401).send({error: "Please authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token, process.env.JWT_Secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using valid token"})
    }
}

module.exports = fetchuser;