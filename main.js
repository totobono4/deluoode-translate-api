'use strict'

require('dotenv').config()
const Deluooder = require('deluoode-translator')

const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const hostname = process.env.HOSTNAME || 'localhost'
const port = process.env.PORT || '80'

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.post('/translate/*/*', async (req, res) => {
  const languageFrom = req.params[0]
  const languageTo = req.params[1]
  const sentence = req.body.sentence

  const deluooder = new Deluooder()

  await deluooder.init({ slowMo: 10 })
  await deluooder.setLanguageFrom(languageFrom)
  await deluooder.setLanguageTo(languageTo)
  await deluooder.setSentence(sentence)

  const translation = await deluooder.getTranslation()
  deluooder.close()

  res.send({ translation })
})

app.listen(port, hostname, () => {
  console.log(`Le serveur tourne à l'adresse https://${hostname}:${port}/`)
})
