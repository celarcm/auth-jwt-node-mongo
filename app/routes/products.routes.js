const { authJwt } = require('../middleware');
const controller = require('../controllers/product.controller');

module.exports = (app) => {
  app.use((_req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get(
    '/products',
    [authJwt.verifyToken, authJwt.getUserRole],
    controller.findAll,
  );

  app.get(
    '/products/:id',
    [authJwt.verifyToken, authJwt.getUserRole],
    controller.findOne,
  );

  app.post(
    '/products',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create,
  );

  app.put(
    '/products/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update,
  );

  app.delete(
    '/products/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete,
  );
};
