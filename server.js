const express = require('express');
const bodyParser = require('body-parser');

const db = require('./app/models');
const dbConfig = require('./app/config/db.config');

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Successfully connected to MongoDB.');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Connection error', err);
    process.exit();
  });

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to application.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/products.routes')(app);

// set ports, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${PORT}`);
});
