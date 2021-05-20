var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "highscore.db"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQlite database - Highscore DB.')

        db.run(`CREATE TABLE IF NOT EXISTS highscore (
            id INTEGER PRIMARY KEY,
            name TEXT,
            score TEXT,
            date TEXT
            )`, (err) => {
            if (err) {
                console.log(err)
            }
            else {

            }
        })
    }
})

module.exports = db