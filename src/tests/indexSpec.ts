import supertest from "supertest"
import app from "../index"

const req= supertest(app);

it('test first endpoint', async()=>{
    const res= await req.get('/')
    expect(res.status).toBe(200);
})

describe('test responses from api endpoint',()=>{
it('test true image endpoint', async()=>{
    const res= await req.get('/api/images?filename=encenadaport&height=200&width=200')
    expect(res.status).toBe(200);
})

it('test false image endpoint', async()=>{
    const res= await req.get('/api/images?filename=morena')
    expect(res.status).toBe(404);
})

it('test wrong image endpoint', async()=>{
    const res= await req.get('/api/images?filename=')
    expect(res.status).toBe(400);
})
})