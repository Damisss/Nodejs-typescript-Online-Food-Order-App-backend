"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var appRouter_1 = require("../../appRouter");
var controller = function (prefix) {
    return function (target, key, desc) {
        var router = appRouter_1.appRouter();
        for (var key_1 in target.prototype) {
            var handler = target.prototype[key_1];
            var path = Reflect.getMetadata('path', target.prototype, key_1);
            var method = Reflect.getMetadata('method', target.prototype, key_1);
            var middlewares = Reflect.getMetadata('middleware', target.prototype, key_1) || [];
            if (path) {
                router[method].apply(router, __spreadArrays(["" + prefix + path], middlewares, [handler]));
            }
        }
    };
};
exports.controller = controller;
