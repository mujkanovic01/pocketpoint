import express from 'express';
import './lib/dayjs';
import { successResponse } from './helpers';
import { errorMiddleware } from './middleware';
import { UserRouter } from './routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json(successResponse('Welcome to the API'));
});

app.use(errorMiddleware);

app.use('/user', UserRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
