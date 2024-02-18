const express = require('express');
const app = express(); 
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv'); 
dotenv.config({ path: './.env' });

const PublicDirectory = path.join(__dirname, '/public'); // Specify the correct path

app.use(express.static(PublicDirectory));
app.use('/vendor', require('./routes/vendor'));
app.use('/item', require('./routes/item'));





const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
});

connection.connect((err) => {
    if (err) throw new Error(err);
    console.log("Connected to MySQL");

    connection.query('DROP DATABASE IF EXISTS nodejsdb', (err) => {
        if (err) throw new Error(err);
        console.log("Database dropped");

        connection.query('CREATE DATABASE nodejsdb', (err) => {
            if (err) throw new Error(err);
            console.log("Database created");
            
            connection.changeUser({ database: 'nodejsdb' }, (err) => {
                if (err) throw new Error(err);
                createTable();
            });
        });
    });
});

function createTable() {
    connection.query(
        'CREATE TABLE IF NOT EXISTS vendor  (' +
        'id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,' +
        'Name VARCHAR(100),' +
        'Location VARCHAR(100)' +
        ')',
        (err) => {
            if (err) throw new Error(err);
            console.log("Vendor table created");
            const sql = 'INSERT INTO vendor (Name, Location) VALUES (?, ?)';
            const values = ['Ali K', 'Beirut'];
            connection.query(sql, values, (error, results) => {
                if (error) {
                    console.error('Error inserting data:', error);
                } else {
                    console.log('Data inserted into vendor table successfully');
                }
            });
        }
    );
    connection.query(
        'CREATE TABLE IF NOT EXISTS item (' +
        'id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,' +
        'Name VARCHAR(100),' +
        'QTY INT(11),' +
        'VendorID INT(11),' +
        'FOREIGN KEY (VendorID) REFERENCES vendor(id)' +
        ')',
        (err) => {
            if (err) throw new Error(err);
            console.log("Item table created");
        }
    );
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
