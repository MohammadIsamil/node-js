const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'nodejsdb' 
});
exports.getvendor=( (req, res) => {
  connection.query('SELECT * FROM vendor', (err, results) => {
        if (err) {
            console.error('Error fetching vendors:', err);
            res.send('Internal Server Error');
        } else {
            res.json(results); 
        }
    });
    
})

