const express = require("express");
const Stock = require("../models/Stock");

const router = express.Router();


router.get("/", async (req,res,next) => {
   try{
    const page = parseInt(req.query.page);

    const perpage = parseInt(req.query.perpage);
    const search = req.query.search;
    const filter = {};

    if(search){
        filter["$text"] = {$search: search};
    }

    const offset = (page-1) * perpage;

    const stocks = await Stock.find(filter).limit(perpage).skip(offset);

    const total = await Stock.countDocuments(filter);
    res.json({
        code: 200,
        message: "Success",
        data: stocks,
        total,
    })
   }catch{
    // console.log(err);
    // res.status(500).json({
    //     code: 500,
    //     message: err.message,
    // });
    next(err);
   }
 });

router.post("/", async(req,res,next) => {
try{
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json({
    message: "Stock created successfully",
    code: 201,
    data: stock})
}catch (err) {
    next(err);
}
 });

 const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const stock = await Stock.findById(id);
        if (!stock) {
            return res.status(404).json({
                code: 404,
                message: "Stock not found",
            });
        }
        req.stock = stock;
        next();
    } catch (err) {
        next(err);
    }
};


 router.get("/:id",getById, async(req,res) => {
    res.json({
        code: 200,
        message: "Success",
        data: req.stock,
    });
 } );

 router.put("/:id", getById, async (req,res,next) => {
    try{
        const stock = req.stock;
        stock.code = req.body.code;
        stock.name = req.body.name;
        stock.price = req.body.price;
        await stock.save();
        res.json({
            code: 200,
            message: "Updated Successful",
            data: stock,
        })

    }catch (err) {
        console.log(err);
        res.status(500).json({
            code: 500,
            message: err.message,
        })
    }
 });

 router.delete("/:id", getById, async (req, res, next) => {
    try {
        // Use deleteOne method to delete the stock by ID
        const result = await Stock.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                code: 404,
                message: "Stock not found",
            });
        }

        res.json({
            code: 200,
            message: "Deleted Successfully",
        });
    } catch (err) {
        next(err);
    }
});


module.exports = router;
