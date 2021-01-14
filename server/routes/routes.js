//initialize express router
let router = require("express").Router();

//set default API response
router.get("/", function (req, res) {
  res.json({
    status: "API Works",
    message: "Welcome to FirstRest API",
  });
});

//Import Bio Controller
var userController = require("../controllers/userConroller");
var platController = require("../controllers/platController");
var orderController = require("../controllers/orderController");
// var uploadController = require("../controllers/uploadController");

// Bio routes

router.route("/add").post(platController.addPlat);

router.route("/plats").get(platController.getPlats);
router.route("/update/:id").post(platController.updatePlat);
router.route("/product/:id").delete(platController.deleteProduct);
router.route("/plat/:id").get(platController.getPlat);

router.route("/get").get(userController.index);

router.route("/signin").post(userController.signin);
router.route("/user/:id").put(userController.updateUser);

router.route("/register").post(userController.add);

router.route("/orders").post(orderController.addOrder);
router.route("/orders").get(orderController.getOrders);

//Export API routes
module.exports = router;
