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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const processing_1 = __importDefault(require("../images_data/processing"));
const req = (0, supertest_1.default)(index_1.default);
describe('test image processing', () => {
    it('test first endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/');
        expect(res.status).toBe(200);
    }));
    it('test endpoints', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/images?filename=encenadaport&height=200&width=200');
        expect(res.status).toBe(200);
    }));
});
describe('test image processing', () => {
    it('test image exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const imgpath = path_1.default.resolve('./') + '/images/encenadaport.jpg';
        const imgwidth = '200';
        const imgheight = '200';
        const resizpath = path_1.default.resolve('./') +
            `/resized_images/encenadaport${'-' + imgwidth + '-' + imgheight}.jpg`;
        if (fs_1.default.existsSync(resizpath)) {
            fs_1.default.unlinkSync(resizpath);
        }
        function run() {
            return __awaiter(this, void 0, void 0, function* () {
                yield (0, processing_1.default)(imgwidth, imgheight, imgpath, resizpath).then(() => {
                    expect(fs_1.default.existsSync(resizpath)).toEqual(true);
                });
            });
        }
        run();
    }));
});
