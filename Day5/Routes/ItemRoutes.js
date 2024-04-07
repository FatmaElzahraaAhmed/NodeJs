const express = require("express");
const router = express.Router();
const itemsController = require("../Controllers/ItemController");

router.post("/", itemsController.createItem);

router.get("/", itemsController.getAllItems);

router.get("/:id", itemsController.getItemById);

router.patch("/:id", itemsController.updateItem);

router.delete("/:id", itemsController.deleteItem);

module.exports = router;
