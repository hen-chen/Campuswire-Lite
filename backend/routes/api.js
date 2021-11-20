const express = require('express')

const { isAuthenticated } = require('../middlewares/isAuthenticated')
const Question = require('../models/questions')

const router = express.Router()

router.get('/questions', async (req, res, next) => {
  try {
    const question = await Question.find()
    res.send(question)
  } catch (err) {
    next(new Error('could not get questions'))
  }
})

router.post('/questions/add', isAuthenticated, async (req, res, next) => {
  const { questionText, answer } = req.body
  try {
    await Question.create({ questionText, answer, author: req.session.username })
    res.send('Question added')
  } catch (err) {
    next(new Error('could not add question'))
  }
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body
  try {
    await Question.updateOne({ _id }, { answer })
    res.send('Question answered')
  } catch (err) {
    next(new Error('could not answer question'))
  }
})

module.exports = router
