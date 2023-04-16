import cors from 'cors';
import express from 'express';
import { createTableIfNotExists } from './database/db';
import { router as taskRouter } from './routes/tasks.routes';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', taskRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  createTableIfNotExists();
});
