const mongoose = require("mongoose");

let orderSchema= new mongoose.Schema({
    totalPrice: Number,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'items' }]
})

module.exports =  mongoose.model("orders",orderSchema);
