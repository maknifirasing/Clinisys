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
<<<<<<< HEAD
=======
import { HistDossier } from "../../models/HistDossier";
import { HistDossierService } from "../../services/HistDossierService";
>>>>>>> 4be4927213b1323428f917514734f104c677a059
var ExamenRadioPage = (function () {
    function ExamenRadioPage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.GetExamenRadioByNumDossResponseTest = false;
        this.examenRT = [];
        this.examenRF = [];
        this.document = [];
        this.histD = [];
        this.histd = new HistDossier();
        this.examenRF = navParams.get("examenRF");
        this.examenRT = navParams.get("examenRT");
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
    ExamenRadioPage.prototype.ionViewDidLoad = function () {
    };
    ExamenRadioPage.prototype.getdocumentById = function (observ) {
        this.url = this.Url.url + "dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=" + observ;
    };
<<<<<<< HEAD
=======
    ExamenRadioPage.prototype.historiqueOff = function (hist, numDoss, codeClinique) {
        var _this = this;
        this.histserv = new HistDossierService();
        this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(function (res) {
            _this.histd = res.getdate();
        });
    };
>>>>>>> 4be4927213b1323428f917514734f104c677a059
    return ExamenRadioPage;
}());
ExamenRadioPage = __decorate([
    Component({
        selector: 'page-examen-radio',
        templateUrl: 'examen-radio.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], ExamenRadioPage);
export { ExamenRadioPage };
//# sourceMappingURL=examen-radio.js.map