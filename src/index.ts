import express from 'express';
import fs from 'fs';
import path from 'path';
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.status(200).send('server is up');
});

function readimages(dir: string) {
  const files: string[] = [];
  fs.readdirSync(dir).forEach((filename) => {
    const name = path.parse(filename).name + path.parse(filename).ext;
    files.push(name);
  });
  return files;
}
readimages('images');
console.log(readimages('images'));
