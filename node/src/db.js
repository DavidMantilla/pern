const {Pool}= require('pg');
const {db}= require('./config');

pool=new Pool({
    user:db.user,
    password:db.password,
    port: db.port,
    database: db.database,
    host:db.host
}) 


module.exports= pool;