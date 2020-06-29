const db = require('../models');

const Product = db.product;

// Create and save a new Product
exports.create = (req, res) => {
  // Create a Product
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    created_by: req.userId,
  });
  // Save Product in the database
  product
    .save(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while creating the Product.',
      });
    });
};

exports.findAll = (req, res) => {
  Product.find()
    .then((data) => {
      if (req.userRole !== 'admin') {
        res.send(data.map((product) => {
          return {
            // eslint-disable-next-line no-underscore-dangle
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
          };
        }));
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while retrieving products.',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Not found product with id ${id}` });
      } else {
        if (req.userRole !== 'admin') {
          res.send({
            name: data.name,
            price: data.price,
            description: data.description,
          });
        }
        res.send(data);
      }
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: `Error retrieving Product with id ${id}` });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const { id } = req.params;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.send({ message: 'Product was updated successfully.' });
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Product with id ${id}`,
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;

  Product.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: 'Product was deleted successfully!',
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Product with id ${id}`,
      });
    });
};
