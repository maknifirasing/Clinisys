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
import { NavController, Platform } from 'ionic-angular';
import { Variables } from "../../providers/variables";
import { NativeStorage } from "ionic-native";
import { ListeCliniquePage } from "../liste-clinique/liste-clinique";
import { Langue } from "../../models/Langue";
import { LangueService } from "../../services/LangueService";
var LanguesPage = (function () {
    function LanguesPage(navCtrl, platform) {
        this.navCtrl = navCtrl;
        this.langes = [];
        this.users = [];
        NativeStorage.setItem("name", "basma");
    }
    LanguesPage.prototype.ionViewDidLoad = function () {
    };
    LanguesPage.prototype.choixLang = function (langue) {
        if (langue === "arabe") {
            this.tabLangue = Variables.arabe;
        }
        else if (langue === "francais") {
            this.tabLangue = Variables.francais;
        }
        else if (langue === "anglais") {
            this.tabLangue = Variables.anglais;
        }
        var l = new Langue();
        l.setlangue(langue);
        this.langes.push(l);
        this.langserv = new LangueService();
        try {
            this.langserv.deleteLangues();
            this.langserv.getLangues(this.langes);
        }
        catch (Error) {
            this.langserv.getLangues(this.langes);
        }
        this.langserv.getLangues(this.langes);
        this.navCtrl.push(ListeCliniquePage, { tabLangue: this.tabLangue, langue: langue });
    };
    return LanguesPage;
}());
LanguesPage = __decorate([
    Component({
        selector: 'page-langues',
        templateUrl: 'langues.html'
    }),
    __metadata("design:paramtypes", [NavController, Platform])
], LanguesPage);
export { LanguesPage };
//# sourceMappingURL=langues.js.map