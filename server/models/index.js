
const mysql = require('mysql');
const config = require("../../config");

const db_config = {
      host: config.db_config.host,
      user: config.db_config.user,
      password: config.db_config.password,
      database: config.db_config.database,
      charset : 'utf8mb4'
  };
    var  connection;
  function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }
    console.log("connect!");
    // get teatre
    exports.getTeatre = (req, cb) => {
        let sql = `SELECT * FROM teatre`;
        connection.query(sql, (err, result, fields) => {
          cb(err, result);
        });
    };
    // get teatre for id
    exports.getTeatreId = (id, req, cb) => {
        let sql = `SELECT teatre.teatre_name, kino.kino_name, kino.kino_avatar, kino.kino_url, kino.id
                   FROM kino LEFT JOIN teatre 
                   ON teatre.id=kino.teatre_id
                   WHERE teatre.id="${id}"`;
        connection.query(sql, (err, result, fields) => {
            cb(err, result);
        });
    };
    // get kino for id
    exports.getKinoId = (id, req, cd) => {
        let sql = `SELECT * FROM kino WHERE id="${id}"`;
        connection.query(sql, (err, result, fields) => {
            cd(err, result);
        })
    };
    // get kino date for id
    exports.getDateId = (id, req, cd) => {
         let sql = `SELECT  kino_date.id,kino.kino_name,kino_date.kino_date,kino_date.kino_time,kino_date.chair_number
                        FROM kino_date
                        INNER JOIN kino ON kino_date.kino_id=kino.id
                        WHERE kino_date.kino_id='${id}'`;
         connection.query(sql, (err, result, fields) => {
              cd(err, result);
         })
    };
    // save reserve
    exports.saveReserve = ( req, cd ) => {
        let response = {err: [], result: []};
        let isEndEach = false;
        req.forEach( (item, key)=> {
            let keys = Object.keys(item);
            let values = Object.values(item);
            values = values.join("','");
            let sql = `INSERT INTO reserve (${keys.join(',')}) values(${"'" + values + "'"})`;
            connection.query(sql, (err, result, fields) => {
                if (err) {
                    response.err.push(err);
                } else {
                    response.result.push(result);
                }
                isEndEach = (key === req.length - 1);
            });
        });
        if (isEndEach) cd(response.err, response.result);
    };
    // get reserve data for id
    exports.getReserveId = (id, req, cd ) => {
        let sql = `SELECT row,col FROM reserve WHERE date_id=${id}`;
        connection.query(sql, (err, result, fields) => {
            cd(err, result);
        });
    };

    connection.on('error', function(err) {
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  })  
}
handleDisconnect();