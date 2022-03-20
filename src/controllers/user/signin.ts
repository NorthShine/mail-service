import { sendEmail } from '../../services/mail.services';
import ApiError from '../../exceptions/api-errors';
import * as expressValidator from 'express-validator';
import { Response, Request, NextFunction } from 'express';

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, token } = req.body;

  if (!email) return next(ApiError.badRequest('Missing email'));

  if (!token) return next(ApiError.badRequest('Missing token'));

  try {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) return next(ApiError.badRequest('Validation Error', errors.array()));

    const url = `http://localhost:3001/api/signin/${token}`;
    await sendEmail({
      to: email,
      subject: 'Verify Account',
      html: `Click <a href = '${url}'>here</a> to confirm your email.`
    });
    return res
      .status(200)
      .send({ message: `Sent a verification email to ${email}` })
      .end();
  } catch (err) {
    next(err);
  }
};
