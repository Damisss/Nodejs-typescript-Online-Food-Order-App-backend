"use strict";
" \nThis class allow us to have a single router accross our app.\n";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
var express_1 = require("express");
var AppRouter = /** @class */ (function () {
    function AppRouter() {
    }
    Object.defineProperty(AppRouter.prototype, "getRouteInstance", {
        get: function () {
            if (!AppRouter.routeInstance) {
                AppRouter.routeInstance = express_1.Router();
            }
            return AppRouter.routeInstance;
        },
        enumerable: false,
        configurable: true
    });
    return AppRouter;
}());
function appRouter() {
    var router = new AppRouter();
    return router.getRouteInstance;
}
exports.appRouter = appRouter;
