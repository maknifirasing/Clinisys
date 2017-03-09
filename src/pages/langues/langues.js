"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var variables_1 = require("../../providers/variables");
var ionic_native_1 = require("ionic-native");
var lA_1 = require("./lA");
var LanguesPage = (function () {
    function LanguesPage(navCtrl) {
        this.navCtrl = navCtrl;
        ionic_native_1.NativeStorage.setItem("name", "basma");
    }
    LanguesPage.prototype.ionViewDidLoad = function () {
    };
    LanguesPage.prototype.choixLang = function (langue) {
        if (langue === "arabe") {
            this.tabLangue = variables_1.Variables.arabe;
            this.navCtrl.push(lA_1.lA);
        }
        else if (langue === "francais") {
            this.tabLangue = variables_1.Variables.francais;
        }
        else if (langue === "anglais") {
            this.tabLangue = variables_1.Variables.anglais;
        }
        // this.navCtrl.push(HomePage);
    };
    LanguesPage = __decorate([
        core_1.Component({
            selector: 'page-langues',
            templateUrl: 'langues.html'
        })
    ], LanguesPage);
    return LanguesPage;
}());
exports.LanguesPage = LanguesPage;
