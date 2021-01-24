"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorController = void 0;
var utils_1 = require("../utils");
var models_1 = require("../models");
var decorators_1 = require("./decorators");
var middleware_1 = require("../middleware");
var VendorController = /** @class */ (function () {
    function VendorController() {
    }
    VendorController.prototype.vendorLoggin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, vendor, err, isMatch, err, payload, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, models_1.Vendor.findOne({ email: email })];
                    case 1:
                        vendor = _b.sent();
                        if (!vendor) {
                            err = new Error('wrong email or password');
                            err.statusCode = 401;
                            throw err;
                        }
                        return [4 /*yield*/, utils_1.comparePassword(password, vendor.password, vendor.salt)];
                    case 2:
                        isMatch = _b.sent();
                        if (!isMatch) {
                            err = new Error('wrong email or password');
                            err.statusCode = 401;
                            throw err;
                        }
                        payload = {
                            _id: vendor._id,
                            email: vendor.email,
                            foodTypes: vendor.foodTypes,
                        };
                        token = utils_1.genJWToken(payload);
                        res.status(200).json(token);
                        return [2 /*return*/, token];
                    case 3:
                        error_1 = _b.sent();
                        if (!error_1.statusCode) {
                            error_1.statusCode = 500;
                            //return error
                        }
                        next(error_1);
                        return [2 /*return*/, error_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VendorController.prototype.getVendorProfile = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var vendorInfo, err, existingVendor, err, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        vendorInfo = req.user;
                        if (!vendorInfo) {
                            err = new Error('UnAuthorized');
                            err.statusCode = 401;
                            throw err;
                        }
                        return [4 /*yield*/, models_1.Vendor.findById(vendorInfo._id)];
                    case 1:
                        existingVendor = _a.sent();
                        if (!existingVendor) {
                            err = new Error('vendor not found');
                            err.statusCode = 404;
                            throw err;
                        }
                        return [2 /*return*/, res.status(200).json(existingVendor)];
                    case 2:
                        error_2 = _a.sent();
                        if (!error_2.statusCode) {
                            error_2.statusCode = 500;
                            //return error
                        }
                        next(error_2);
                        return [2 /*return*/, error_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VendorController.prototype.updateVendorProdile = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var vendor, _a, name_1, foodTypes, email, address, phone, err, existingVendor, err, updatedVendor, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        vendor = req.user;
                        _a = req.body, name_1 = _a.name, foodTypes = _a.foodTypes, email = _a.email, address = _a.address, phone = _a.phone;
                        if (!vendor) {
                            err = new Error('UnAuthorized');
                            err.statusCode = 401;
                            throw err;
                        }
                        return [4 /*yield*/, models_1.Vendor.findById(vendor._id)];
                    case 1:
                        existingVendor = _b.sent();
                        if (!existingVendor) {
                            err = new Error('Vendor not found');
                            err.statusCode = 404;
                            throw err;
                        }
                        existingVendor.name = name_1 && name_1 || existingVendor.name;
                        existingVendor.foodTypes = foodTypes && foodTypes || existingVendor.foodTypes;
                        existingVendor.email = email && email || existingVendor.email;
                        existingVendor.address = address && address || existingVendor.address;
                        existingVendor.phone = phone && phone || existingVendor.phone;
                        return [4 /*yield*/, existingVendor.save()];
                    case 2:
                        updatedVendor = _b.sent();
                        return [2 /*return*/, res.status(200).json(updatedVendor)];
                    case 3:
                        error_3 = _b.sent();
                        if (!error_3.statusCode) {
                            error_3.statusCode = 500;
                        }
                        next(error_3);
                        return [2 /*return*/, error_3];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VendorController.prototype.updateService = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var vendor, err, existingVendor, err, updatedVendor, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        vendor = req.user;
                        if (!vendor) {
                            err = new Error('UnAuthorized');
                            err.statusCode = 401;
                            throw err;
                        }
                        return [4 /*yield*/, models_1.Vendor.findById(vendor._id)];
                    case 1:
                        existingVendor = _a.sent();
                        if (!existingVendor) {
                            err = new Error('Vendor not found');
                            err.statusCode = 404;
                            throw err;
                        }
                        existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
                        return [4 /*yield*/, existingVendor.save()];
                    case 2:
                        updatedVendor = _a.sent();
                        return [2 /*return*/, res.status(200).json(updatedVendor)];
                    case 3:
                        error_4 = _a.sent();
                        if (!error_4.statusCode) {
                            error_4.statusCode = 500;
                        }
                        next(error_4);
                        return [2 /*return*/, error_4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VendorController.prototype.addFood = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var vendor, _a, name_2, foodType, price, description, readyTime, category, err, files, images_1, existingVendor, err, food, updatedvendor, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        vendor = req.user;
                        _a = req.body, name_2 = _a.name, foodType = _a.foodType, price = _a.price, description = _a.description, readyTime = _a.readyTime, category = _a.category;
                        if (!vendor) {
                            err = new Error('UnAuthorized');
                            err.statusCode = 401;
                            throw err;
                        }
                        files = req.files;
                        images_1 = files.map(function (file) { return file.filename; });
                        return [4 /*yield*/, models_1.Vendor.findById(vendor._id)];
                    case 1:
                        existingVendor = _b.sent();
                        if (!existingVendor) {
                            err = new Error('Vendor not found');
                            err.statusCode = 404;
                            throw err;
                        }
                        return [4 /*yield*/, models_1.Food.create({
                                vendorId: vendor._id,
                                name: name_2,
                                description: description,
                                category: category,
                                foodType: foodType,
                                readyTime: readyTime,
                                price: price,
                                rating: 0,
                                images: __spreadArrays(images_1),
                            })];
                    case 2:
                        food = _b.sent();
                        existingVendor.foods.push(food);
                        return [4 /*yield*/, existingVendor.save()];
                    case 3:
                        updatedvendor = _b.sent();
                        return [2 /*return*/, res.status(201).json(updatedvendor)];
                    case 4:
                        error_5 = _b.sent();
                        if (!error_5.statusCode) {
                            error_5.statusCode = 500;
                        }
                        next(error_5);
                        return [2 /*return*/, error_5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    VendorController.prototype.getFoods = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var vendor, err, existingVendor, err, foods, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        vendor = req.user;
                        if (!vendor) {
                            err = new Error('UnAuthorized');
                            err.statusCode = 401;
                            throw err;
                        }
                        return [4 /*yield*/, models_1.Vendor.findById({ _id: vendor._id })];
                    case 1:
                        existingVendor = _a.sent();
                        if (!existingVendor) {
                            err = new Error('Vendor not found');
                            err.statusCode = 404;
                            throw err;
                        }
                        return [4 /*yield*/, models_1.Food.find({ vendorId: vendor._id })];
                    case 2:
                        foods = _a.sent();
                        return [2 /*return*/, res.status(200).json(foods)];
                    case 3:
                        error_6 = _a.sent();
                        if (!error_6.statusCode) {
                            error_6.statusCode = 500;
                        }
                        next(error_6);
                        return [2 /*return*/, error_6];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VendorController.prototype.addCoverImages = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var vendor, err, files, images_2, existingVendor, err, updatedvendor, error_7;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        vendor = req.user;
                        if (!vendor) {
                            err = new Error('UnAuthorized');
                            err.statusCode = 401;
                            throw err;
                        }
                        files = req.files;
                        images_2 = files.map(function (file) { return file.filename; });
                        return [4 /*yield*/, models_1.Vendor.findById(vendor._id)];
                    case 1:
                        existingVendor = _b.sent();
                        if (!existingVendor) {
                            err = new Error('Vendor not found');
                            err.statusCode = 404;
                            throw err;
                        }
                        (_a = existingVendor.coverImages).push.apply(_a, images_2);
                        return [4 /*yield*/, existingVendor.save()];
                    case 2:
                        updatedvendor = _b.sent();
                        return [2 /*return*/, res.status(200).json(updatedvendor)];
                    case 3:
                        error_7 = _b.sent();
                        if (!error_7.statusCode) {
                            error_7.statusCode = 500;
                        }
                        next(error_7);
                        return [2 /*return*/, error_7];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.post('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], VendorController.prototype, "vendorLoggin", null);
    __decorate([
        decorators_1.get('/profile'),
        decorators_1.useMiddleware(middleware_1.authenticate),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], VendorController.prototype, "getVendorProfile", null);
    __decorate([
        decorators_1.patch('/profile/update'),
        decorators_1.useMiddleware(middleware_1.authenticate),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], VendorController.prototype, "updateVendorProdile", null);
    __decorate([
        decorators_1.patch('/update-service'),
        decorators_1.useMiddleware(middleware_1.authenticate),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], VendorController.prototype, "updateService", null);
    __decorate([
        decorators_1.post('/add-food'),
        decorators_1.useMiddleware(middleware_1.authenticate),
        decorators_1.useMiddleware(middleware_1.images),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], VendorController.prototype, "addFood", null);
    __decorate([
        decorators_1.get('/foods'),
        decorators_1.useMiddleware(middleware_1.authenticate),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], VendorController.prototype, "getFoods", null);
    __decorate([
        decorators_1.patch('/add-cover-images'),
        decorators_1.useMiddleware(middleware_1.authenticate),
        decorators_1.useMiddleware(middleware_1.images),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], VendorController.prototype, "addCoverImages", null);
    VendorController = __decorate([
        decorators_1.controller('/vendor')
    ], VendorController);
    return VendorController;
}());
exports.VendorController = VendorController;
