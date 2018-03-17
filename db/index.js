var config = require('dotenv').config()
var express = require('express');
var mysql = require('mysql');
var app = express();

var connect = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    connectionLimit: 50
});

connect.connect((error)=>{
    if(error){
        console.log("error when trying to connet to db:"+error);

    } else {
        console.log("Connection stablished with DB");
    }
})

app.get('/', ((req, res)=>{
    connect.query("select * from menu", ((error,rows, fields)=>{
        if(error){
            console.log("unable to fetch data from db")
        }else{
            console.log("Succesful query")
            console.log(rows)
            res.send("hello the breakfast is: "+ rows[0].desayuno)
        }
    }))
}))

app.listen(process.env.WEB_PORT);