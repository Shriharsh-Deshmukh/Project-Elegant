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

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    console.log(queryObject);

    const Products = await apiData;
    res.status(200).json({ Products, nbHits: Products.length });
};

    const getAllProductsTesting = async(req, res) => {
    console.log(req.query);
    const Products = await Product.find( req.query );
    //sort = name,price;

    res.status(200).json({ Products, nbHits: Products.length });
};

module.exports = { getAllProducts, getAllProductsTesting };
