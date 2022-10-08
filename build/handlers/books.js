"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.book_route = void 0;
const books_1 = require("../models/books");
const book = new books_1.BooksStore;
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book.index();
    res.json(result);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield book.show(id);
    res.json(result);
});
const create = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newbook = yield book.create();
        res.json(newbook);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const book_route = (app) => {
    app.get('/books', index);
    app.get('/book/:id', show);
    app.post('/books/newbook', create);
};
exports.book_route = book_route;
