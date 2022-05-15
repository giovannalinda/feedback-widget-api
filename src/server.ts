import express from 'express'
import { prisma } from './prisma'

const app = express()

// GET = Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar uma informação

app.use(express.json())

app.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  return response.status(201).json(feedback)
})

app.listen(3333, () => {
  console.log('🔥 Server started at http://localhost:3333')
})