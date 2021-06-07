import express from "express";
import { Kafka } from "kafkajs";
import { router } from "./routes";



const app = express();
const kafka = new Kafka({
  clientId: "api",
  brokers: ["localhost:9092"],
  retry:{
    initialRetryTime: 300,
    retries: 10
  }
});

const producer = kafka.producer();

app.use((request, response,next) => {
  request.producer = producer;
  return next();
})
app.use(router)

async function run() {
  await producer.connect();
  app.listen(3333);
}

run().catch(console.error);