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
            // else {
            //     var insert = 'INSERT INTO question (questionTitle, question, answerOne, answerTwo, answerThree, correctAnswer) VALUES (?,?,?,?,?,?)'
            //     db.run(insert, ["Question One","What is the sum from: for(int x = 0; x<10; x++","0","9","10",2])
            // }
        })
    }
})

module.exports = db