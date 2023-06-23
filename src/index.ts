import express from 'express';
import './lib/dayjs';
import { successResponse } from './helpers';
import { errorMiddleware } from './middleware';
import { UserRouter } from './routes';
import { AuthRouter } from "./routes";
import { TorunamentsRouter } from "./routes";
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json(successResponse('Welcome to the API'));
});

app.use('/user', UserRouter);
app.use('/auth', AuthRouter);
app.use('/tournaments', TorunamentsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(errorMiddleware);
