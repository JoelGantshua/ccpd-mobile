
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
        'APP_VERIFY_URL',
      ].every((key) => Boolean(process.env[key]?.trim()));
    }
  
    async sendVerificationEmail(
      recipient: string,
      token: string,
    ): Promise<void> {
      if (!this.isConfigured()) {
        throw new ServiceUnavailableException(
          'Service de verification e-mail non configure',
        );
      }
  
      const port = Number(process.env.SMTP_PORT);
      const rawUrl = process.env.APP_VERIFY_URL!;
  
      if (
        !Number.isInteger(port) ||
        port < 1 ||
        port > 65535
      ) {
        throw new ServiceUnavailableException(
          'Configuration SMTP invalide',
        );
      }
  
      let verificationUrl: URL;
  
      try {
        verificationUrl = new URL(rawUrl);
  
        if (verificationUrl.protocol !== 'https:') {
          throw new Error('HTTPS requis');
        }
  
        verificationUrl.searchParams.set('token', token);
      } catch {
        throw new ServiceUnavailableException(
          'URL de verification invalide',
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
  
      const link = verificationUrl.toString();
  
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM!,
          to: recipient,
          subject: 'CCPD Bloc Est RDC - Verification de votre e-mail',
          text: [
            'Bienvenue sur CCPD Mobile.',
            '',
            'Pour verifier votre adresse e-mail,',
            'ouvrez le lien suivant :',
            link,
            '',
            'Ce lien expire apres 30 minutes.',
            'Si vous n avez pas cree de compte,',
            'ignorez cet e-mail.',
          ].join('\n'),
        });
      } finally {
        transporter.close();
      }
    }
  }
  