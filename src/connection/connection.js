const mongoose = require("mongoose")
async function connectToDb(){
    console.log("connection established")
    await mongoose.connect("mongodb://localhost:27017/test")
}
module.exports = connectToDb;