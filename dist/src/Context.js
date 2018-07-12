"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Utilities_1 = require("./Utilities");
var ProxyPropertyContextBase = /** @class */ (function () {
    function ProxyPropertyContextBase() {
        this.name = null;
        this.type = null;
        this.access = null;
    }
    return ProxyPropertyContextBase;
}());
exports.ProxyPropertyContextBase = ProxyPropertyContextBase;
var ProxyPropertyContext = /** @class */ (function (_super) {
    __extends(ProxyPropertyContext, _super);
    function ProxyPropertyContext() {
        return _super.call(this) || this;
    }
    ProxyPropertyContext.prototype.promoteToMethod = function () {
        var methodContext = this;
        methodContext.method = new ProxyMethodContext();
        methodContext.type = 'function';
        return methodContext;
    };
    return ProxyPropertyContext;
}(ProxyPropertyContextBase));
exports.ProxyPropertyContext = ProxyPropertyContext;
var ProxyMethodPropertyContext = /** @class */ (function (_super) {
    __extends(ProxyMethodPropertyContext, _super);
    function ProxyMethodPropertyContext() {
        var _this = _super.call(this) || this;
        _this.method = new ProxyMethodContext();
        return _this;
    }
    return ProxyMethodPropertyContext;
}(ProxyPropertyContextBase));
exports.ProxyMethodPropertyContext = ProxyMethodPropertyContext;
var ProxyMethodContext = /** @class */ (function () {
    function ProxyMethodContext() {
        this.arguments = [];
    }
    return ProxyMethodContext;
}());
exports.ProxyMethodContext = ProxyMethodContext;
var ProxyCallRecords = /** @class */ (function () {
    function ProxyCallRecords() {
        this.expected = null;
        this.actual = [];
    }
    return ProxyCallRecords;
}());
exports.ProxyCallRecords = ProxyCallRecords;
var ProxyObjectContext = /** @class */ (function () {
    function ProxyObjectContext() {
        this.calls = new ProxyCallRecords();
        this.property = new ProxyPropertyContext();
    }
    ProxyObjectContext.prototype.setExpectedCallCount = function (count) {
        var call = new ProxyCallRecord();
        call.callCount = count;
        this.calls.expected = call;
    };
    ProxyObjectContext.prototype.findActualPropertyCall = function (propertyName, access) {
        return this.calls.actual.filter(function (x) {
            return x.property.name === propertyName &&
                x.property.access === access;
        })[0] || null;
    };
    ProxyObjectContext.prototype.findActualMethodCall = function (propertyName, args) {
        return this.calls.actual.filter(function (x) {
            return x.property.type === 'function' &&
                x.property.name === propertyName &&
                Utilities_1.areArgumentsEqual(x.property.method.arguments, args);
        })[0] || null;
    };
    ProxyObjectContext.prototype.addActualPropertyCall = function () {
        var _this = this;
        var existingCall;
        var existingCallCandidates = this.calls.actual.filter(function (x) {
            return x.property.name === _this.property.name &&
                x.property.access === _this.property.access;
        });
        var thisProperty = this.property;
        if (thisProperty.type === 'function') {
            existingCall = existingCallCandidates.filter(function (x) {
                return x.property.type === thisProperty.type &&
                    Utilities_1.areArgumentsEqual(x.property.method.arguments, thisProperty.method.arguments);
            })[0];
        }
        else {
            existingCall = existingCallCandidates[0];
        }
        if (existingCall) {
            existingCall.callCount++;
            return;
        }
        var newCall = new ProxyCallRecord(this.property);
        this.calls.actual.push(newCall);
    };
    ProxyObjectContext.prototype.findCall = function (callList, propertyName, access) {
    };
    return ProxyObjectContext;
}());
exports.ProxyObjectContext = ProxyObjectContext;
var ProxyCallRecord = /** @class */ (function () {
    function ProxyCallRecord(property) {
        this.callCount = 0;
        this.property = property || null;
    }
    return ProxyCallRecord;
}());
exports.ProxyCallRecord = ProxyCallRecord;
//# sourceMappingURL=Context.js.map