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
  const email = req.query.email
  sequelize.Article.findOne({
    where: {
      id: req.params.id
    }
  }).then(article => {
    if (article === undefined) {
      res.status(400).send([])
    } else {
      if (email !== undefined && email !== null) {
        let changed = false
        let views = article.views
        if (views !== [{}]) {
          for (let view of views) {
            if (view.email === email) {
              view.opens = view.opens += 1
              changed = true
            }
          }
        }
        if (changed === false) {
          views.push({'email': email, 'opens': 1})
        }
        article.updateAttributes({
          views: views
        })
      }
      res.status(200).send(article)
    }
  })
})

router.post('/articles/new', function(req, res, next) {
  sequelize.Article.create({
    name: req.body.name,
    body: req.body.body,
    views: [{}]
  }).then(_ => {
    res.status(200)
  }).catch(_ => {
    res.status(400)
  })
})

router.delete('/articles/delete/:id', function(req, res, next) {
  sequelize.Article.destroy({
    where: {
      id: req.params.id
    }
  }).then(_ => {
    req.status(200)
  }).catch(_ => {
    req.status(400)
  })
})

router.post('/articles/edit/:id', function(req, res, next) {
  sequelize.Article.findOne({
    where: {
      id: req.params.id
    }
  }).then(article => {
    article.updateAttributes({
      name: req.body.name,
      body: req.body.body
    }).then(_ => {
      res.status(200)
    }).catch(_ => {
      res.status(400)
    })
  }).catch(_ => {
    res.status(400)
  })
})

router.post('/articles/duplicate/:id', function(req, res, next) {
  sequelize.Article.findOne({
    where: {
      id: req.params.id
    }
  }).then(article => {
    sequelize.Article.create({
      name: article.name,
      body: article.body,
      views: article.views
    }).then(_ => {
      res.status(200)
    }).catch(_ => {
      res.status(400)
    })
  }).catch(_ => {
    res.status(400)
  })
})

module.exports = router