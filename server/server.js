const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv");

const userRouter = require('./routes/user')

// Configuration
dotenv.config({path: __dirname + '/setting.env'})
const PORT = 5000

const app = express()

// Middlewares
app.use(express.json())

// connecting to the database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    })

// Routers
app.use('/api/users', userRouter)

// Activating the app
app.listen(PORT, () => {
    console.log('the server is app and running on port ' + PORT)
})