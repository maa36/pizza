const jwt = require("jsonwebtoken");
const config = require('./config');


exports.getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      adresse : user.adresse,
      batiment : user.batiment,
      rue : user.rue,


    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};




