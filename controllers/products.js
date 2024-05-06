const Product = require("../models/product");

const getAllProducts = async(req, res) => {
    const { company, name, featured, sort, select } = req.query;
    console.log("🚀 ~ file: products.js ~ line 5 ~ getAllProducts ~ sort", sort);
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }

    if(featured){
        queryObject.featured = featured;
    }

    if(name){
        queryObject.name = { $regex : name, $options: "i" };
    }

    let apiData = Product.find(queryObject);

    if(sort){
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    // select =name company;
    if(select){
       //let selectFix = select.replace(","," ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    console.log(queryObject.company);

    const myData = await apiData;
    res.status(200).json({ myData });
};

const getAllProductsTesting = async(req, res) => {
    const myData = await Product.find( req.query ).select("name price");
    res.status(200).json({ myData });
};

module.exports = { getAllProducts, getAllProductsTesting };
