
const express = require("express");
const app = express();
const PORT = process.env.PORT||7005;
const bodyParser = require("body-parser");
const OrdersRoutes = require("./Routes/OrderRoutes");
const ItemsRoutes = require("./Routes/ItemRoutes");
const UsersRoutes = require("./Routes/UserRoutes");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Day5")

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use("/api/orders", OrdersRoutes);
app.use("/api/items", ItemsRoutes);
app.use("/api/users", UsersRoutes)

app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)})

