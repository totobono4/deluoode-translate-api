'use strict';

const deluooder = new (require('./deluooder'));
const { selectors, languages } = require('./deluoode.json');

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || '80';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/translate/*/*', async (req, res) => {
  const languageFrom = req.params[0];
  const languageTo = req.params[1];
  const sentence = req.body.sentence;

  await deluooder.init();

  await deluooder.setLanguageFrom(languages[languageFrom]);
  await deluooder.setLanguageTo(languages[languageTo]);
  await deluooder.setSentence(sentence);

  const translation = await deluooder.getTranslation();

  res.send({translation})
})

app.listen(port, hostname, () => {
  console.log(`Le serveur tourne à l'adresse https://${hostname}:${port}/`);
})
