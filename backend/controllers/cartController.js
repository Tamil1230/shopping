const express = require('express');
const router = express.Router();
const Cart = require('../model/cartModel');
router.post('/save', async (req, res) => {
  const { userId, items } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = await Cart.create({ userId, items });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;