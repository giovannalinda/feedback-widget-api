import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from './../mail-adapter'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "715690499ce7f9",
    pass: "ad45a69af5be3d"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Giovanna Souza <eugiovannasouza@gmail.com>',
      subject,
      html: body
    })
  }
}