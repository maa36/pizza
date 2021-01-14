const mongoose = require("mongoose");


const platSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sizes: [String],
    price: [Number],
    image: { type: String, required: true },
    description: { type: String, required: true },
    ingredients : [String],
    priceIngredients : { type: Number, default: 0, required: true },
    supplements : [String] ,
    priceSupplements : { type: Number, default: 0, required: true },
  
  });
  
  const platModel = module.exports = mongoose.model('Plat', platSchema);
  
  module.exports.get = function (callback, limit) {
    platModel.find(callback).limit(limit); 
   }