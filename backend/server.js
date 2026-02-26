const dotenv = require("dotenv")
dotenv.config('')
const app  = require('./src/app')
const ConnectDB = require("./src/config/database")

const PORT = process.env.PORT

ConnectDB()
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT} port`)
})

