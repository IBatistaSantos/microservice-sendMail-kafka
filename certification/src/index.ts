import "dotenv/config"
import { resolve } from "path";
import { Kafka } from "kafkajs";
import { IMessage } from "./dtos/IMessage";
import { makeSendMail } from "./main/factories/dbSendMail";

const kafka = new Kafka({
  clientId: "certificate",
  brokers: ["localhost:9092"],
  retry: {
    initialRetryTime: 300,
    retries: 10
  },
});

const topic = 'issue-certificate';
const consumer = kafka.consumer({ groupId: "certificate-group" });

async function run () {
  await consumer.connect();
  
  await consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      const templatePath = resolve(
        __dirname,
        "infra",
        "views",
        "emails",
        "forgotPassword.hbs"
      );
      
      const {user, course, dateConclused,  workload} = JSON.parse(String(message.value)) as IMessage;
      const mailProvider = makeSendMail();
        mailProvider.sendMail({
        to: user.email,
        subject: "Certificado de conclusão de curso",
       template: {
        file: templatePath ,
        variables: {
          name: user.name,
          course,
          link: "gjkdlgjkdklgjdg"
        }
       }
        
      }).catch(console.error) 
    }
  })
}
 
run().catch(console.error);