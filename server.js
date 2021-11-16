const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')

const { errorHandler } = require('./middlewares/errorHandler')

// Routes
const AccountRouter = require('./routes/account')
const APIRouter = require('./routes/api')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://dbUser:dbUserPassword@cluster0.28lky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 3600000,
}))

app.use('/account', AccountRouter)
app.use('/api', APIRouter)
app.use(errorHandler)

app.listen(3000, () => {
  console.log('listening on port 3000')
})
