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
import { NavController } from 'ionic-angular';
import { Variables } from "../../providers/variables";
import { ListeCliniquePage } from "../liste-clinique/liste-clinique";
import { Langue } from "../../models/Langue";
import { LangueService } from "../../services/LangueService";
import { ListePage } from "../liste/liste";
import { UserService } from "../../services/UserService";
var LanguesPage = (function () {
    function LanguesPage(navCtrl, Url) {
        this.navCtrl = navCtrl;
        this.Url = Url;
        this.langes = [];
        //  Variables.auth();
    }
    LanguesPage.prototype.ionViewDidLoad = function () {
    };
    LanguesPage.prototype.choixLang = function (lang) {
        var _this = this;
        if (lang === "arabe") {
            this.tabLangue = Variables.arabe;
        }
        else if (lang === "francais") {
            this.tabLangue = Variables.francais;
        }
        else if (lang === "anglais") {
            this.tabLangue = Variables.anglais;
        }
        this.userserv = new UserService();
        this.userserv.getAllUser().then(function (user) {
            if (user.length === 0) {
                _this.navCtrl.push(ListeCliniquePage, { tabLangue: _this.tabLangue, langue: lang });
            }
            else {
                _this.langserv = new LangueService();
                _this.langserv.verifLangue().then(function (res) {
                    if (res === true) {
                        _this.langserv.getLangues(_this.langes).then(function (lg) {
                            var l = new Langue();
                            l.setlangue(lang);
                            l.setmatricule(lg.getmatricule());
                            l.setcodeClinique(lg.getcodeClinique());
                            l.setnomClinique(lg.getnomClinique());
                            l.seturl(lg.geturl());
                            _this.langes.push(l);
                            _this.langserv.deleteLangues().then(function (delet) {
                                if (delet === true) {
                                    _this.langserv.getLangues(_this.langes);
                                    _this.navCtrl.setRoot(ListePage, {
                                        tabLangue: _this.tabLangue,
                                        langue: lang,
                                        codeClinique: lg.getcodeClinique(),
                                        nomClinique: lg.getnomClinique()
                                    });
                                }
                            });
                        });
                    }
                    else {
                        _this.navCtrl.push(ListeCliniquePage, { tabLangue: _this.tabLangue, langue: lang });
                    }
                });
            }
        });
    };
    return LanguesPage;
}());
LanguesPage = __decorate([
    Component({
        selector: 'page-langues',
        templateUrl: 'langues.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, Variables])
], LanguesPage);
export { LanguesPage };
//# sourceMappingURL=langues.js.map