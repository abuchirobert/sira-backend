const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        console.error('MONGO_URL environment variable is not set');
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        //console.log(`Database is connected`)
        //console.log(`MongoDB Connected: ${conn.connection.host} ${conn.connection.name}`);

        // Handle disconnect event
        mongoose.connection.on('disconnect', () => {
            console.error('MongoDB connection lost');
            process.exit(1);
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;