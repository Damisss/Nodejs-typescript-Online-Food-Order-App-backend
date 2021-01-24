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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = __importDefault(require("sinon"));
var mongoose_1 = __importDefault(require("mongoose"));
var vendorController_1 = require("../src/controllers/vendorController");
var adminController_1 = require("../src/controllers/adminController");
var models_1 = require("../src/models");
var config_1 = require("../src/config");
var defaultVendors_1 = require("../src/utils/models/defaultVendors");
describe('vendor', function () {
    var vendorController;
    var adminController;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            vendorController = new vendorController_1.VendorController();
            adminController = new adminController_1.Controllers();
            return [2 /*return*/];
        });
    }); });
    var id = '5c0f66b979af55031b34728a';
    it('it should throw an error with 500 if accessing database fails', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, next, req, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sinon_1.default.stub(models_1.Vendor, 'findOne');
                    models_1.Vendor.findOne.throws();
                    res = {
                        status: function (code) {
                            return this;
                        },
                        json: function (existingVendor) { }
                    };
                    next = function () { };
                    req = {
                        body: {
                            email: 'sam@sam.com',
                            password: 'abc12345'
                        }
                    };
                    return [4 /*yield*/, vendorController.vendorLoggin(req, res, next)];
                case 1:
                    err = _a.sent();
                    chai_1.expect(err).to.be.an('error');
                    chai_1.expect(err.statusCode).to.equal(500);
                    models_1.Vendor.findOne.restore();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('vendor endpoints', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var vendor, req, res, next;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.default.connect(config_1.MONGODB_TEST_URL, {
                            useUnifiedTopology: true,
                            useCreateIndex: true,
                            useNewUrlParser: true
                        })];
                    case 1:
                        _a.sent();
                        vendor = new defaultVendors_1.VendorBuilder()
                            .withId(id)
                            .build();
                        req = {
                            body: vendor
                        };
                        res = {
                            status: function (code) {
                                return this;
                            },
                            json: function (existingVendor) { }
                        };
                        next = function () { };
                        return [4 /*yield*/, adminController.createVendor(req, res, next)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
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
        context('vendor login', function () {
            it('it should throw an error if vendor\'s email not found', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {
                                body: {
                                    email: 'sam@sam.com',
                                    password: 'abc12345'
                                }
                            };
                            res = {
                                statusCode: 500,
                                token: '',
                                status: function (code) {
                                    this.statusCode = code;
                                    return this;
                                },
                                json: function (token) {
                                    this.token = token;
                                }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.vendorLoggin(req, res, next)];
                        case 1:
                            _a.sent();
                            chai_1.expect(res.token).to.be.an('string');
                            chai_1.expect(res.statusCode).to.equal(200);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        context('vendor profile', function () {
            it('fetch vendor profile when he/she is login', function () { return __awaiter(void 0, void 0, void 0, function () {
                var vendors, vendorId, req, res, next;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, models_1.Vendor.find()];
                        case 1:
                            vendors = _a.sent();
                            vendorId = vendors[0]._doc._id.toString();
                            req = {
                                user: {
                                    _id: vendorId,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                }
                            };
                            res = {
                                existingVendor: null,
                                statusCode: 500,
                                status: function (code) {
                                    this.statusCode = code;
                                    return this;
                                },
                                json: function (existingVendor) {
                                    this.existingVendor = existingVendor;
                                }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.getVendorProfile(req, res, next)];
                        case 2:
                            _a.sent();
                            chai_1.expect(res.statusCode).to.equal(200);
                            chai_1.expect(res.existingVendor).to.have.property('email', 'sam@sam.com');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should throw an error if user is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {
                                user: {
                                    _id: id,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                }
                            };
                            res = {
                                status: function (code) {
                                    return this;
                                },
                                json: function (existingVendor) { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.getVendorProfile(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(404);
                            chai_1.expect(error).to.have.property('message', 'vendor not found');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should return an unauthorized message if user is not logged in ', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {};
                            res = {
                                status: function (code) {
                                    return this;
                                },
                                json: function (existingVendor) { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.getVendorProfile(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(401);
                            chai_1.expect(error).to.have.property('message', 'UnAuthorized');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        context('update vendor', function () {
            it('it should update vendor profile', function () { return __awaiter(void 0, void 0, void 0, function () {
                var vendors, vendorId, req, res, next;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, models_1.Vendor.find()];
                        case 1:
                            vendors = _a.sent();
                            vendorId = vendors[0]._doc._id.toString();
                            req = {
                                user: {
                                    _id: vendorId,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                },
                                body: {
                                    email: 'damis@damis.com',
                                    name: 'updated restaurant name'
                                }
                            };
                            res = {
                                existingVendor: null,
                                statusCode: 500,
                                status: function (code) {
                                    this.statusCode = code;
                                    return this;
                                },
                                json: function (existingVendor) {
                                    this.existingVendor = existingVendor;
                                }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.updateVendorProdile(req, res, next)];
                        case 2:
                            _a.sent();
                            chai_1.expect(res.statusCode).to.equal(200);
                            chai_1.expect(res.existingVendor).to.have.property('name', 'updated restaurant name');
                            chai_1.expect(res.existingVendor).to.have.property('email', 'damis@damis.com');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should return an error if vendor doesn\'t exist', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {
                                user: {
                                    _id: id,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                },
                                body: {
                                    email: 'damis@damis.com',
                                    name: 'updated restaurant name'
                                }
                            };
                            res = {
                                status: function (code) {
                                    return this;
                                },
                                json: function (existingVendor) { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.updateVendorProdile(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(404);
                            chai_1.expect(error.message).to.equal('Vendor not found');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should return if vendor is not logged in', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {
                                body: {
                                    email: 'damis@damis.com',
                                    name: 'updated restaurant name'
                                }
                            };
                            res = {
                                status: function () {
                                    return this;
                                },
                                json: function () { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.updateVendorProdile(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(401);
                            chai_1.expect(error.message).to.equal('UnAuthorized');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        context('update service', function () {
            it('it should return if vendor is not logged in', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {};
                            res = {
                                status: function (code) {
                                    return this;
                                },
                                json: function (existingVendor) { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.updateService(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(401);
                            chai_1.expect(error.message).to.equal('UnAuthorized');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should return an error if vendor is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {
                                user: {
                                    _id: id,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                },
                            };
                            res = {
                                status: function (code) {
                                    return this;
                                },
                                json: function (existingVendor) { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.updateService(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(404);
                            chai_1.expect(error.message).to.equal('Vendor not found');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should update service', function () { return __awaiter(void 0, void 0, void 0, function () {
                var vendors, vendorId, req, res, next;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, models_1.Vendor.find()];
                        case 1:
                            vendors = _a.sent();
                            vendorId = vendors[0]._doc._id.toString();
                            req = {
                                user: {
                                    _id: vendorId,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                },
                            };
                            res = {
                                existingVendor: null,
                                statusCode: 500,
                                status: function (code) {
                                    this.statusCode = code;
                                    return this;
                                },
                                json: function (existingVendor) {
                                    this.existingVendor = existingVendor;
                                }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.updateService(req, res, next)];
                        case 2:
                            _a.sent();
                            chai_1.expect(res.statusCode).to.equal(200);
                            chai_1.expect(res.existingVendor).to.have.property('serviceAvailable', true);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        context('food', function () {
            it('it should return if vendor is not logged in', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {
                                body: {
                                    name: 'pizza',
                                    foodType: 'vegan',
                                    price: 5,
                                    description: 'San Marzano tomato sauce, fresh mozzarella, grated parmesan and pepperoni from Il Mondo Vecchio',
                                    readyTime: 1,
                                    category: 'vegan'
                                },
                                files: [{ filename: 'image1_path' }, { filename: 'image2_path' }]
                            };
                            res = {
                                status: function (code) {
                                    return this;
                                },
                                json: function (existingVendor) { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.addFood(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(401);
                            chai_1.expect(error.message).to.equal('UnAuthorized');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should return an error if vendor is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {
                                user: {
                                    _id: id,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                },
                                body: {
                                    name: 'pizza',
                                    foodType: 'vegan',
                                    price: 5,
                                    description: 'San Marzano tomato sauce, fresh mozzarella, grated parmesan and pepperoni from Il Mondo Vecchio',
                                    readyTime: 1,
                                    category: 'vegan'
                                },
                                files: [{ filename: 'image1_path' }, { filename: 'image2_path' }]
                            };
                            res = {
                                status: function (code) {
                                    return this;
                                },
                                json: function (existingVendor) { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.addFood(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(404);
                            chai_1.expect(error.message).to.equal('Vendor not found');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should add food ', function () { return __awaiter(void 0, void 0, void 0, function () {
                var vendors, vendorId, req, res, next;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, models_1.Vendor.find()];
                        case 1:
                            vendors = _a.sent();
                            vendorId = vendors[0]._doc._id.toString();
                            req = {
                                user: {
                                    _id: vendorId,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                },
                                body: {
                                    name: 'pizza',
                                    foodType: 'vegan',
                                    price: 5,
                                    description: 'San Marzano tomato sauce, fresh mozzarella, grated parmesan and pepperoni from Il Mondo Vecchio',
                                    readyTime: 1,
                                    category: 'vegan'
                                },
                                files: [{ filename: 'image1_path' }, { filename: 'image2_path' }]
                            };
                            res = {
                                existingVendor: null,
                                statusCode: 500,
                                status: function (code) {
                                    this.statusCode = code;
                                    return this;
                                },
                                json: function (existingVendor) {
                                    this.existingVendor = existingVendor;
                                }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.addFood(req, res, next)];
                        case 2:
                            _a.sent();
                            chai_1.expect(res.statusCode).to.equal(201);
                            chai_1.expect(res.existingVendor.foods.length).to.equal(1);
                            chai_1.expect(res.existingVendor.foods[0].images).to.have.all.members(['image1_path', 'image2_path']);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        context('fetch foods', function () {
            it('it should fetch vendors and their corresponding foods', function () { return __awaiter(void 0, void 0, void 0, function () {
                var vendors, vendorId, req, res, next;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, models_1.Vendor.find()];
                        case 1:
                            vendors = _a.sent();
                            vendorId = vendors[0]._doc._id.toString();
                            req = {
                                user: {
                                    _id: vendorId,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                },
                                body: {
                                    name: 'pizza',
                                    foodType: 'vegan',
                                    price: 5,
                                    description: 'San Marzano tomato sauce, fresh mozzarella, grated parmesan and pepperoni from Il Mondo Vecchio',
                                    readyTime: 1,
                                    category: 'vegan'
                                },
                                files: [{ filename: 'image1_path' }, { filename: 'image2_path' }]
                            };
                            res = {
                                foods: null,
                                statusCode: 500,
                                status: function (code) {
                                    this.statusCode = code;
                                    return this;
                                },
                                json: function (foods) {
                                    this.foods = __spreadArrays(foods);
                                }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.addFood(req, res, next)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, vendorController.getFoods(req, res, next)];
                        case 3:
                            _a.sent();
                            chai_1.expect(res.statusCode).to.equal(200);
                            chai_1.expect(res.foods.length).to.equal(1);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should throw an error if user is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {
                                user: {
                                    _id: id,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                }
                            };
                            res = {
                                status: function (code) {
                                    return this;
                                },
                                json: function (existingVendor) { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.getFoods(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(404);
                            chai_1.expect(error).to.have.property('message', 'Vendor not found');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should return an unauthorized message if user is not logged in ', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {};
                            res = {
                                status: function (code) {
                                    return this;
                                },
                                json: function (existingVendor) { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.getFoods(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(401);
                            chai_1.expect(error).to.have.property('message', 'UnAuthorized');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        context('covert images', function () {
            it('it should add covert images to vendor', function () { return __awaiter(void 0, void 0, void 0, function () {
                var vendors, vendorId, req, res, next;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, models_1.Vendor.find()];
                        case 1:
                            vendors = _a.sent();
                            vendorId = vendors[0]._doc._id.toString();
                            req = {
                                user: {
                                    _id: vendorId,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                },
                                files: [{ filename: 'image1_path' }, { filename: 'image2_path' }]
                            };
                            res = {
                                existingVendor: null,
                                statusCode: 500,
                                status: function (code) {
                                    this.statusCode = code;
                                    return this;
                                },
                                json: function (existingVendor) {
                                    this.existingVendor = existingVendor;
                                }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.addCoverImages(req, res, next)];
                        case 2:
                            _a.sent();
                            chai_1.expect(res.statusCode).to.equal(200);
                            chai_1.expect(res.existingVendor.coverImages).to.have.all.members(['ada', 'image1_path', 'image2_path']);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should throw an error if user is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {
                                user: {
                                    _id: id,
                                    email: 'sam@sam.com',
                                    foodTypes: ['vegan'],
                                },
                                files: [{ filename: 'image1_path' }, { filename: 'image2_path' }]
                            };
                            res = {
                                status: function (code) {
                                    return this;
                                },
                                json: function (existingVendor) { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.addCoverImages(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(404);
                            chai_1.expect(error).to.have.property('message', 'Vendor not found');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('it should return an unauthorized message if user is not logged in ', function () { return __awaiter(void 0, void 0, void 0, function () {
                var req, res, next, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = {};
                            res = {
                                status: function (code) {
                                    return this;
                                },
                                json: function (existingVendor) { }
                            };
                            next = function () { };
                            return [4 /*yield*/, vendorController.addCoverImages(req, res, next)];
                        case 1:
                            error = _a.sent();
                            chai_1.expect(error.statusCode).to.equal(401);
                            chai_1.expect(error).to.have.property('message', 'UnAuthorized');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
