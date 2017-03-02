"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Patient_1 = require('../../models/Patient');
var variables_1 = require("../../providers/variables");
var tabs_1 = require("../tabs/tabs");
var ListePage = (function () {
    function ListePage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.patient = [];
        this.patientliste = [];
        this.datefeuille = "";
        this.patientliste = this.patient;
    }
    ListePage.prototype.ionViewDidLoad = function () {
        this.liste("admin", "", "all");
        this.DateFeuille();
    };
    ListePage.prototype.liste = function (user, searchText, etage) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/ReaWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:GetListClientForTablette>' +
            '<user>' + user + '</user>' +
            '<searchText>' + searchText + '</searchText>' +
            '<etage>' + etage + '</etage>' +
            '</ser:GetListClientForTablette>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    _this.xml = xmlhttp.responseXML;
                    var x, i;
                    x = _this.xml.getElementsByTagName("return");
                    var p;
                    var tempsEnMs = new Date().getFullYear();
                    var d;
                    for (i = 0; i < x.length; i++) {
                        p = new Patient_1.Patient();
                        p.setid(x[i].children[8].textContent);
                        p.setdossier(x[i].children[0].textContent);
                        p.setchambre(x[i].children[1].textContent);
                        p.setprenom(x[i].children[2].textContent);
                        p.setnom(x[i].children[3].textContent);
                        p.setdateNaiss(x[i].children[4].textContent);
                        p.setmedecin(x[i].children[5].textContent);
                        p.setspec(x[i].children[6].textContent);
                        p.setetat(x[i].children[10].textContent);
                        if (x[i].children[9].textContent === "Etage") {
                            p.setnature("sur");
                        }
                        else {
                            p.setnature(x[i].children[9].textContent);
                        }
                        d = new Date(x[i].children[4].textContent);
                        p.setage(tempsEnMs - d.getFullYear());
                        if (p.getetat() == "true") {
                            if (p.getage() < 18) {
                                p.setimg("babyboy.png");
                            }
                            else if (p.getage() >= 18 && p.getage() < 50) {
                                p.setimg("imagem.jpg");
                            }
                            else if (p.getage() >= 50) {
                                p.setimg("matureman.png");
                            }
                        }
                        else {
                            if (p.getage() < 18) {
                                p.setimg("babygirl.png");
                            }
                            else if (p.getage() >= 18 && p.getage() < 50) {
                                p.setimg("imagef.jpg");
                            }
                            else if (p.getage() >= 50) {
                                p.setimg("maturewoman.png");
                            }
                        }
                        _this.patient.push(p);
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    ListePage.prototype.DateFeuille = function () {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '  <ser:GetDateFeuille/>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    _this.xml = xmlhttp.responseXML;
                    _this.DateF = _this.xml.getElementsByTagName("return");
                    _this.datefeuille = _this.datefeuille + _this.DateF[0].childNodes[0].nodeValue;
                    return _this.datefeuille;
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    ListePage.prototype.goToDossierPage = function (patient) {
        this.lang = {
            age: this.navParams.data.lang.age,
            ch: this.navParams.data.lang.ch,
            titreEnligne: this.navParams.data.lang.titreEnligne,
            titreMotif: this.navParams.data.lang.titreMotif,
            titreAnt: this.navParams.data.lang.titreAnt,
            titreAll: this.navParams.data.lang.titreAll,
            titreSigneV: this.navParams.data.lang.titreSigneV,
            titreEnt: this.navParams.data.lang.titreEnt,
            titreTrait: this.navParams.data.lang.titreTrait,
            langue: this.navParams.data.lang.langue
        };
        this.navCtrl.push(tabs_1.TabsPage, {
            mypatient: patient,
            dateFeuille: this.datefeuille,
            lang: this.lang
        });
    };
    ListePage.prototype.initializeItems = function () {
        this.patientliste = this.patient;
    };
    ListePage.prototype.getItems = function (searchbar) {
        this.initializeItems();
        var q = searchbar.srcElement.value;
        if (!q) {
            return;
        }
        this.patientliste = this.patientliste.filter(function (v) {
            if (v && q) {
                if (v.getnom().toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                if (v.getmedecin().toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                else if (v.getage().toString().indexOf(q) > -1) {
                    return true;
                }
                else if (v.getchambre().toString().indexOf(q) > -1) {
                    return true;
                }
                return false;
            }
        });
    };
    ListePage = __decorate([
        core_1.Component({
            selector: 'page-liste',
            templateUrl: 'liste.html',
            providers: [variables_1.Variables]
        })
    ], ListePage);
    return ListePage;
}());
exports.ListePage = ListePage;
