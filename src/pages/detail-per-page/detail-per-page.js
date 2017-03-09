"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var variables_1 = require("../../providers/variables");
/*
 Generated class for the DetailPerPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var DetailPerPagePage = (function () {
    function DetailPerPagePage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.GetClientByNumDossTest = false;
        this.nom = navParams.get("nom");
        this.age = navParams.get("age");
        this.numDoss = navParams.get("numDoss");
    }
    DetailPerPagePage.prototype.GetClientByNumDoss = function (numDoss) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '  <ser:GetClientByNumDoss>' +
            '<numdoss>' + numDoss + '</numdoss>' +
            '</ser:GetClientByNumDoss>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        _this.GetClientByNumDossTest = true;
                        var xml = xmlhttp.responseXML;
                        var x;
                        x = xml.getElementsByTagName("return");
                    }
                    catch (Error) {
                        _this.GetClientByNumDossTest = false;
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    DetailPerPagePage.prototype.ionViewDidLoad = function () {
        this.GetClientByNumDoss(this.numDoss);
        // this.datenaiss = this.datenaiss.split("T", 9)[0].toString();
    };
    DetailPerPagePage = __decorate([
        core_1.Component({
            selector: 'page-detail-per-page',
            templateUrl: 'detail-per-page.html',
            providers: [variables_1.Variables]
        })
    ], DetailPerPagePage);
    return DetailPerPagePage;
}());
exports.DetailPerPagePage = DetailPerPagePage;
