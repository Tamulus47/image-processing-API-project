import express from 'express';
import api_route from './routes/api';
import { Request, Response } from 'express';

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

app.use('/api/images', api_route);
export default app;
