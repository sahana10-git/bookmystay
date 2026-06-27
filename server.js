const app = require('./app')
const mongoose = require('mongoose');
const port = process.env.PORT;
const dotenv = require('dotenv')

dotenv.config({
    path: './config.env'
})

//console.log(app.get('env'))
console.log(process.env)

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString)
    .then(async (conn) => {
        try {
            await conn.connection.collection('users').dropIndex('mobile_1')
            console.log('dropped stale mobile index')
        } catch (err) {
            if (!err.message.includes('index not found')) {
                console.log('Index cleanup warning:', err.message)
            }
        }

        console.log("connected to database")
    })
    .catch((err) => {
        console.log("Database connection failed:", err);
    })

    app.listen(port || 3000, 'localhost', () => {
        console.log("Express js server started")
        })