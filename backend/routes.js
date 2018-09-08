const express = require('express')
const Sequelize = require('sequelize')

const router = express.Router()
const sequelize = new Sequelize(`postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@database:5432`, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
})

sequelize.authenticate()
  .then(function (data) {
    console.log('Database connection successful!')
  }, function (err) {
    console.log('Unable to connect to the database:', err)
  })

sequelize.User = sequelize.import('../models/User')
sequelize.Article = sequelize.import('../models/Article')

sequelize.sync({force: true})
  .then(function (data) {
    console.log('Database synced!')
  }, function (err) {
    console.log('An error occurred while creating the table:', err)
  })

module.exports = router