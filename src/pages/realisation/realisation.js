var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Variables } from "../../providers/variables";
import { MdMenuTrigger } from "@angular/material";
import { Planification } from "../../models/Planification";
import { DossierPage } from "../dossier/dossier";
import { ClientDetailPage } from "../client-detail/client-detail";
import { LangueService } from "../../services/LangueService";
import { SQLite } from "@ionic-native/sqlite";
var RealisationPage = (function () {
    function RealisationPage(navCtrl, navParams, sqlite) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.planification = [];
        this.langes = [];
        this.tabLangue = navParams.get("tabLangue");
        this.codeClinique = navParams.get("codeClinique");
        this.pass = navParams.get("pass");
        this.langue = navParams.get("langue");
        this.datefeuille = navParams.get("dateFeuille");
        this.heureActuelle = navParams.get("heureActuelle");
        /*
         this.user = "admin";
         this.datefeuille = "18/05/2016";
         this.heureActuelle = "16";
         this.getAllPlanification("16002649", this.datefeuille, "REA", this.heureActuelle);
         */
        Variables.checconnection().then(function (connexion) {
            if (connexion === false) {
                _this.connection = false;
            }
            else {
                _this.connection = true;
                _this.langserv = new LangueService(_this.sqlite);
                _this.langserv.getLangues(_this.langes).then(function (lg) {
                    _this.getAllPlanification(_this.pass.getdossier(), _this.datefeuille, _this.pass.getnature(), _this.heureActuelle);
                    _this.user = lg.getnom();
                });
            }
        });
        this.histd = DossierPage.hist;
    }
    RealisationPage.prototype.getAllPlanification = function (numDoss, dateFeuille, nature, heure) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:getPlanificationNonRealise>' +
            '<numdoss>' + numDoss + '</numdoss>' +
            '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
            '<nature>' + nature + '</nature>' +
            '<heure>' + heure + '</heure>' +
            '</ser:getPlanificationNonRealise>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    _this.xml = xmlhttp.responseXML;
                    var x, i, p;
                    x = _this.xml.getElementsByTagName("return");
                    console.log(x);
                    for (i = 0; i < x.length; i++) {
                        p = new Planification();
                        p.setcodeType(x[i].children[0].textContent);
                        p.setdesignation(x[i].children[1].textContent);
                        p.getdate(x[i].children[2].children[0].textContent);
                        p.setheurePrise(x[i].children[2].children[1].textContent);
                        p.setnum(x[i].children[2].children[2].textContent);
                        p.setseuilMax(x[i].children[3].textContent);
                        p.setseuilMin(x[i].children[4].textContent);
                        p.settype(x[i].children[5].textContent);
                        _this.planification.push(p);
                        console.log(p);
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    RealisationPage.prototype.CreatePlusieursRealisation = function (traitsList, qtesList) {
        var _this = this;
        console.log(traitsList + "  q  " + qtesList);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:CreatePlusieursRealisation>' +
            '<numTr>' + traitsList + '</numTr>' +
            '<date_prise>' + this.datefeuille + '</date_prise>' +
            '<heure_prise>' + this.heureActuelle + '</heure_prise>' +
            '<qnt>' + qtesList + '</qnt>' +
            '<user>' + this.user + '</user>' +
            '</ser:CreatePlusieursRealisation>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    _this.xml = xmlhttp.responseXML;
                    var x;
                    x = _this.xml.getElementsByTagName("return");
                    console.log(x);
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    RealisationPage.prototype.goToInfPage = function (patient) {
        this.navCtrl.push(ClientDetailPage, {
            patient: patient,
            motif: DossierPage.motifhh,
            tabLangue: this.tabLangue,
            langue: this.langue,
            codeClinique: this.codeClinique
        });
    };
    RealisationPage.prototype.change = function (value) {
        var c = document.getElementById("cc");
        c = value;
        document.getElementById("totalValue").innerHTML = "Total price: $" + 500 * value;
    };
    return RealisationPage;
}());
__decorate([
    ViewChild(MdMenuTrigger),
    __metadata("design:type", MdMenuTrigger)
], RealisationPage.prototype, "trigger", void 0);
RealisationPage = __decorate([
    Component({
        selector: 'page-realisation',
        templateUrl: 'realisation.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, SQLite])
], RealisationPage);
export { RealisationPage };
//# sourceMappingURL=realisation.js.map