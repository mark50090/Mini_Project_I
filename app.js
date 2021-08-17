require('./config/config')

// Require Router // 
const registerRouter = require('./Routes/register')

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(cors())


app.get('/', (req,res)=>{
    res.send("Hi MiniProject")
})

 // API // 
app.use('/register/api',registerRouter)




app.listen(process.env.NODE_PORT, ()=>{
    console.log(`Start Server at http://localhost:${process.env.NODE_PORT}`)
})