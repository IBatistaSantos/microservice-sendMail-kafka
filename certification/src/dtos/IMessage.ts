interface IMessage {
  user: {
    id: string;
    name: string;
    email: string;
  },
  course: string;
  dateConclused: Date;
  workload: number;
}

export {IMessage}