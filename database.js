var sqlite3 = require('sqlite3').verbose()

const DB = 'layout_saver_DB_backup.db'

let db = new sqlite3.Database(DB, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(
            `CREATE TABLE "decoder" (
                "decoder_nr"	INTEGER NOT NULL CHECK(decoder_nr>=1 AND decoder_nr<=60) UNIQUE,
                "value"	INTEGER NOT NULL CHECK(value >=1 AND value <= 40),
                "layout_id"	INTEGER NOT NULL UNIQUE,
                PRIMARY KEY("decoder_nr"),
                FOREIGN KEY("layout_id") REFERENCES "layout"("layout_id") ON UPDATE SET NULL ON DELETE SET NULL);
            CREATE TABLE "layout" (
                "layout_id"	INTEGER NOT NULL CHECK(layout_id >= 1 AND layout_id <= 16) UNIQUE,
                "name"	TEXT,
                PRIMARY KEY("layout_id"));
            CREATE TABLE "screen" (
                "screen_nr"	INTEGER NOT NULL CHECK(screen_nr>=1 AND screen_nr<=6) UNIQUE,
                "fullscreen"	NUMERIC DEFAULT 0 CHECK(fullscreen=1 or fullscreen=0),
                "layout_id"	INTEGER NOT NULL,
                PRIMARY KEY("screen_nr"),
                FOREIGN KEY("layout_id") REFERENCES "layout"("layout_id") ON UPDATE SET NULL ON DELETE SET NULL
);`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                console.log('Created DB copy')
            }
        });  
    }
});


module.exports = db