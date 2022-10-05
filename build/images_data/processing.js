"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkfun = void 0;
const sharp_1 = __importDefault(require("sharp"));
function imageProccess(imgwidth, imgheight, imgpath, resizpath) {
    return new Promise((resolve) => {
        resolve((0, sharp_1.default)(imgpath)
            .resize(parseInt(imgwidth), parseInt(imgheight))
            .toFile(resizpath));
    });
}
function checkfun(img) {
    return /^[0-9]+$/.test(img);
}
exports.checkfun = checkfun;
exports.default = imageProccess;
