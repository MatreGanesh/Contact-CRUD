const mongoose = require('mongoose');


const connectDB = async (MONGODB_URL) => {
    try {
        const DB_Options = {
            dbName: 'Contect_App'
        }

        await mongoose.connect(MONGODB_URL, DB_Options);
        console.log('Connected Successfully to MongoDB !!')

    } catch (error) {
        console.log('MongoDb Error :', error)
    }
}


module.exports = connectDB;