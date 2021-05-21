/*SERVER DEFAULT CONFIGS*/
var currentDate = new Date()

var express = require("express")
var app = express()
var cors = require('cors')
var db = require("./database.js")
var highscoreDB = require("./highscore-db")

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
/*API 2*/

app.get("/api/highscore/", ((req, res, next) => {
  var sql = "select * from highscore ORDER BY id DESC"
  var params = []
    highscoreDB.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json(rows)
    })
}));

app.get("/api/highscore/top3/", ((req, res, next) => {
    var sql = "select * from highscore ORDER BY score DESC LIMIT 3"
    var params = []
    highscoreDB.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json(rows)
    })
}));

app.post("/api/highscore/", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("No name?");
    }
    var data = {
        name: req.body.name,
        score: req.body.score,
        date: new Date()
    }
    var sql ='INSERT INTO highscore (name, score, date) VALUES (?,?,?)'
    var params =[data.name, data.score, data.date]
    highscoreDB.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message":"created",
            "highscore": data,
            "id" : this.lastID
        })
    });
})

app.delete("/api/highscore/:id", (req, res, next) => {
    highscoreDB.run(
        'DELETE FROM highscore WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
        });
})

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
        questionImg: req.body.questionImg,
        answerOne: req.body.answerOne,
        answerTwo: req.body.answerTwo,
        answerThree: req.body.answerThree,
        correctAnswer: req.body.correctAnswer,
    }
    var sql ='INSERT INTO question (questionTitle, question, questionImg, answerOne, answerTwo, answerThree, correctAnswer) VALUES (?,?,?,?,?,?,?)'
    var params =[data.questionTitle, data.question, data.questionImg, data.answerOne, data.answerTwo, data.answerThree, data.correctAnswer]
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
        questionImg: req.body.questionImg,
        answerOne: req.body.answerOne,
        answerTwo: req.body.answerTwo,
        answerThree: req.body.answerThree,
        correctAnswer: req.body.correctAnswer
    }
    var sql ='UPDATE question SET questionTitle = ?, question = ?, questionImg = ?, answerOne = ?, answerTwo = ?, answerThree = ?, correctAnswer = ? WHERE questionId = ?'
    var params =[data.questionTitle, data.question, data.questionImg, data.answerOne, data.answerTwo, data.answerThree, data.correctAnswer, req.params.id]
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
