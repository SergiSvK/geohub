import { Resend } from 'resend'
import { EMAIL_FROM } from '@utils/constants/random'

const resend = new Resend(process.env.RESEND_API_KEY as string)

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const { error } = await resend.emails.send({ from: EMAIL_FROM, to, subject, html })

    if (error) {
      console.error(error)
      return false
    }
  } catch (err) {
    console.error(err)
    return false
  }

  return true
}

export default sendEmail
