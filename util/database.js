const mysql = require('mysql2');

 // to get pool of connections as we have a multiple connections and multiple queries.
const pool = mysql.createPool({    
    host : 'localhost' ,
    user : 'root' ,
    database : 'node-complete',
    password : 'Shashi@2000'
}) 

module.exports = pool.promise();