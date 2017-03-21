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
/*
 Generated class for the Consigne page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var ConsignePage = (function () {
    function ConsignePage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
    }
    ConsignePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConsignePage');
    };
    ConsignePage.prototype.CreatePlanificationTacheInfirmiereForTablette = function (type, heure, details, userCreate, numdoss, codemed, etat) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:CreatePlanificationTacheInfirmiereForTablette>' +
            '<numdoss>' + numdoss + '</numdoss>' +
            '<details>' + details + '</details>' +
            '<type>' + type + '</type>' +
            '<heure>' + heure + '</heure>' +
            '<userCreate>' + userCreate + '</userCreate>' +
            '<etat>' + etat + '</etat>' +
            '<codemed>' + codemed + '</codemed>' +
            '</ser:CreatePlanificationTacheInfirmiereForTablette>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        var xml = xmlhttp.responseXML;
                    }
                    catch (Error) {
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    return ConsignePage;
}());
ConsignePage = __decorate([
    Component({
        selector: 'page-consigne',
        templateUrl: 'consigne.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], ConsignePage);
export { ConsignePage };
//# sourceMappingURL=consigne.js.map