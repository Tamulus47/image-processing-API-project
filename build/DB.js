"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { DB_host, DB_name, DB_test_name, DB_user, DB_ps, ENV } = process.env;
let con;
if (ENV === "test") {
    con = new pg_1.Pool({
        host: DB_host,
        database: DB_test_name,
        user: DB_user,
        password: DB_ps
    });
}
if (ENV === "dev") {
    con = new pg_1.Pool({
        host: DB_host,
        database: DB_name,
        user: DB_user,
        password: DB_ps
    });
}
exports.default = con;
