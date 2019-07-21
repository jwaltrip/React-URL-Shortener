require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")

const app = express()

// setup connection to sql database
require("./database/connection")

// import routes
const urlRoutes = require("./routes/url.route")
const userRoutes = require("./routes/user.route")

// setup middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))

// setup routes
app.use("/", userRoutes)
app.use("/api/url", urlRoutes)

app.get("/", (req, res) => {
  return res.json({ message: ".'. Hello Connected World .'." })
})

// set PORT var
const port = process.env.PORT || 5000

// setup app to listen on port
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app
