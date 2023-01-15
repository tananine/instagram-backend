const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')

const db = require('./models')

const app = express()
const routers = require('./routes')

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString())
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).any())
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(bodyParser.json())
const corsOptions = {
  origin: 'http://localhost:3000',
  credential: true,
}
app.use(cors(corsOptions))

app.use('/', routers)

app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message: message, data: data })
})

db.sequelize
  .sync({ alter: true })
  // .sync()
  .then(() => {
    app.listen(3001)
  })
  .catch((err) => console.log(err))
