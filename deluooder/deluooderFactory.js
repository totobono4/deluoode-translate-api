'use strict'

const Deluooder = require('./deluooder')

class DeluooderFactory {
  create () {
    return new Deluooder()
  }
}

module.exports = new DeluooderFactory()
