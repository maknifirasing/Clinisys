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
        if (lang === "arabe") {
            this.tabLangue = Variables.arabe;
        }
        else if (lang === "francais") {
            this.tabLangue = Variables.francais;
        }
        else if (lang === "anglais") {
            this.tabLangue = Variables.anglais;
        }
        /*
        this.userserv = new UserService();
        this.userserv.getAllUser().then(user => {
          if (user.length === 0) {
            this.navCtrl.push(ListeCliniquePage, {tabLangue: this.tabLangue, langue: lang});
          } else {
            this.langserv = new LangueService();
            this.langserv.verifLangue().then(res => {
              if (res === true) {
                this.langserv.getLangues(this.langes).then(lg => {
                  var l = new Langue();
                  l.setlangue(lang);
                  l.setmatricule(lg.getmatricule());
                  l.setcodeClinique(lg.getcodeClinique());
                  l.setnomClinique(lg.getnomClinique());
                  l.seturl(lg.geturl());
                  this.langes.push(l);
                  this.langserv.deleteLangues().then(delet => {
                    if (delet === true) {
                      this.langserv.getLangues(this.langes);
                      this.navCtrl.setRoot(ListePage, {
                        tabLangue: this.tabLangue,
                        langue: lang,
                        codeClinique: lg.getcodeClinique(),
                        nomClinique: lg.getnomClinique()
                      });
                    }
                  });
                });
    
              } else {
                this.navCtrl.push(ListeCliniquePage, {tabLangue: this.tabLangue, langue: lang});
              }
            });
          }
          });
    */ this.navCtrl.push(ListeCliniquePage, { tabLangue: this.tabLangue, langue: lang });
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