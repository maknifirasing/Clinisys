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
import { Client } from "../../models/Client";
import { Variables } from "../../providers/variables";
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
        this.clientList = [];
        this.image = navParams.get("image");
        this.nom = navParams.get("nom");
        this.prenom = navParams.get("prenom");
    }
    DetailPerPagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ClientDetailPage');
    };
    DetailPerPagePage.prototype.GetClientByNumDoss = function (numDoss) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:GetClientByNumDoss>' +
            '<numDoss>' + numDoss + '</numDoss>' +
            '</ser:GetClientByNumDoss>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var xml = xmlhttp.responseXML;
                    var x, i;
                    x = xml.getElementsByTagName("return");
                    var client;
                    var d;
                    d = new Date();
                    for (i = 0; i < x.length; i++) {
                        client = new Client();
                        client.setadrCli(x[i].children[0].textContent);
                        d = (x[i].children[3].textContent).substr(0, 9);
                        client.setdatNai(d);
                        client.setlibNat(x[i].children[67].children[1].textContent);
                        client.setnumTel(x[i].children[78].textContent);
                        client.setetage(x[i].children[76].children[0].children[3].textContent);
                        client.setnumCha(x[i].children[76].children[2].textContent);
                        client.setnumdoss(x[i].children[77].textContent);
                        client.setidentifiant(x[i].children[18].textContent);
                        _this.clientList.push(client);
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    return DetailPerPagePage;
}());
DetailPerPagePage = __decorate([
    Component({
        selector: 'page-detail-per-page',
        templateUrl: 'detail-per-page.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], DetailPerPagePage);
export { DetailPerPagePage };
//# sourceMappingURL=detail-per-page.js.map