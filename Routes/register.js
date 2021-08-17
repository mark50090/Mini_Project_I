require('../config/config')
const registerfn = require('../controllers/Register')
const router = express.Router()


router.get('/Register',registerfn.Register)



module.exports = router