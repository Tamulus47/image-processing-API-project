"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function readimages(dir) {
    const files = [];
    fs_1.default.readdirSync(dir).forEach((file) => {
        const name = path_1.default.parse(file).name + path_1.default.parse(file).ext;
        files.push(name);
    });
    return files;
}
const names = readimages('images');
exports.default = names;
