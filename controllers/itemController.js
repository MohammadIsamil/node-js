const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'nodejsdb' 
});

exports.createitem= ( (req, res) => { 
    console.log(`my  `);
    const { name, QTY, vendor } = req.body;
    const sql = 'INSERT INTO item (Name, QTY, VendorID) VALUES (?, ?, ?)';
connection.query(sql, [name, QTY, vendor], (error, results) => {
    if (error) {
        console.error('Error inserting data:', error);
        res.send('Error inserting data');
    } else {
        console.log('Data inserted successfully');
        res.send('Form submitted');
    }
});

    
})


