import express, { Request, Response } from 'express';
import {google} from "googleapis"

const app = express();
const used = process.memoryUsage();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});

console.log(`Memory usage:`);
console.log(`- Heap total: ${Math.round(used.heapTotal / 1024 / 1024)} MB`);
console.log(`- Heap used: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);
console.log(`- Resident set size (RSS): ${Math.round(used.rss / 1024 / 1024)} MB`);
console.log(`- External: ${Math.round(used.external / 1024 / 1024)} MB`);

export default app