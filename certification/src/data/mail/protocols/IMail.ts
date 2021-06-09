import IParseMailTemplateDTO from "./IMailTemplate";

interface IParamsSendMail {
  to: string;
  subject: string;
  template: IParseMailTemplateDTO;
}
interface IMailProvider {
  sendMail({ to, subject, template }: IParamsSendMail): Promise<void>;
}

export { IMailProvider, IParamsSendMail };