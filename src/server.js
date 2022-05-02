const express = require('express');
const connection = require('./database/db');
const router = require("./router/route");
const mysql = require('mysql2');


const app = express();

app.use(express.json());

app.use(router);

app.listen(5000,() => {
    console.log("port run on 5000");
})


