import * as nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import { googleClientInstance } from './google.services';

const createTransporter = async () => {
  const { accessToken } = await googleClientInstance();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  return transporter;
};

export const sendEmail = async (emailOptions: Options) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};
