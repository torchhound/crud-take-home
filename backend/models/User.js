const Sequelize = require('sequelize')

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    }
  })
  return User
}