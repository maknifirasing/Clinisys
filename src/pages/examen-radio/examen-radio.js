"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var variables_1 = require("../../providers/variables");
var ExamenRadioPage = (function () {
    function ExamenRadioPage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.GetExamenRadioByNumDossResponseTest = false;
        this.examenRT = [];
        this.examenRF = [];
        this.document = [];
        this.examenRF = this.navParams.data.examenRF;
        this.examenRT = this.navParams.data.examenRT;
    }
    ExamenRadioPage.prototype.ionViewDidLoad = function () {
    };
    ExamenRadioPage.prototype.getdocumentById = function (observ) {
        this.url = this.Url.url + "dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=" + observ;
    };
    ExamenRadioPage = __decorate([
        core_1.Component({
            selector: 'page-examen-radio',
            templateUrl: 'examen-radio.html',
            providers: [variables_1.Variables]
        })
    ], ExamenRadioPage);
    return ExamenRadioPage;
}());
exports.ExamenRadioPage = ExamenRadioPage;
