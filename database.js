var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "question.db"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQlite database.')

        db.run(`CREATE TABLE question (
            questionId INTEGER PRIMARY KEY,
            questionTitle TEXT,
            question TEXT,
            questionImg TEXT,
            answerOne TEXT,
            answerTwo TEXT,
            answerThree TEXT,
            correctAnswer TEXT
            )`, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                // db.run(insert, ["Question 1","What will the following program output?","question1.png","12","20","21","21"]),
                // db.run(insert, ["Question 2","What is the value of cars[3]?","question2.png","Array index is out of bounds","Ford","BMW","Array index is out of bounds"])
                // db.run(insert, ["Question 3","What is sum after the following loop terminates?","question3.png","36","45","55","45"])
             }
        })
    }
})

module.exports = db