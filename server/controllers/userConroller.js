const User = require("../models/userModel");
const { getToken } = require("../util");
var bcrypt = require("bcrypt");

exports.index = function (req, res) {
  User.get(function (err, user) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    res.json({
      status: "success",
      message: "Got Bio Successfully!",
      data: user,
    });
  });
};

exports.updateUser = async function (req, res) {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.rue = req.body.rue || user.rue;
    user.adresse = req.body.adresse || user.adresse;
    user.batiment = req.body.batiment || user.batiment;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      rue: updatedUser.rue,
      adresse: updatedUser.adresse,
      batiment: updatedUser.batiment,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
};
exports.signin = async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (email == null || password == null) {
    return res.status(400).json({ error: "missing parameters" });
  }

  const userFound = await User.findOne({
    email: email,
  });

  if (userFound) {
    bcrypt.compare(
      password,
      userFound.password,
      function (errBycrypt, resBycrypt) {
        if (resBycrypt) {
          return res.send({
            // _id: userFound.id,
            // name: userFound.name,
            // email: userFound.email,
            // isAdmin: userFound.isAdmin,
            // phone: userFound.phone,
            // rue: userFound.rue,
            // adresse: userFound.adresse,
            // batiment: userFound.batiment,
            token: getToken(userFound),

            // token: getToken(userFound),
          });
        } else {
          return res.send({ error: "invalid password" });
        }
      }
    );
  } else {
    return res.send({ error: "cannot log on user" });
  }
};

exports.add = async function (req, res) {
  // Params
  var email = req.body.email;
  var name = req.body.name;
  var phone = req.body.phone;
  var password = req.body.password;
  var rue = req.body.rue;
  var batiment = req.body.batiment;
  var adresse = req.body.adresse;

  if (
    email == null ||
    name == null ||
    password == null ||
    phone == null ||
    batiment == null ||
    rue == null ||
    adresse == null
  ) {
    return res.send({ error: "missing parameters" });
  }

  const userFound = await User.findOne({
    email: req.body.email,
  });
  if (!userFound) {
    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
      var newUser = User.create({
        email: email,
        name: name,
        password: bcryptedPassword,
        phone: phone,
        rue: rue,
        batiment: batiment,
        adresse: adresse,
        isAdmin: 0,
      })
        .then(function (newUser) {
          res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            phone: newUser.phone,
            rue: newUser.rue,
            adresse: newUser.adresse,
            batiment: newUser.batiment,
            token: getToken(newUser),
          });
        })
        .catch(function (err) {
          return res.send({ error: "cannot add user" });
        });
    });
  } else {
    return res.send({ error: "user already exist" });
  }
};
