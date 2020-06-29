const db = require('../models');

const { ROLES } = db;
const User = db.user;

const checkDuplicateUsername = (req, res, next) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: 'Failed! Username is already in use!' });
      return;
    }

    next();
  });
};

const checkRoleExists = (req, res, next) => {
  if (req.body.role) {
    if (!ROLES.includes(req.body.role)) {
      res.status(400).send({
        message: `Failed! Role ${req.body.role} does not exist!`,
      });
      return;
    }
  } else {
    res.status(400).send({
      message: 'Failed! Role not provided!',
    });
    return;
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsername,
  checkRoleExists,
};

module.exports = verifySignUp;
