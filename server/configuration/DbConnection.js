const mongoose = require('mongoose');

const uri = process.env['DATABASE_URI']
const connect_to_database = async () => {
    try {
        await mongoose.connect(uri);
    }
    catch (e) {
        console.log("Error connecting to database " + e)
    }
}
module.exports = connect_to_database;