const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{

    if(req.headers.authorization===undefined){
        return res.status(406).json({error:'No authentication token,authorization denied'}); 
    }

    let token = req.headers.authorization.split(" ")[1];

    const verify = jwt.verify(token,process.env.JWT_SECRET);

    if(!verify){
        return res.status(406).json({error:'Token verification failed,autorization denied'}); 
    }

    req.user_id = verify.id;
    next();

}

module.exports = auth;