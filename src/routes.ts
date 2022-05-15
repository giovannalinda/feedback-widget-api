import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import express from 'express'

export const routes = express.Router()

routes.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailMailAdapter
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })

  return response.status(201).send()
})