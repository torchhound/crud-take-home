const Sequelize = require('sequelize')

module.exports = function (sequelize, DataTypes) {
  let Article = sequelize.define('Article', {
    name: {
      type: Sequelize.STRING,
      validate: {
        is: {
          args: /^[a-z0-9\s]+/gi,
          msg: 'Titles may only contain alphanumeric characters and white space.'
        }
      }
    },
    body: Sequelize.TEXT,
    views: Sequelize.JSON
  })
  return Article
}