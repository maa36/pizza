const Order = require('../models/orderModal');


exports.addOrder = async  function (req, res)  {
   
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.adresse ||
      !req.body.total ||
      !req.body.cartItems
    ) {
      return res.send({ message: "Data is required." });
    }
    const order = await Order(req.body).save();
    res.send(order);
  };

  exports.getOrders =  async function (req, res)  {
    const orders = await Order.find({});
    res.send(orders);
  }