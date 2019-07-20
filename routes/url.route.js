const express = require("express")
const shortid = require('shortid')
const router = express.Router()
const Url = require("../models/Url")

const addUrl = (originalUrl) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:5000/"
  
  // generate shortId to associate with long url
  // this should be unique according to shortid docs
  const shortId = shortid.generate()
  
  // generate short url
  const shortUrl = baseUrl + shortId
  
  // create and return (promise) Url db entry
  return Url.create({
    shortId,
    originalUrl,
    shortUrl
  })
}

router.post("/", async (req, res) => {
  try {
    const { originalUrl } = req.body;
    // if originalUrl is undefined, send error status
    if (!originalUrl) {
      return res.sendStatus(400)
    }
    
    const saveUrl = await addUrl(originalUrl)
    console.log(`SQL Url object saved: ${JSON.stringify(saveUrl, null, 4)}`)
    
    res.json(saveUrl)
  } catch (e) {
    
    console.error(`Error: could not save URL to database. \n\n${e}`)
    res.sendStatus(400)
  }
})

router.get("/", (req, res) => {

})

module.exports = router;
