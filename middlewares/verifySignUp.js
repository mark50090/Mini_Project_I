require('../config/config')
const { body } = require('express-validator')
const User = require("../models/user_model")
const Role = ["user", "admin", "moderator"]

const checkDuplicateEmail = async (req,res) => {
    //const {email, mpassword, cpassword} = req.body
    User.findOne({email:email}).then((err,user)=>{
        if(err){
            return res.status(500).json({message:"Email เกิดข้อผิดพลาด"})
        }
        if(user){
            return res.status(400).json({message:"Email ID already registered"})
        }
    })
}


const checkRolesExisted = (req,res) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
          if (!ROLES.includes(req.body.roles[i])) {
            res.status(400).send({
              message: `Failed! Role ${req.body.roles[i]} does not exist!`
            });
            return;
          }
        }
      }
    }



  const permit = (allowed) => {
    const isAllowed = role => allowed.indexOf(role) > -1;
    return (req, res, next) => {
      if (req.user && isAllowed(req.user.role)) {
        next(); // role is allowed, so continue on the next middleware
      } else {
        res.status(403).json({ message: "Forbidden" }); // user is forbidden
      }
    };
  };


  module.exports = {checkDuplicateEmail,checkRolesExisted,permit}