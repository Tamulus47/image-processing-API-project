import express, { Request, Response } from 'express';
import { Book, BooksStore } from '../models/books';

const book = new BooksStore;

const index = async (_req: Request, res: Response) => {
    const result = await book.index()
    res.json(result)
  }

  const show = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await book.show(id);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const create = async (req: Request, res: Response) => {
    try {
      const { title, author, total_pages, type, summary } = req.body;
      const b: Book = { author, title, total_pages, type, summary };
      const result = await book.create(b);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  const destroy = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const result = await book.delete(id);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  const update = async (req: Request, res: Response) => {
    try {
      const { title, author, id } = req.body;
      const b: Book = { title, author, id };
      const updatedSession = await book.update(b);
      res.send(updatedSession);
    } catch (error) {
      res.status(500).json(error);
    }
  };

export const book_route= (app: express.Application)=>{
    app.get('/books', index)
    app.get('/book/:id', show)
    app.put('/book', update)
    app.post('/book', create)
    app.delete('/book', destroy)
}