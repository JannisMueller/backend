/*SERVER DEFAULT CONFIGS*/

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

app.listen(HTTP_PORT, () => {
    console.log("Server running on port - %PORT%".replace("%PORT%",HTTP_PORT))
});

/*SERVER INDEX*/
app.get("/", (req, res, next) => {
    res.json("Server is running")
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////
/*SERVER ROUTING*/

app.get("/api/question", (req, res, next) => {
    var sql = "select * from question"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows)
    });
});

app.get("/api/question/:id", (req, res, next) => {
    var sql = "select * from question where questionId = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(row)
    });
});

app.post("/api/question/", (req, res, next) => {
    var errors=[]
    if (!req.body.questionTitle){
        errors.push("No question title!");
    }
    var data = {
        questionTitle: req.body.questionTitle,
        question: req.body.question,
        answerOne: req.body.answerOne,
        answerTwo: req.body.answerTwo,
        answerThree: req.body.answerThree,
        correctAnswer: req.body.correctAnswer,
        imgLink: req.body.imgLink
    }
    var sql ='INSERT INTO question (questionTitle, question, answerOne, answerTwo, answerThree, correctAnswer, imgLink) VALUES (?,?,?,?,?,?,?)'
    var params =[data.questionTitle, data.question, data.answerOne, data.answerTwo, data.answerThree, data.correctAnswer, data.imgLink]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message":"created",
            "question": data,
            "id" : this.lastID
        })
    });
})

app.put("/api/question/:id", (req, res, next) => {
    var data = {
        questionTitle: req.body.questionTitle,
        question: req.body.question,
        answerOne: req.body.answerOne,
        answerTwo: req.body.answerTwo,
        answerThree: req.body.answerThree,
        correctAnswer: req.body.correctAnswer,
        imgLink: req.body.imgLink
    }
    var sql ='UPDATE question SET questionTitle = ?, question = ?, answerOne = ?, answerTwo = ?, answerThree = ?, correctAnswer = ?, imgLink = ? WHERE questionId = ?'
    var params =[data.questionTitle, data.question, data.answerOne, data.answerTwo, data.answerThree, data.correctAnswer, data.imgLink, req.params.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message":"updated",
            "question": data,
            "id" : this.lastID
        })
    });
})

app.delete("/api/question/:id", (req, res, next) => {
    db.run(
        'DELETE FROM question WHERE questionId = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
        });
})
