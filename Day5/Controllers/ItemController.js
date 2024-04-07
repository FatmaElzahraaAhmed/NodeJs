const Item = require("../Models/ItemModel");

async function createItem(req, res) {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllItems(req, res) {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getItemById(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (req.body.name != null) {
      item.name = req.body.name;
    }
    if (req.body.price != null) {
      item.price = req.body.price;
    }
    if (req.body.desc != null) {
      item.desc = req.body.desc;
    }
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Item not found" });
    }
    await Item.deleteOne({ _id: req.params.id });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
