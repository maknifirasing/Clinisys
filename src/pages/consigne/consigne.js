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
import { Consigne } from "../../models/Consigne";
import { Content } from "ionic-angular";
import { DossierPage } from "../dossier/dossier";
import { ConsigneService } from "../../services/ConsigneService";
import { tabBadge } from "../../models/tabBadge";
import { tabBadgeConsigneService } from "../../services/tabBadgeConsigneService";
var ConsignePage = (function () {
    function ConsignePage(navCtrl, navParams, Url, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.platform = platform;
        this.consigne = [];
        this.coountConsigne = 0;
        this.coountConsigneT = 0;
        this.tabgConsigne = [];
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
        this.histd = DossierPage.hist;
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
    ConsignePage.prototype.getPlanificationTacheInfirmierByNumDossAndTypeOff = function (consigne, numDoss, type, etat, codeClinique) {
        this.consigneserv = new ConsigneService();
        this.consigne = this.consigneserv.getConsignes(consigne, numDoss, codeClinique, type, etat);
    };
    ConsignePage.prototype.CreatePlanificationTacheInfirmiereForTablette = function (details) {
        var _this = this;
        if (this.connection === true) {
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
                        alert("ok");
                        var xml;
                        xml = xmlhttp.responseXML;
                        var x, i;
                        x = xml.getElementsByTagName("return");
                        console.log(xml);
                        console.log(x);
                        _this.deletePlanificationTacheInfirmierByNumDossAndType(_this.pass.getdossier(), _this.type, _this.etat, _this.codeClinique);
                    }
                }
            };
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        }
        else {
            alert(this.tabLangue.errConn);
        }
    };
    ConsignePage.prototype.getPlanificationTacheInfirmierByNumDossAndType = function (numDoss, type, etat, codeClinique) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:getPlanificationTacheInfirmierByNumDossAndType>' +
            '<numDoss>' + numDoss + '</numDoss>' +
            '<type>' + type + '</type>' +
            '<etat>' + etat + '</etat>' +
            '</ser:getPlanificationTacheInfirmierByNumDossAndType>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var xml;
                    xml = xmlhttp.responseXML;
                    var x, i;
                    x = xml.getElementsByTagName("return");
                    var c;
                    var tempsEnMs = new Date().getFullYear();
                    var d;
                    for (i = 0; i < x.length; i++) {
                        c = new Consigne();
                        if (x[i].childElementCount === 19) {
                            c.setcodeMedecin(x[i].children[1].textContent);
                            c.setdatetache(x[i].children[6].textContent);
                            c.setdetails(x[i].children[7].textContent);
                            c.setetat(x[i].children[8].textContent);
                            c.setheurtache(x[i].children[9].textContent);
                            c.setnumeroDossier(x[i].children[13].textContent);
                            c.setuserCreate(x[i].children[16].textContent);
                            c.setcodeClinique(codeClinique);
                        }
                        else if (x[i].childElementCount === 18) {
                            c.setcodeMedecin(x[i].children[1].textContent);
                            c.setdatetache(x[i].children[6].textContent);
                            c.setdetails(x[i].children[7].textContent);
                            c.setetat(x[i].children[8].textContent);
                            c.setheurtache(x[i].children[9].textContent);
                            c.setnumeroDossier(x[i].children[12].textContent);
                            c.setuserCreate(x[i].children[15].textContent);
                            c.setcodeClinique(codeClinique);
                        }
                        _this.consigne.push(c);
                        if (c.getetat() === "F") {
                            _this.coountConsigneT++;
                        }
                    }
                    _this.coountConsigne = _this.consigne.length;
                    _this.consigneserv = new ConsigneService();
                    _this.consigneserv.verifConsigne(_this.consigne, numDoss, codeClinique, type, etat).then(function (res) {
                        if (res === false) {
                            _this.consigneserv.getConsignes(_this.consigne, numDoss, codeClinique, type, etat);
                        }
                    });
                    var tConsigne = new tabBadge();
                    tConsigne.setnumDoss(numDoss);
                    tConsigne.setFichier(_this.coountConsigne);
                    tConsigne.setFichierT(_this.coountConsigneT);
                    tConsigne.setcodeClinique(codeClinique);
                    _this.tabgConsigne.push(tConsigne);
                    _this.countConsigneserv = new tabBadgeConsigneService();
                    _this.countConsigneserv.verifTabBadgeConsigne(numDoss, codeClinique).then(function (res) {
                        if (res === false) {
                            _this.countConsigneserv.getTabBadgeConsigne(_this.tabgConsigne, numDoss, codeClinique);
                        }
                    });
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    ConsignePage.prototype.deletePlanificationTacheInfirmierByNumDossAndType = function (numDoss, type, etat, codeClinique) {
        var _this = this;
        this.countConsigneserv = new tabBadgeConsigneService();
        this.countConsigneserv.deletetabBadgeConsignes(numDoss, codeClinique);
        this.consigneserv = new ConsigneService();
        this.consigneserv.deleteConsignes(numDoss, codeClinique).then(function (res) {
            if (res === true) {
                _this.getPlanificationTacheInfirmierByNumDossAndType(numDoss, type, etat, codeClinique);
            }
        });
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