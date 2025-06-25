const jwt=require('jsonwebtoken');
const User=require('../models/User')


const isAuthenticated=async (req,res,next) =>{
   try {
    console.log(req.headers)
    const token = req.headers['authorization']?.replace('Bearer ', '')
    console.log({token})
    
    if(!token){
      return res.status(401).json({message:'No token,authoriztion error'})
    }

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    
    const user =await User.findById(decoded.userId);

    if(!user){
        return res.status(401).json({message:'Token is not valid'});

    }

    req.user=user;
    next();

   } catch (error) {
    console.log({error})
        res.status(401).send({error:'Please authenticate'});
   }    
}


module.exports = isAuthenticated