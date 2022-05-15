import express from 'express'

const app = express()

app.get('/users', (request, response) => {
  return response.send('hello world')
})

app.listen(3333, () => {
  console.log('🔥 Server started at http://localhost:3333')
})