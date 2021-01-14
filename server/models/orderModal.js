const mongoose = require("mongoose");
const shortid = require("shortid");

const orderSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate,
      },
      email: { type: String, required: true },
      name: { type: String, required: true },
      adresse: { type: String, required: true },
      total: { type: Number, required: true },
      cartItems: {type : Array}
    
  
  },
  {
    timestamps: true,
  });
  
  const OrderModal = module.exports = mongoose.model('Order', orderSchema);
  
  module.exports.get = function (callback, limit) {
    OrderModal.find(callback).limit(limit); 
   }