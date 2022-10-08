"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const cors_1 = __importDefault(require("cors"));
const books_1 = require("./handlers/books");
const app = (0, express_1.default)();
const port = 8080;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
app.get('/', (req, res) => {
    res
        .status(200)
        .send(`welcome please type /api/images?filename="image name"&width="image width"&height="image height"`);
});
const corsOption = {};
app.use((0, cors_1.default)(corsOption));
(0, books_1.book_route)(app);
app.use('/api/images', api_1.default);
exports.default = app;
