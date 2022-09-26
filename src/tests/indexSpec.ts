import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import path from 'path';
import imageProccess from '../images_data/processing';

const req = supertest(app);

describe('test image processing', () => {
  it('test first endpoint', async () => {
    const res = await req.get('/');
    expect(res.status).toBe(200);
  });

  it('test endpoints', async () => {
    const res = await req.get(
      '/api/images?filename=encenadaport&height=200&width=200'
    );
    expect(res.status).toBe(200);
  });
});

describe('test image processing', () => {
  it('test image exists', async () => {
    const imgpath = path.resolve('./') + '/images/encenadaport.jpg';
    const imgwidth = '200';
    const imgheight = '200';
    const resizpath =
      path.resolve('./') +
      `/resized_images/encenadaport${'-' + imgwidth + '-' + imgheight}.jpg`;

    if (fs.existsSync(resizpath)) {
      fs.unlinkSync(resizpath);
    }

    async function run() {
      await imageProccess(imgwidth, imgheight, imgpath, resizpath).then(() => {
        expect(fs.existsSync(resizpath)).toEqual(true);
      });
    }
    run();
  });
});
