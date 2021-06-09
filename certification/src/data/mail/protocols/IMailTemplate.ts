interface ITemplateVariables {
  [key: string]: string | number | Date;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}

interface IMailTemplate {
  parse({file, variables}: IParseMailTemplateDTO):Promise<string>
}

export {IMailTemplate, IParseMailTemplateDTO}
