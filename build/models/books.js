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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksStore = void 0;
const DB_1 = __importDefault(require("../DB"));
class BooksStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = 'SELECT * FROM book';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = `SELECT * FROM book WHERE id=($1)`;
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Failed to get the session with the following error: ${error}`);
            }
        });
    }
    create(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = 'INSERT INTO book (title, author, total_pages, type, summary) VALUES($1, $2, $3, $4, $5) RETURNING *';
                const result = yield conn.query(sql, [b.title, b.author, b.total_pages, b.type, b.summary]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Failed to add the session with the following error: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = 'DELETE FROM book WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Failed to delete session with the following error: ${error}`);
            }
        });
    }
    update(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = 'UPDATE book SET title=($1), author=($2) WHERE id=($3) RETURNING *';
                const result = yield conn.query(sql, [b.title, b.author, b.id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Failed to update session with the following error: ${error}`);
            }
        });
    }
}
exports.BooksStore = BooksStore;
