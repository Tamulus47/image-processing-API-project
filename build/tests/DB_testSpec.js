"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../models/book");
const store = new book_1.BooksStore();
describe("Book Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a update method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.index).toBeDefined();
    });
});
