import express from 'express';
import api_route from './routes/api';
import { Request, Response } from 'express';
import cors from 'cors'
import {book_route} from './handlers/books'

const app = express();
const port = 8080;

app.listen(port, (): void => {
  console.log(`server is running on port ${port}`);
});

app.get('/', (req: Request, res: Response): void => {
  res
    .status(200)
    .send(
      `welcome please type /api/images?filename="image name"&width="image width"&height="image height"`
    );
});

const corsOption={
}

app.use(cors(corsOption))

book_route(app)

app.use('/api/images', api_route);
export default app;
