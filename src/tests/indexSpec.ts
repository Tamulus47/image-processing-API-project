import supertest from 'supertest';
import app from '../index';
import imageProccess from '../images_data/processing';
import fs from 'fs';
import path from 'path';

const req = supertest(app);

it('test first endpoint', async () => {
  const res = await req.get('/');
  expect(res.status).toBe(200);
});

it('test image endpoint', async () => {
  const res = await req.get(
    '/api/images?filename=encenadaport&height=200&width=200'
  );
  expect(res.status).toBe(200);
});
describe('test image processing', () => {
  it('test function exists', async () => {
    expect(imageProccess).toBeDefined;
  });

  it('test function calle', async () => {
    expect(imageProccess).toHaveBeenCalledBefore;
  });

  it('test image exists', async () => {
    await req.get('/api/images?filename=encenadaport&height=200&width=200');
    const exists = fs.existsSync(
      path.resolve('./') + '/resized_images/encenadaport.jpg'
    );
    expect(exists).toBeTruthy();
  });
});
