const { token } = require('morgan');
require('../config/config')


const Jwtservice = async (payload) => {
    const access_token = await jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: 300 }); 
    return access_token
}

const Jwtverify = async (token)=>{
    const verified = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    return verified 
}

const Jwtrefresh = async (payload) => {
    const access_token = await jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{ expiresIn: 86400 }); 
    return access_token
}

module.exports = {Jwtservice,Jwtverify,Jwtrefresh}