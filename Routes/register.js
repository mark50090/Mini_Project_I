require('../config/config')
const registerfn = require('../controllers/Register')
const router = express.Router()
const Auth = require('../middlewares/authJwt')


// Routers Register // 
router.get('/GetRegister',Auth,registerfn.GetRegister)
router.post('/signup',registerfn.AddRegister)

module.exports = router