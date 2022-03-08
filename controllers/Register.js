require('../config/config')

//------------ User Model ------------//
const ModelUser = require('../models/user_model')

const GetRegister = async (req,res) => {
    try{
        const user = await ModelUser.find()
        if(user){
            res.status(200).json({User :user})
        }
    }catch(error){
        return res.status(400).json({
            status : false,
            message: error.message
        })
    }

}

//------------ Register Handle ------------//
const AddRegister = async (req,res) => {
    try{
       const {email, mpassword, cpassword} = req.body
        //------------ Checking required fields ------------//
       if(!email || !mpassword || !cpassword){
           return res.status(400).json({ message: 'Please try again'})
       }
       //------------ Checking password mismatch ------------//
       if(mpassword != cpassword){
           return res.status(400).json({message: 'Passwords do not match'})
       }

       //------------ Checking password length ------------//
       if (mpassword.length < 8){
           return res.status(400).json({message: "Password must be at least 8 characters"})
       }else{
           //------------ Validation passed ------------//
           ModelUser.findOne({ email:email}).then( (user) => {
               if(user){
                   return res.status(400).json({message:"Email ID already registered"})
               }else{
                   //------------ hash password generator ------------// 
                   const passhash = bcrypt.hashSync(mpassword,10)
                   // ------------Save to Database ------------// 
                   let citizen = new ModelUser({
                       email : email,
                       password : passhash
                    })
                    if(citizen.length < 0){
                        return res.status(400).json({
                            status : false,
                            message : "Value is not found",
                            data: null
                        })
                    }
                    citizen.save().then( (user) => {
                        return res.status(200).json({
                        status : true,
                        message : user
                        })
                    })                                     
               }
           })
        }
    }catch(error){
        return res.status(400).json({
            message : false
        })
    }
}

module.exports = {GetRegister,AddRegister}


