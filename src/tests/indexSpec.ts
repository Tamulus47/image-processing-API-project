import supertest from 'supertest';
import app from '../index';
import imageProccess from '../images_data/processing';
import fs from 'fs';
import path from 'path';

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
    const resizpath = path.resolve('./') + '/resized_images/encenadaport.jpg';
    const imgwidth = '200';
    const imgheight = '200';

    if (fs.existsSync(resizpath)) {
      fs.unlinkSync(resizpath);
    }

    imageProccess(imgpath, imgwidth, imgheight, resizpath);

    setTimeout(() => {
      expect(fs.existsSync(resizpath)).toEqual(true);
    }, 1000);
  });
});
