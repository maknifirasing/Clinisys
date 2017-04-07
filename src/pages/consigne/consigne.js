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
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Variables } from "../../providers/variables";
import { HistDossier } from "../../models/HistDossier";
import { Consigne } from "../../models/Consigne";
import { HistDossierService } from "../../services/HistDossierService";
import { ConsigneService } from "../../services/ConsigneService";
import { Content } from "ionic-angular";
var ConsignePage = (function () {
    function ConsignePage(navCtrl, navParams, Url, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.platform = platform;
        this.consigne = [];
        this.histD = [];
        this.histd = new HistDossier();
        this.tabLangue = navParams.get("tabLangue");
        this.codeClinique = navParams.get("codeClinique");
        this.pass = navParams.get("pass");
        this.langue = navParams.get("langue");
        this.consigne = navParams.get("consigne");
        this.type = navParams.get("typeconsigne");
        this.etat = navParams.get("etatconsigne");
        this.platform.ready().then(function () {
            Variables.checconnection().then(function (connexion) {
                if (connexion === false) {
                    _this.connection = false;
                    _this.getPlanificationTacheInfirmierByNumDossAndTypeOff(_this.consigne, _this.pass.getdossier(), _this.type, _this.etat, _this.codeClinique);
                }
                else {
                    _this.connection = true;
                }
            });
        });
        this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique);
    }
    ConsignePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConsignePage');
    };
    ConsignePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        //this.content.scrollToBottom(300);//300ms animation speed
        setTimeout(function () {
            _this.content.scrollToBottom(300); //300ms animation speed
        });
    };
    ConsignePage.prototype.historiqueOff = function (hist, numDoss, codeClinique) {
        var _this = this;
        this.histserv = new HistDossierService();
        this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(function (res) {
            _this.histd = res.getdate();
        });
    };
    ConsignePage.prototype.getPlanificationTacheInfirmierByNumDossAndTypeOff = function (consigne, numDoss, type, etat, codeClinique) {
        this.consigneserv = new ConsigneService();
        this.consigne = this.consigneserv.getConsignes(consigne, numDoss, codeClinique, type, etat);
    };
    ConsignePage.prototype.CreatePlanificationTacheInfirmiereForTablette = function (details) {
        var c = new Consigne();
        var date = new Date();
        var d = date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDay() + "T"
            + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        c.setnumeroDossier(this.pass.getdossier());
        c.setdetails(details);
        c.settype("Autre");
        c.setheurtache(d);
        c.setuserCreate(this.pass.getnom());
        c.setetat("NL");
        c.setcodeMedecin("");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:CreatePlanificationTacheInfirmiereForTablette>' +
            '<numdoss>' + c.getnumeroDossier() + '</numdoss>' +
            '<details>' + c.getdetails() + '</details>' +
            '<type>' + c.gettype() + '</type>' +
            '<heure>' + c.getheurtache() + '</heure>' +
            '<userCreate>' + c.getuserCreate() + '</userCreate>' +
            '<etat>' + c.getetat() + '</etat>' +
            '<codemed>' + c.getcodeMedecin() + '</codemed>' +
            '</ser:CreatePlanificationTacheInfirmiereForTablette>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var xml;
                    xml = xmlhttp.responseXML;
                    var x, i;
                    x = xml.getElementsByTagName("return");
                    console.log(xml);
                    console.log(x);
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    return ConsignePage;
}());
__decorate([
    ViewChild(Content),
    __metadata("design:type", Content)
], ConsignePage.prototype, "content", void 0);
ConsignePage = __decorate([
    Component({
        selector: 'page-consigne',
        templateUrl: 'consigne.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables, Platform])
], ConsignePage);
export { ConsignePage };
//# sourceMappingURL=consigne.js.map