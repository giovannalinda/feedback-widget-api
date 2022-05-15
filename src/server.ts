import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()

// GET = Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar uma informação

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "715690499ce7f9",
    pass: "ad45a69af5be3d"
  }
});

app.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Giovanna Souza <eugiovannasouza@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join('\n') 
  })

  return response.status(201).json(feedback)
})

app.listen(3333, () => {
  console.log('🔥 Server started at http://localhost:3333')
})