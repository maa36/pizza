const mongoose = require("mongoose");

const imageShema = new mongoose.Schema({
  meta_data:{}
});

const imageModel = (module.exports = mongoose.model("Image", imageShema));

module.exports.get = function (callback, limit) {
  imageModel.find(callback).limit(limit);
};
