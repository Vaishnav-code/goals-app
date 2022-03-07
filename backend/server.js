const { urlencoded } = require('express');
const express = require('express')
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;


const app = express()
app.use(express.json())
app.use(urlencoded({ extended: false }))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use(errorHandler)
app.listen(port, () => console.log(`test test, port on ${port}`)) 