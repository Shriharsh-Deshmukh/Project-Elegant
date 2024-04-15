const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/products");

app.get("/",(req, res) => {
    res.send("Hi, I am live ");
});

//middleware or to set routers
app.use("/api/products", products_routes);

const start = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`${PORT} Yes I am connected to server`);
      });  
    } catch (error) {
        console.log(error);
    }
};

start();