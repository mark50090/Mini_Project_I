require('./config/config')
const app = express()
const ports = process.env.NODE_PORT


app.get('/', (req,res)=>{
    res.send("Hi MiniProject")
})



app.listen(ports, ()=>{
    console.log(`Start Server at http://localhost:${ports}`)
})