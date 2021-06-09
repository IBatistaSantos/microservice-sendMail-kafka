import fs from "fs";
import handlebars from "handlebars";
import  { Transporter } from "nodemailer";
import { IMailProvider, IParamsSendMail } from "../../data/mail/protocols/IMail";
import { IMailTemplate } from "../../data/mail/protocols/IMailTemplate";

export class NodemailerAdapter implements IMailProvider {
  constructor(
    private readonly client: Transporter,
    private readonly mailTemplate: IMailTemplate
  ) {}

  async sendMail({ to, subject, template}: IParamsSendMail): Promise<void> {
    await this.client.sendMail({
      from: {
        name: 'Udemy',
        address: 'certificado@udemy.com',
      },
      to,
      subject,
      html: await this.mailTemplate.parse(template)
    });
  }
}