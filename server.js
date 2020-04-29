var express = require("express")
var app = express()
const sqlite = require('sqlite3').verbose();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database name and location
const DATABASE = "layout_saver_DB.db" 

// Setup database 
let db = new sqlite.Database(DATABASE, (err) => {
    if(err) {
        console.error(err.message)
        throw err
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

    db.all(sql, [params], (err, rows) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows)
    })
});

// Get all layout name by id
app.get("/layout/:id/name", (req, res, next) => {
    const sql = `select layout_id, name from layout where layout_id = ?`;
    const params = req.params.id;

    db.get(sql, [params], (err, row) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.send(row)
    })
});

// Get all screens by layout id
app.get("/layout/:id/screens", (req, res, next) => {
    const sql = `select * from screen where layout_id = ?`;
    const params = req.params.id;

    db.all(sql, [params], (err, rows) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows)
    })
});

// Get fullscreen mode based on specific screen on specific layout
app.get("/layout/:id/screen/:id2/fullscreen", (req, res, next) => {
    const sql = `select fullscreen from screen where layout_id = ? and screen_nr = ?`;
    const params = [req.params.id, req.params.id2];

    db.get(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.send(row)
    })
});

// Get all decoders by layout id
app.get("/layout/:id/decoders", (req, res, next) => {
    const sql = `select * from decoder where layout_id = ?`;
    const params = req.params.id;

    db.all(sql, [params], (err, rows) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows)
    })

});

// Get decoder value based on specific decoder on specific layout 
app.get("/layout/:id/decoder/:id2/value", (req, res, next) => {
    const sql = `select value from decoder where layout_id = ? and decoder_nr = ?`;
    const params = [req.params.id, req.params.id2];

    db.get(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.send(row)
    })
});

// create or update layout with a name
app.post("/layout/:id/name", (req, res, next) => {
    const sql = `INSERT INTO layout (layout_id,name)
                    VALUES($id, $name)
                    ON CONFLICT(layout_id) 
                    DO UPDATE SET name= $name`;

    const layout_id = req.params.id;
    const layoutName = req.body.name

    db.run(sql, {$id:layout_id, $name:layoutName}, (err, row) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        console.log(req.body)
        res.send("Posted");
    })
});

// create or update screen with a fullscreen or not
app.post("/layout/:id/screen/:id2/fullscreen", (req, res, next) => {
    const sql = `INSERT INTO screen (layout_id,screen_nr,fullscreen)
                    VALUES($id, $id2, $fullscreen)
                    ON CONFLICT(layout_id, screen_nr) 
                    DO UPDATE SET fullscreen= $fullscreen`;

    const layout_id = req.params.id;
    const screen_nr = req.params.id2;
    const fullscreen = req.body.fullscreen;

   
    db.run(sql, {$id:layout_id, $id2:screen_nr, $fullscreen:fullscreen}, (err, row) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.send("Posted");
    })    
});

// create or update decoder with a value
app.post("/layout/:id/decoder/:id2/value", (req, res, next) => {
    const sql = `INSERT INTO decoder (layout_id,decoder_nr,value)
                    VALUES($id, $id2, $value)
                    ON CONFLICT(layout_id, decoder_nr) 
                    DO UPDATE SET value= $value`;

    const layout_id = req.params.id;
    const decoder_nr = req.params.id2;
    const value = req.body.value;

    db.run(sql, {$id:layout_id, $id2:decoder_nr, $value:value}, (err, row) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.send("Posted");
    })
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

process.on('uncaughtException', (error)  => {
   
    console.log('Uncaught Exception!: ',  error);
    db.close();
    process.exit(1); // exit application 

})

process.on('unhandledRejection', (error, promise) => {
    console.log(' Forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error );
    db.close();
    process.exit(1); // exit application 
});

process.on('SIGINT', () => {
    db.close();
    process.exit(1); // exit application 
});