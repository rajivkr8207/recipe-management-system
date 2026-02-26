const e = require("express")
const { default: mongoose } = require("mongoose")


const ConnectDB = ()=>{
    mongoose.connect(process.env.MONGODB)
    .then(()=>{
        console.log('MONGODB connect succfully')
    })
    .catch((err)=>{
        console.log('MONGODB connection faild succfully')
        process.exit(1)
    })
}

module.exports = ConnectDB






