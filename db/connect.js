const mongoose = require("mongoose");

uri = "mongodb+srv://shriharsh:Shriharshatlas@elegant-cluster.7w7yk9a.mongodb.net/?retryWrites=true&w=majority&appName=Elegant-cluster";


const connectDB = () => {
    // console.log("connect db");
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;