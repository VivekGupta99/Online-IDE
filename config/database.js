const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://Vivek1:vivekgupta@cluster0.xpfdemn.mongodb.net/IDE';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("Connected successfully to MongoDB");
});
