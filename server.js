const app = require('./app')
const mongoose = require('mongoose');
const port = 3000;

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectionString = 'mongodb+srv://user:user1234@supercampus.uc3kqjs.mongodb.net/?appName=supercampus'

mongoose.connect(connectionString)
    .then((conn) => {
        console.log("connected to database")
    })
    .catch((err) => {
        console.log("Database connection failed:", err);
    })

    app.listen(port, 'localhost', () => {
        console.log("Express js server started")
        })