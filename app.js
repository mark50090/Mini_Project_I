require('./config/config')

//----------- Require Router -----------// 
const signupRouter = require('./Routes/register')
const loginRouter  = require('./Routes/login')

//---- Config -----//
const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())
app.use(
  session({
    secret: 'my_super_secret',
    resave: false,
    saveUninitialized: true
  })
)

//----------- Database in Mongoose -----------//
// const option = { useNewUrlParser : true , useUnifiedTopology : true }
// const {DB_HOST, DB_PORT,DB_NAME} = process.env
// mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,option)
// .then(() =>{console.log('DB connect')})
// .catch(err => {console.log('DB connect fail')})
//--------------------------------------------//


app.get('/', (req, res) => {
  return res.status(200).json({
    message:"Wellcome to my project"
  })
  // let session = req.session;
  // if (session.userid) {
  //     res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  // } else
  //     res.sendFile('views/index.html', { root: __dirname })
});


 //------------- Login && Register Route -------------//
app.use('/api/auth',signupRouter)
app.use('/api/auth',loginRouter)



 //------- PORT ------//
app.listen(process.env.NODE_PORT, ()=>{
    console.log(`Start Server at http://localhost:${process.env.NODE_PORT}`)
})