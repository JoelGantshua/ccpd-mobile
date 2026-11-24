import {
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class VerificationMailService {
  isConfigured(): boolean {
    return [
      'SMTP_HOST',
      'SMTP_PORT',
      'SMTP_USER',
      'SMTP_PASSWORD',
      'SMTP_FROM',
    ].every((key) => Boolean(process.env[key]?.trim()));
  }

  async sendVerificationEmail(
    recipient: string,
    code: string,
  ): Promise<void> {
    if (!this.isConfigured() || !/^\d{6}$/.test(code)) {
      throw new ServiceUnavailableException(
        'Service de verification indisponible',
      );
    }

    const port = Number(process.env.SMTP_PORT);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new ServiceUnavailableException(
        'Configuration SMTP invalide',
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port,
      secure: port === 465,
      requireTLS: port !== 465,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASSWORD!,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM!,
        to: recipient,
        subject: 'CCPD Mobile - Code de verification',
        text: [
          'Bienvenue sur CCPD Mobile.',
          '',
          `Votre code de verification est : ${code}`,
          '',
          'Ce code expire apres 10 minutes.',
          'Ne communiquez ce code a personne.',
          '',
          'Apres verification, votre compte devra',
          'etre approuve par un administrateur.',
          '',
          'Si vous n avez pas cree de compte,',
          'ignorez cet e-mail.',
        ].join('\n'),
      });
    } finally {
      transporter.close();
    }
  }
}
