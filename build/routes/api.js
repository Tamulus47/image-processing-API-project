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
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const data_1 = __importDefault(require("../images_data/data"));
const processing_1 = __importDefault(require("../images_data/processing"));
const processing_2 = require("../images_data/processing");
const fs_1 = __importDefault(require("fs"));
const api_route = (0, express_1.Router)();
api_route.get('/', (req, res) => {
    const imgname = req.query.filename;
    const imgwidth = req.query.width;
    const imgheight = req.query.height;
    const imgpath = path_1.default.resolve('./') + `/images/${imgname}.jpg`;
    const resizpath = path_1.default.resolve('./') +
        `/resized_images/${imgname + '-' + imgwidth + '-' + imgheight}.jpg`;
    if (imgname == '') {
        return res.status(400).send('please add image name');
    }
    if (imgname === undefined) {
        return res.status(400).send('please add ?filename query');
    }
    if (!data_1.default.includes(`${imgname}.jpg`)) {
        return res.status(404).send('image not found');
    }
    if (imgwidth === undefined) {
        return res.status(400).send('please add ?width query');
    }
    if (imgwidth == '') {
        return res.status(400).send('please add image width');
    }
    if (!(0, processing_2.checkfun)(imgwidth)) {
        return res.status(400).send('please type right width');
    }
    if (parseInt(imgwidth) === 0) {
        return res.status(400).send("can't set width to zero");
    }
    if (imgheight === undefined) {
        return res.status(400).send('please add ?height query');
    }
    if (imgheight == '') {
        return res.status(400).send('please add image height');
    }
    if (!(0, processing_2.checkfun)(imgheight)) {
        return res.status(400).send('please type right height');
    }
    if (parseInt(imgheight) === 0) {
        return res.status(400).send("can't set height to zero");
    }
    else {
        if (fs_1.default.existsSync(resizpath) === false) {
            const run = function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, processing_1.default)(imgwidth, imgheight, imgpath, resizpath).then(() => {
                        res.status(200).sendFile(resizpath);
                    });
                });
            };
            run();
        }
        else {
            res.status(200).sendFile(resizpath);
        }
    }
});
exports.default = api_route;
