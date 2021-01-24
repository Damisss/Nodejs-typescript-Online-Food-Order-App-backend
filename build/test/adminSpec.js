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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mongoose_1 = __importDefault(require("mongoose"));
var sinon_1 = __importDefault(require("sinon"));
var adminController_1 = require("../src/controllers/adminController");
var defaultVendors_1 = require("../src/utils/models/defaultVendors");
var models_1 = require("../src/models");
var config_1 = require("../src/config");
describe('admin controller', function () {
    var controller;
    before(function () {
        controller = new adminController_1.Controllers();
    });
    it('it should throw an error with 500 if accessing database fails', function () {
        sinon_1.default.stub(models_1.Vendor, 'findOne');
        models_1.Vendor.findOne.throws();
        var vendor = new defaultVendors_1.VendorBuilder().build();
        var res = {};
        var next = function () { };
        var req = {
            body: vendor
        };
        controller.createVendor(req, res, next).then(function (result) {
            chai_1.expect(result).not.to.throw();
            chai_1.expect(result.statusCode).to.equal(401);
        });
        models_1.Vendor.findOne.restore();
    });
    context('registration-fetching', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, mongoose_1.default.connect(config_1.MONGODB_TEST_URL, {
                                useNewUrlParser: true,
                                useCreateIndex: true,
                                useUnifiedTopology: true
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        console.log('Exception: ' + ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Vendor.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        var id = '5c0f66b979af55031b34728a';
        it('it should fetch a vendor when id is provided ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var vendor, res, next, req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vendor = new defaultVendors_1.VendorBuilder()
                            .withId(id)
                            .withSalt('salt')
                            .build();
                        res = {
                            statusCode: 500,
                            vendor: null,
                            status: function (code) {
                                this.statusCode = code;
                                return this;
                            },
                            json: function (data) {
                                this.vendor = data;
                            }
                        };
                        next = function () { };
                        req = {
                            params: { vendorId: id }
                        };
                        return [4 /*yield*/, models_1.Vendor.create(vendor)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, controller.getVendorById(req, res, next)];
                    case 2:
                        _a.sent();
                        chai_1.expect(res.vendor._doc._id.toString()).to.equal(id);
                        chai_1.expect(res.statusCode).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('it should fetch all existing vendors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var id2, vendor1, vendor2, res, next, req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id2 = '5c0f66b979af55031b34728b';
                        vendor1 = new defaultVendors_1.VendorBuilder()
                            .withId(id)
                            .withSalt('salt')
                            .build();
                        vendor2 = new defaultVendors_1.VendorBuilder()
                            .withId(id2)
                            .withSalt('salt')
                            .build();
                        res = {
                            statusCode: 500,
                            vendors: null,
                            status: function (code) {
                                this.statusCode = code;
                                return this;
                            },
                            json: function (data) {
                                this.vendors = data;
                                return this;
                            }
                        };
                        next = function () { };
                        req = {};
                        return [4 /*yield*/, models_1.Vendor.create(vendor1)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, models_1.Vendor.create(vendor2)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, controller.getVendors(req, res, next)];
                    case 3:
                        _a.sent();
                        chai_1.expect(res.statusCode).to.equal(200);
                        chai_1.expect(res.vendors.length).to.equal(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('it should set status code to 500 if wrong id is provided.', function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrongId, vendor, res, next, req, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wrongId = '5c0f66b979af55031b34728r' // we have changed a to r
                        ;
                        vendor = new defaultVendors_1.VendorBuilder().withId(id).withSalt('salt').build();
                        res = {
                            status: function (code) {
                                return this;
                            },
                            json: function () { }
                        };
                        next = function () { };
                        req = {
                            params: { vendorId: wrongId }
                        };
                        return [4 /*yield*/, models_1.Vendor.create(vendor)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, controller.getVendorById(req, res, next)];
                    case 2:
                        error = _a.sent();
                        chai_1.expect(error.statusCode).to.equal(500);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
