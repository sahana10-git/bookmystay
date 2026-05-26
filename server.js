const app = require('./app')
const mongoose = require('mongoose');

const port = 3000;
app.listen(port, 'localhost', () => {
    console.log("Express js server started")
})