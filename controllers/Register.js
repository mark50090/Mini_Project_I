require('../config/config')


const Register = async (req,res) => {
    try{
        res.status(200).json({
            status : true,
            message : "Ok"
        })

    }catch(error){
        return res.status(200).json({
            status : false,
            message: error.message
        })
    }

}

module.exports = {Register}