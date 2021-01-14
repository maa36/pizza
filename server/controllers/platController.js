const Plat = require("../models/platModel");

exports.addPlat = async function (req, res) {
  const plat = new Plat({
    name: req.body.name,
    sizes: req.body.sizes,
    price: req.body.price,
    image: req.body.image,
    ingredients: req.body.ingredients,
    priceIngredients: req.body.priceIngredients,
    supplements: req.body.supplements,
    priceSupplements: req.body.priceSupplements,
    description: req.body.description,
  });
  const newPlat = await plat.save();
  if (newPlat) {
    return res
      .status(201)
      .send({ message: "New Product Created", data: newPlat });
  }
  return res.status(500).send({ message: " Error in Creating Product." });
};
exports.getPlats = async function (req, res) {
  const plats = await Plat.find({});
  if (plats) {
    res.send(plats);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
};

exports.updatePlat = async function (req, res) {
  const admin = req.headers.authorization;
  if (admin) {
    const productId = req.params.id;
    const product = await Plat.findById(productId);
    if (product) {
      product.image = req.body.image;
      product.sizes = req.body.sizes;
      product.name = req.body.name;
      product.description = req.body.description;
      product.priceSupplements = req.body.priceSupplements;
      product.priceIngredients = req.body.priceIngredients;
      product.supplements = req.body.supplements;
      product.ingredients = req.body.ingredients;
      product.price = req.body.price;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: "Product Updated", data: updatedProduct });
      }
    }
    return res.status(500).send({ message: " Error in Updating Product." });
  } else {
    res.status(404).send({ message: "It is not Admin!." });
  }
};
exports.getPlat = async function (req, res) {
  const plat = await Plat.findOne({ _id: req.params.id });
  if (plat) {
    res.send(plat);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
};

exports.deleteProduct = async function (req, res) {
  const admin = req.headers.authorization;
  if (admin) {
    const deletedProduct = await Plat.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: "Product Deleted" });
    } else {
      res.send("Error in Deletion.");
    }
  } else {
    res.status(404).send({ message: "It is not Admin!." });
  }
};
