const express = require("express")
const app = express()
const connect = require("./src/connection/connection")
const mongoose = require("mongoose")
const Event = require("./src/model/eventmodel")
const eventroutes = require("./src/routes/eventroutes")
const bodyParser = require("body-parser")

connect()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/v1", eventroutes)

app.listen(3000,()=> console.log("server running on port 3000"))