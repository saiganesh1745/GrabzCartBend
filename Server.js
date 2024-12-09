const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require('node-cron'); // Import node-cron
require('dotenv').config();

const dburl = process.env.mongodburl;
mongoose.connect(dburl).then(() => {
    console.log("Connected to DB Successfully");
}).catch((err) => {
    console.log(err.message);
});

const app = express();
app.use(express.json());
app.use(cors());

const userrouter = require("./routes/userroutes");
const productrouter = require("./routes/productroutes");
const cartrouter = require("./routes/cartroutes");

app.use("", userrouter);
app.use("", productrouter);
app.use("",cartrouter)
app.use('/images', express.static('images'));

const Product = require('./models/Product');

// Cron job: Update expired discounts at midnight every day
cron.schedule('0 0 * * *', async () => {
    const currentDate = new Date();

    try {
        // Find products with expired discounts
        const expiredProducts = await Product.find({
            discountValidUntil: { $lt: currentDate },
            saleType: { $ne: 'Regular' }
        });

        // Update products to "Regular" and reset discount
        for (const product of expiredProducts) {
            product.saleType = 'Regular';
            product.priceDiscount = 0;
            await product.save();
        }

        console.log('Expired discounts updated successfully');
    } catch (error) {
        console.error('Error updating expired discounts:', error);
    }
});

const port = process.env.PORT || 1234;   //if env file is not there or will be taken
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});