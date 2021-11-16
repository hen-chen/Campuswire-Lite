const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')

const config = require('./config')
const { errorHandler } = require('./middlewares/errorHandler')

// Routes
const AccountRouter = require('./routes/account')
const APIRouter = require('./routes/api')

const app = express()

const { dbUrl } = config
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: 1,
  connectTimeoutMS: 30000,
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
