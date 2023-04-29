import generateData from './generateFiles.js'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 3000

let isGenerating = false

app.get('/initialize', (req, res) => {
  if (isGenerating) {
    res.send('Already started generating data!')
  }
  isGenerating = true
  setInterval(generateData, 20000)

  res.send('Starting data generation...')
})

app.get('/synchronize', (req, res) => {
  res.send('Synchronizing...')
})

console.log('launching server')
const server = app.listen(port, async () => {
  console.log(`Server listening at http://localhost:${port}`)

  await mongoose.connect('mongodb://p2p-database-hostname:27017/p2p-db', {
    useNewUrlParser: true
  })

  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('Connected to MongoDB!')
  })
})

server.on('close', () => {
  isGenerating = false
  console.log('Closing up')
})
