import express from 'express';
import api_route from "./routes/api"

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.status(200).send('welcome please type /api/images?filename="image name"');
});

app.use("/api/images", api_route)