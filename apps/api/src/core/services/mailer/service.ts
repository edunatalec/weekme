import { Injectable } from '@nestjs/common';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

interface SendParams {
  to: {
    email: string;
    name: string;
  };
  subject: string;
  message: string;
}

@Injectable()
export class MailerService {
  private mailer: MailerSend;
  private from: Sender;

  constructor() {
    this.mailer = new MailerSend({
      apiKey: process.env.MAILER_SEND_TOKEN!,
    });

    this.from = new Sender(process.env.FROM_EMAIL!, 'WeekMe');
  }

  public async send(params: SendParams): Promise<void> {
    const emailparams = new EmailParams()
      .setFrom(this.from)
      .setTo([new Recipient(params.to.email, params.to.name)])
      .setReplyTo(this.from)
      .setSubject(params.subject)
      .setHtml(params.message);

    await this.mailer.email.send(emailparams);
  }
}
