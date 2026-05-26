//independent file to import data to the database - no api endpoint

//connect the database

const mongoose = require('mongoose')
const fs = require('fs')
const Hotel = require('../models/hotel')

const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectionString = 'mongodb+srv://user:user1234@supercampus.uc3kqjs.mongodb.net/?appName=supercampus'
mongoose.connect(connectionString)
    .then((conn) => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log(err);
    })
//read the data from the file
const hotels = JSON.parse(fs.readFileSync('./data/hotels.json', 'utf8'))

//delete all data in the collection
    const deleteDocuments = async () => {
    try {
        await Hotel.deleteMany({})
        console.log("Collection Data Deleted successfully")
    } catch (error) {
        console.log("Deleted fail")
    }
    process.exit();
}   

//import data to the collection
    const importDocuments = async () => {
    try {
        await Hotel.create(hotels)
        console.log("Data are imported successfully")
    } catch (error) {
        console.log(error.message)
    }
    process.exit();
}
if (process.argv[2] === '--delete') {
    console.log("deleteDocuments")
    deleteDocuments()
}

if (process.argv[2] === '--import') {
    importDocuments()
}

console.log(process.argv)
