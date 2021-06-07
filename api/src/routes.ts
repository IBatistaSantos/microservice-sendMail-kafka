import { Router } from "express";

const router = Router();

router.get("/certifications", async (request, response) => {
  const message = {
    user: { id: 1, name: 'Israel dos Santos Pereira Batista' },
    course: 'Kafka com Node.js',
    dateConclused: new Date(),
    workload: 120
  };

  await request.producer.send({
    topic: 'issue-certificate',
    messages: [
      { value: JSON.stringify(message)}
    ]
  });

  return response.json({message: "Enviaremos para o seu email cadastro o certificado em anexo!"})

})

export {router}