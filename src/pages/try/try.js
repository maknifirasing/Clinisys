var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Variables } from "../../providers/variables";
import { LanguesPage } from "../langues/langues";
var TryPage = (function () {
    function TryPage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.traitcourbe = [];
        this.courbePouls = [];
        this.courbeTA = [];
        this.courbeTemp = [];
        this.courbeSaturation = [];
        this.courbeFrq = [];
        this.tab1Root = LanguesPage;
        this.tab2Root = LanguesPage;
        this.tab3Root = LanguesPage;
    }
    return TryPage;
}());
TryPage = __decorate([
    Component({
        selector: 'page-try',
        templateUrl: 'try.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], TryPage);
export { TryPage };
//# sourceMappingURL=try.js.map