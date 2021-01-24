"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = __importDefault(require("sinon"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var passwordUtility_1 = require("../src/utils/passwordUtility");
describe('auth middleware', function () {
    it('it should throw an error if token is not provided', function () {
        var req = {
            get: function (auth) {
                return;
            }
        };
        chai_1.expect(function () { return passwordUtility_1.decodeToken(req); }).to.throw('Unauthorized');
    });
    it('it should user to request object if correct token is provided', function () {
        sinon_1.default.stub(jsonwebtoken_1.default, 'verify');
        jsonwebtoken_1.default.verify.returns({
            email: 'sam@sam.com',
            _id: '12356',
            foodTypes: ['vegan']
        });
        var req = {
            get: function (auth) {
                return 'Bearer abcde';
            }
        };
        var decoded = passwordUtility_1.decodeToken(req);
        chai_1.expect(req).to.have.property('user');
        chai_1.expect(decoded).to.be.true;
        jsonwebtoken_1.default.verify.restore();
    });
    it('it should throw an error if correct token is not provided', function () {
        var req = {
            get: function (auth) {
                return 'axvyers';
            }
        };
        chai_1.expect(function () { return passwordUtility_1.decodeToken(req); }).to.throw();
    });
});
