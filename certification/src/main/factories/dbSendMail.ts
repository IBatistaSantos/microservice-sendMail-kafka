import nodemailer from 'nodemailer';
import { NodemailerAdapter } from '../../infra/mail/NodemailerAdapter';
import { HandlebarsMailTemplate } from '../../infra/template/HandlebarsMailTemplate';
import mailConfig from "../config/mail";

export const makeSendMail = () => {
  const client =  nodemailer.createTransport(mailConfig);
  const mailTemplate = new HandlebarsMailTemplate();
  return  new NodemailerAdapter(client, mailTemplate);
}