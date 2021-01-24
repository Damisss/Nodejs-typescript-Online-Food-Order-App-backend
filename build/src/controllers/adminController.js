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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
var decorators_1 = require("./decorators");
var utils_1 = require("../utils");
var models_1 = require("../models");
var Controllers = /** @class */ (function () {
    function Controllers() {
    }
    Controllers.prototype.createVendor = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, address, email, foodTypes, name_1, ownerName, password, phone, pinCode, serviceAvailable, coverImages, rating, vendorExists, err, generatedSalt, userPassword, vendor, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, address = _a.address, email = _a.email, foodTypes = _a.foodTypes, name_1 = _a.name, ownerName = _a.ownerName, password = _a.password, phone = _a.phone, pinCode = _a.pinCode, serviceAvailable = _a.serviceAvailable, coverImages = _a.coverImages, rating = _a.rating;
                        return [4 /*yield*/, models_1.Vendor.findOne({ email: email })];
                    case 1:
                        vendorExists = _b.sent();
                        if (vendorExists) {
                            err = new Error('This vendor already exist.');
                            err.statusCode = 401;
                            throw err;
                        }
                        return [4 /*yield*/, utils_1.generateSalt(12)];
                    case 2:
                        generatedSalt = _b.sent();
                        return [4 /*yield*/, utils_1.hashPassword(password, generatedSalt)];
                    case 3:
                        userPassword = _b.sent();
                        return [4 /*yield*/, models_1.Vendor.create({
                                address: address,
                                email: email,
                                foodTypes: foodTypes,
                                name: name_1,
                                ownerName: ownerName,
                                password: userPassword,
                                phone: phone,
                                pinCode: pinCode,
                                salt: generatedSalt,
                                serviceAvailable: serviceAvailable,
                                coverImages: coverImages,
                                rating: rating,
                                foods: []
                            })];
                    case 4:
                        vendor = _b.sent();
                        return [2 /*return*/, res.status(201).json(vendor)];
                    case 5:
                        error_1 = _b.sent();
                        if (!error_1.statusCode) {
                            error_1.statusCode = 500;
                        }
                        next(error_1);
                        return [2 /*return*/, error_1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Controllers.prototype.getVendors = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var vendors, err, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.Vendor.find()];
                    case 1:
                        vendors = _a.sent();
                        if (!vendors.length) {
                            err = new Error('No vendor found');
                            err.statusCode = 401;
                            throw err;
                        }
                        return [2 /*return*/, res.status(200).json(vendors)];
                    case 2:
                        error_2 = _a.sent();
                        if (!error_2.statusCode) {
                            error_2.statusCode = 500;
                        }
                        next(error_2);
                        return [2 /*return*/, error_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Controllers.prototype.getVendorById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, vendor, err, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.vendorId;
                        return [4 /*yield*/, models_1.Vendor.findById(id)];
                    case 1:
                        vendor = _a.sent();
                        if (!vendor) {
                            err = new Error('No such vendor');
                            err.statusCode = 401;
                            throw err;
                        }
                        res.status(200).json(vendor);
                        return [2 /*return*/, { statusCode: 200, vendor: vendor }];
                    case 2:
                        error_3 = _a.sent();
                        if (!error_3.statusCode) {
                            error_3.statusCode = 500;
                        }
                        next(error_3);
                        return [2 /*return*/, error_3
                            //return new Error('Something went wrong file fetching vendor')
                        ];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.post('/create-vendor'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], Controllers.prototype, "createVendor", null);
    __decorate([
        decorators_1.get('/vendors'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], Controllers.prototype, "getVendors", null);
    __decorate([
        decorators_1.get('/vendor/:vendorId'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], Controllers.prototype, "getVendorById", null);
    Controllers = __decorate([
        decorators_1.controller('/admin')
    ], Controllers);
    return Controllers;
}());
exports.Controllers = Controllers;
//export {Controllers}
