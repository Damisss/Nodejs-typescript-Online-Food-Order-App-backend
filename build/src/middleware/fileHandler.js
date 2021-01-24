"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = void 0;
var multer_1 = __importDefault(require("multer"));
var imageHandler = function () {
    try {
        var imageStorage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'images');
            },
            filename: function (req, file, cb) {
                cb(null, new Date().toISOString() + file.originalname);
            }
        });
        var images_1 = multer_1.default({ storage: imageStorage }).array('images', 10);
        return images_1;
    }
    catch (ex) {
        console.log('Exception: ', ex);
    }
};
exports.images = imageHandler();
