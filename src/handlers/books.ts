import express, { Request, Response } from 'express';
import { Book, BooksStore } from '../models/books';

const book = new BooksStore;

const index = async (_req: Request, res: Response) => {
    const result = await book.index()
    res.json(result)
  }

  const show =async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await book.show(id);
    res.json(result);
  }

  const create =async (_req: Request, res: Response) => {
    try {
      const newbook = await book.create()
      res.json(newbook)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

export const book_route= (app: express.Application)=>{
    app.get('/books', index)
    app.get('/book/:id', show)
    app.post('/books/newbook', create);
}