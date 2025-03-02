const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const swaggerDocument = require('./swagger-output.json');
const swaggerUi = require('swagger-ui-express');
const port = process.env.PORT || 3000;


app.use(bodyParser.json())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', require('./routes'))
    .get('/auth', (req, res) => {res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`)});

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });