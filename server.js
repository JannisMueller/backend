var express = require("express")
var app = express()
var cors = require('cors')
var db = require("./database.js")
app.use(cors())
app.use(express.static('public'))
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var HTTP_PORT = 3000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});