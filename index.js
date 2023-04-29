import generateData from './generateFiles.js'
import express from 'express'
import mongoose from 'mongoose'
import { MONGO_URL } from './config.js'

const app = express()
const port = 3000

let isGenerating = false

app.get('/initialize', (req, res) => {
  if (isGenerating) {
    return res.send('Already started generating data!')
  }
  isGenerating = true
  setInterval(generateData, 2000)

  res.send('Starting data generation...')
})

app.get('/synchronize', (req, res) => {
  res.send('Synchronizing...')
})

console.log('launching server')
const server = app.listen(port, '0.0.0.0', async () => {
  console.log(`Server listening at http://localhost:${port}`)

  await mongoose.connect(MONGO_URL, {
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
  mongoose.connection.close();
  console.log('Closing up')
})
