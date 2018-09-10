const express = require('express')
const Sequelize = require('sequelize')

const router = express.Router()
const sequelize = new Sequelize(`postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@database:5432`, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
  }
})

const userList = ['John Smith', 'J. Random Hacker', 'Jill Smith', 'Amy Jones', 'Donovan Brown']

sequelize.authenticate()
  .then(function (data) {
    console.log('Database connection successful!')
  }, function (err) {
    console.log('Unable to connect to the database:', err)
  })

sequelize.User = sequelize.import('./models/User')
sequelize.Article = sequelize.import('./models/Article')

sequelize.sync({force: true})
  .then(function (data) {
    console.log('Database synced!')
    userList.forEach(function(name) {
      sequelize.User.create({
        username: name
      })
    })
  }, function (err) {
    console.log('An error occurred while creating the table:', err)
  })

router.get('/users/all', function(req, res, next) {
  sequelize.User.all({
    raw: true
  }).then(users => {
    if (users === undefined || users.length === 0) {
      res.status(400).send([])
    } else {
      res.status(200).send(users)
    }
  })
})

router.get('/articles/all', function(req, res, next) {
  sequelize.Article.all({
    raw: true
  }).then(articles => {
    if (articles === undefined || articles.length === 0) {
      res.status(400).send([])
    } else {
      res.status(200).send(articles)
    }
  })
})

router.get('/articles/:id', function(req, res, next) {
  sequelize.Article.findOne({
    raw: true,
    where: {
      id: req.params.id
    }
  }).then(article => {
    if (article === undefined || article.length === 0) {
      res.status(400).send([])
    } else {
      res.status(200).send(article)
    }
  })
})

router.post('/articles/new', function(req, res, next) {
  sequelize.Article.create({
    name: req.body.name,
    body: req.body.body
  }).then(_ => {
    res.status(200)
  }).catch(_ => {
    res.status(400)
  })
})

module.exports = router