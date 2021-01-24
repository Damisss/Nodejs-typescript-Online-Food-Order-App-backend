"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorBuilder = void 0;
// export class DefaultVendor extends Vendor {
//   constructor({
//     _id=1,
//     name= 'damiss',
//     ownerName= 'Damiss Sam',
//     foodTypes= ['vegan'],
//     pinCode=  '1010',
//     address= 'ul. Rostafinskiego 9, krakow ',
//     phone= '+48729608955',
//     email= 'sam@damiss.com',
//     password= '123456',
//     salt= 'xyzta',
//     serviceAvailable= false,
//     coverImages= ['ada'],
//     rating= 0,
//   }={}){
//     super({
//     name,
//     ownerName,
//     foodTypes,
//     pinCode,
//     address,
//     phone,
//     email,
//     password,
//     salt,
//     serviceAvailable,
//     coverImages, 
//     rating,
//     })
//   }
// }
var VendorBuilder = /** @class */ (function () {
    function VendorBuilder() {
        this.vendor = {
            _id: '1',
            name: 'damiss',
            ownerName: 'Damiss Sam',
            foodTypes: ['vegan'],
            pinCode: '1010',
            address: 'ul. Rostafinskiego 9, krakow ',
            phone: '+48729608955',
            email: 'sam@sam.com',
            password: 'abc12345',
            salt: '',
            serviceAvailable: false,
            coverImages: ['ada'],
            rating: 0,
        };
    }
    VendorBuilder.prototype.build = function () {
        var vendor = JSON.parse(JSON.stringify(this.vendor));
        return vendor;
    };
    VendorBuilder.prototype.withId = function (id) {
        this.vendor._id = id;
        return this;
    };
    VendorBuilder.prototype.withName = function (name) {
        this.vendor.name = name;
        return this;
    };
    VendorBuilder.prototype.withOwnerName = function (ownerName) {
        this.vendor.ownerName = ownerName;
        return this;
    };
    VendorBuilder.prototype.withFoodTypes = function (foodTypes) {
        this.vendor.foodTypes = foodTypes;
        return this;
    };
    VendorBuilder.prototype.withPinCode = function (code) {
        this.vendor.pinCode = code;
        return this;
    };
    VendorBuilder.prototype.withAddress = function (address) {
        this.vendor.address = address;
        return this;
    };
    VendorBuilder.prototype.withPhone = function (phone) {
        this.vendor.phone = phone;
        return this;
    };
    VendorBuilder.prototype.withEmail = function (email) {
        this.vendor.email = email;
        return this;
    };
    VendorBuilder.prototype.withPassword = function (password) {
        this.vendor.password = password;
        return this;
    };
    VendorBuilder.prototype.withSalt = function (salt) {
        this.vendor.salt = salt;
        return this;
    };
    VendorBuilder.prototype.withServiceAvailable = function (serviceAvailable) {
        this.vendor.serviceAvailable = serviceAvailable;
        return this;
    };
    VendorBuilder.prototype.withCoverImages = function (coverImages) {
        this.vendor.coverImages = coverImages;
        return this;
    };
    VendorBuilder.prototype.withRating = function (rating) {
        this.vendor.rating = rating;
        return this;
    };
    return VendorBuilder;
}());
exports.VendorBuilder = VendorBuilder;
