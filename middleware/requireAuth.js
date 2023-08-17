const jwt = require('jsonwebtoken')
const User = require('../models/userModule')
const requireAuth = async (req,res, next)=>{
    //verifies authentication

   const {authorization} = req.headers

   if(!authorization)
   {
    return res.status(401).json({error:"Autherization token required"})
   }

   const token = authorization.split(' ')[1]

   try{
      
    const {_id} = jwt.verify(token,process.env.SECRET)

    req.user = await User.findOne({_id}).select('_id')
    next()
   }
   catch(error){
    console.log(error)
    return res.status(401).json({error:"Requiest is not authorized"})

   }



}

module.exports = requireAuth