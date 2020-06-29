const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');

const User = db.user;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user.role === 'admin') {
      req.userRole = user.role;
      next();
      return;
    }

    res.status(403).send({ message: 'Requires Admin Role!' });
  });
};

const getUserRole = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user.role) {
      req.userRole = user.role;
      next();
      return;
    }

    res.status(403).send({ message: 'Missing User Role!' });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  getUserRole,
};

module.exports = authJwt;
