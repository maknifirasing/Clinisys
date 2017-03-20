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
import { HistDossier } from "../../models/HistDossier";
import { HistDossierService } from "../../services/HistDossierService";
/*
 Generated class for the ListPreanesthesie page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var ListPreanesthesiePage = (function () {
    function ListPreanesthesiePage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.ListPreanesthesieByNumeroDossierTest = false;
        this.ListeP = [];
        this.histD = [];
        this.histd = new HistDossier();
        this.ListeP = navParams.get("ListeP");
        this.pass = navParams.get("pass");
        this.codeClinique = navParams.get("codeClinique");
        this.langue = navParams.get("langue");
        if (Variables.checconnection() === "No network connection") {
            this.connection = false;
        }
        else {
            this.connection = true;
        }
        this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique);
    }
    ListPreanesthesiePage.prototype.ionViewDidLoad = function () {
    };
    ListPreanesthesiePage.prototype.historiqueOff = function (hist, numDoss, codeClinique) {
        var _this = this;
        this.histserv = new HistDossierService();
        this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(function (res) {
            _this.histd = res.getdate();
        });
    };
    return ListPreanesthesiePage;
}());
ListPreanesthesiePage = __decorate([
    Component({
        selector: 'page-list-preanesthesie',
        templateUrl: 'list-preanesthesie.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], ListPreanesthesiePage);
export { ListPreanesthesiePage };
//# sourceMappingURL=list-preanesthesie.js.map