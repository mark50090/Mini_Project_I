require('../config/config')

async function validateToken(req,res,next) {
    try{
        if (!req.headers.hasOwnProperty('authorization')) throw new Error('Unauthorized')
        const token = String(req.headers.authorization).split(' ')[1]
        if(!token){
            return res.status(401).json({message:"token has been problem"})
        } 
        const verified = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
            if(err) return res.status(403).json({message:'Access Token is Expired'})
            req.user = user
        })
        //console.log(req.user)
        //res.status(200).json({message:req.user})
        next()
    }catch(error){
        res.status(401).json({message:'Not Found Authorization'})
    }
 }

 module.exports = validateToken