require('../config/config')
const Schema = mongoose.Schema 

const User = new Schema({
    account_id: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    password :{
        type: String,
        required: true
    },
    citizen_data: {
        type: Object
    },
    access_token: {
        type: String,
    },
    roles: {
          type: String,
          enum: ["customer", "admin"],
          default: 'customer'
        }   
},{ timestamps: true })

module.exports = mongoose.model('User',User)