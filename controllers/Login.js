require('../config/config')
const JwtSv = require('../service/JwtService')
//------------ User Model ------------//
const ModelUser = require('../models/user_model')

//------------ Login Handle ------------//
const loginController = async (req,res) => {
    try{
      const { email ,password } = req.body   
      //------------ Checking required fields ------------//
      if(!email || !password ){
        return res.status(400).json({ message: 'Please try again'})
    }
    //------------ Checking user in database ------------//
    const user = await ModelUser.findOne({email:email})
    if(!user){
        return res.status(400).json({message:'No user with this email'})
    }
    //------------ hash password generator ------------// 
    const PassCorrect = bcrypt.compareSync(password, user.password)

    //------------ payload to JWT  ------------// 
    const payload = { _id: user._id, email:user.email, role: user.roles }
    //------------ JWT generator ------------// 
    const access_token = await JwtSv.Jwtservice(payload)
    const refresh_token= await JwtSv.Jwtrefresh(payload)
    //const access_token = jwt.sign({ _id: user._id, email:user.email, role: user.roles },process.env.ACCESS_TOKEN_SECRET,{ expiresIn: 60 }); //{ expiresIn: 86400 } 24 hr
    
    //------------ Save access_token  ------------// 
    var SaveResult = await ModelUser.findOneAndUpdate({email:user.email},{access_token:access_token})
    if(PassCorrect){
        return res.status(200).json({
            message:'Login Succes',
            Email : user.email,
            Roles : user.roles,
            access_token : access_token,
            refresh_token: refresh_token
        })
    }else{
        return res.status(400).json({message:'Login Unsucces'})
    }
    }catch(error){
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

module.exports = {loginController}