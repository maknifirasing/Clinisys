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
import { Medecin } from "../../models/Medecin";
import { ClientService } from "../../services/ClientService";
import { MedecinService } from "../../services/MedecinService";
var ClientDetailPage = (function () {
    function ClientDetailPage(navCtrl, navParams, Url) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.clientList = [];
        this.medecinList = [];
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.patient = navParams.get("patient");
        this.motif = navParams.get("motif");
        this.tabLangue = navParams.get("tabLangue");
        this.langue = navParams.get("langue");
        this.codeClinique = navParams.get("codeClinique");
        Variables.checconnection().then(function (res) {
            if (res === false) {
                _this.connection = false;
                _this.GetClientByNumDossOff(_this.clientList, _this.patient.getdossier());
                _this.findMedIntervenatByNumDossOff(_this.medecinList, _this.patient.getdossier());
            }
            else {
                _this.connection = true;
                _this.GetClientByNumDoss(_this.patient.getdossier());
                _this.findMedIntervenatByNumDoss(_this.patient.getdossier());
            }
        });
    }
    ClientDetailPage.prototype.ionViewDidLoad = function () {
        this.tabBarElement.style.display = 'none';
    };
    ClientDetailPage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
    };
    ClientDetailPage.prototype.GetClientByNumDoss = function (numDoss) {
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
                    var d, d2;
                    d = new Date();
                    for (i = 0; i < x.length; i++) {
                        client = new Client();
                        client.setadrCli(x[i].children[0].textContent);
                        d = (x[i].children[3].textContent).substr(0, 9);
                        client.setdatNai(d);
                        client.setlibNat(x[i].children[67].children[1].textContent);
                        client.setnumTel(x[i].children[78].textContent);
                        client.setetage(x[i].children[83].children[0].children[3].textContent);
                        client.setnumCha(x[i].children[83].children[2].textContent);
                        client.setnumdoss(x[i].children[77].textContent);
                        client.setidentifiant(x[i].children[18].textContent);
                        d2 = (x[i].children[4].textContent).substr(0, 9);
                        client.setdateArr(d2);
                        client.setcodeClinique(_this.codeClinique);
                        _this.clientList.push(client);
                    }
                    _this.clientserv = new ClientService();
                    _this.clientserv.verifClient(_this.clientList, numDoss, _this.codeClinique).then(function (res) {
                        if (res === false) {
                            _this.clientserv.getClients(_this.clientList, numDoss, _this.codeClinique);
                        }
                    });
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    ClientDetailPage.prototype.GetClientByNumDossOff = function (clientList, numDoss) {
        this.clientserv = new ClientService();
        this.clientList = this.clientserv.getClients(this.clientList, numDoss, this.codeClinique);
    };
    ClientDetailPage.prototype.findMedIntervenatByNumDoss = function (numDoss) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/ReaWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:findMedIntervenatByNumDoss>' +
            '<numDoss>' + numDoss + '</numDoss>' +
            '</ser:findMedIntervenatByNumDoss>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var xml = xmlhttp.responseXML;
                    var x, i;
                    x = xml.getElementsByTagName("return");
                    var medecin;
                    for (i = 0; i < x.length; i++) {
                        medecin = new Medecin();
                        medecin.setcodMed(x[i].children[1].children[0].textContent);
                        medecin.setnomMed(x[i].children[2].textContent);
                        medecin.setdesignationSpecialite(x[i].children[0].textContent);
                        medecin.setcodeClinique(_this.codeClinique);
                        _this.medecinList.push(medecin);
                    }
                    _this.medecinserv = new MedecinService();
                    _this.medecinserv.verifMedecin(_this.medecinList, numDoss, _this.codeClinique).then(function (res) {
                        if (res === false) {
                            _this.medecinserv.getMedecins(_this.medecinList, numDoss, _this.codeClinique);
                        }
                    });
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    ClientDetailPage.prototype.findMedIntervenatByNumDossOff = function (medecinList, numDoss) {
        this.medecinserv = new MedecinService();
        this.medecinList = this.medecinserv.getMedecins(medecinList, numDoss, this.codeClinique);
    };
    return ClientDetailPage;
}());
ClientDetailPage = __decorate([
    Component({
        selector: 'page-client-detail',
        templateUrl: 'client-detail.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], ClientDetailPage);
export { ClientDetailPage };
//# sourceMappingURL=client-detail.js.map