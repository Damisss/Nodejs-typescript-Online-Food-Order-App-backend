"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.del = exports.patch = exports.post = exports.get = void 0;
require("reflect-metadata");
// enum data type that contains different http request methods.
var methods_1 = require("./methods");
var bindContoller = function (method) {
    return function (path) {
        // our decorator function
        return function (target, key, desc) {
            //add url path to a special object.
            Reflect.defineMetadata('path', path, target, key);
            //add http request method to a special object. 
            Reflect.defineMetadata('method', method, target, key);
        };
    };
};
// http request methods that can be used now as decorators.
exports.get = bindContoller(methods_1.Methods.get);
exports.post = bindContoller(methods_1.Methods.post);
exports.patch = bindContoller(methods_1.Methods.patch);
exports.del = bindContoller(methods_1.Methods.del);
exports.put = bindContoller(methods_1.Methods.put);
