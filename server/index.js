'use strict'

const express = require('express')
const app = express()
const port = 3000
const bodyParser= require('body-parser')
const validUrl = require("valid-url");
const databaseConnect = require('./db/index')
const { nanoid } = require('nanoid')

const shortnerDomainName = 'https://leg.al/'

console.log('Starting ...')

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Server Error!')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// resolve provided hashed url into MongoDB ObjectId
app.get('/resolve', async (req, res) => {
  const db = await databaseConnect()
  const shortUrl = req.query.h
  console.log('Requested hash: ' + shortUrl)

  const url = await db.collection('urls').findOne({ shortUrl: shortUrl })
  console.log('Result: ' + JSON.stringify(url))
  if (url == null) {
    return res.status(404).send("Not found")
  }
  
  return res.status(200).json(url.originalUrl)
})
    
// encode long url into short version
app.post('/shorten', async (req, res) => {
  const db = await databaseConnect()
  const originalUrl = req.body.url

  const shortUrl = nanoid(6)

  try {
    var existingUrl = await db.collection('urls').findOne({ originalUrl: originalUrl })
    if (existingUrl !== null) {
      return res.status(200).json(existingUrl.originalUrl)
    } else {
      await db.collection('urls').insertOne({ 
        originalUrl: originalUrl,
        shortUrl: shortUrl
      })

      return res.status(201).json(shortUrl)
    }
  } catch (err) {
    console.error(err.message)
  }
})    


app.listen(port, () => {
  console.log(`Shortener app listening at http://localhost:${port}`)
})
