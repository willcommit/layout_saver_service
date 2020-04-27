var express = require("express")
var app = express()
const sqlite = require('sqlite3').verbose();

let db = new sqlite.Database("layout_saver_DB.db", (err) => {
    if(err) {
        return console.error(err.message);
    }
    console.log('connected to DB!')
})

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


// Root endpoint
app.get("/layout", (req, res, next) => {

    res.send("Root")
});

// Get all layouts
app.get("/layouts", (req, res, next) => {
    const sql = `select * from layout`;
    const params = req.params.id;

    db.get(sql, [params], (err, rows) => {
        if(err) {
            console.log("error");
        }
        res.json(rows) 
    })

    db.close();
});

// Get all layout name by id
app.get("/layout/:id/name", (req, res, next) => {
    const sql = `select name from layout where layout_id = ?`;
    const params = req.params.id;

    db.get(sql, [params], (err, row) => {
        if(err) {
            console.log("error");
        }
        res.send(row.name) 
    })

    db.close();
});

// Get all screens by layout id
app.get("/layout/:id/screens", (req, res, next) => {
    const sql = `select * from screen where layout_id = ?`;
    const params = req.params.id;

    db.get(sql, [params], (err, rows) => {
        if(err) {
            console.log("error");
        }
        res.json(rows) 
    })

    db.close();
});


app.get("/layout/:id/:id2/fullscreen", (req, res, next) => {
    const sql = `select fullscreen from screen where layout_id = ? and screen_nr = ?`;
    const params = [req.params.id, req.params.id2];

    db.get(sql, params, (err, row) => {
        if(err) {
            console.log("error");
        }
        res.send(row.fullscreen.toString()) 
    })

    db.close();
});



// Default response for any other request
app.use(function(req, res){
    res.status(404);
});