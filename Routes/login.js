require('../config/config')
const loginfn = require('../controllers/Login')
const router = express.Router()

// Routers Login // 
router.post('/login',loginfn.loginController)



module.exports = router