const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Database Item Model
const ItemModel = require("../models/restaurantItem");
const r = new ItemModel.RestaurantItemModel("us-east-1");

router.get("/", async (req, res) => {
    const menu = await r.getItems();
    console.log(menu);

    res.json(menu);
});

module.exports = router;