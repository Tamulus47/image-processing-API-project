import fs from 'fs';
import path from 'path';

function readimages(dir: string) {
    const files: string[] = [];
    fs.readdirSync(dir).forEach((file) => {
      const name = path.parse(file).name + path.parse(file).ext;
      files.push(name);
    });
    return files;
  }

  let names= readimages('images');

  export default names;