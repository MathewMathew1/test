import express, { Request, Response } from 'express';
import google from "googleapis"

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});

export default app