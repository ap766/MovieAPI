require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const crudroutes = require('./routes/crud')
const userroutes = require('./routes/user')
const reportroutes = require('./routes/report')

// express app
const app = express()

// middleware
//if json ,parses json data to a javascript object.his makes the parsed JSON data accessible for further processing within your route handlers or other middleware.
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/crud', crudroutes)
app.use('/api/user', userroutes)
app.use('/api/report', reportroutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
