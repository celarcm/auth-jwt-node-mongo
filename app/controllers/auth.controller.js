const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const db = require('../models');

const User = db.user;

exports.signUp = (req, res) => {
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    lastname: req.body.lastname,
    age: req.body.age,
    role: req.body.role || 'client',
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: 'User was registered successfully!' });
  });
};

exports.signIn = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        res.status(404).send({ message: 'User Not found.' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      const token = jwt.sign({ id: user.id }, config.SECRET, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        age: user.age,
        role: user.role,
        accessToken: token,
      });
    });
};
