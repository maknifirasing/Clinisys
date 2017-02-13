"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* * * ./app/comments/components/comment.service.ts * * */
// Imports
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
// Import RxJs required methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var WS = (function () {
    // Resolve HTTP using the constructor
    function WS(http) {
        this.http = http;
        // private instance variable to hold base url
        // private commentsUrl = 'http://localhost:3000/api/comments';
        this.patientUrl = 'http://192.168.0.55:8084/dmi-core/ReaWSService';
    }
    // Fetch all existing comments
    WS.prototype.GetAllFamillePosologie = function () {
        alert("bonjourrrrr");
        // ...using get request
        return this.http.get(this.patientUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    WS = __decorate([
        core_1.Injectable()
    ], WS);
    return WS;
}());
exports.WS = WS;
