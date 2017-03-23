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
import { Patient } from "../../models/Patient";
import { DateFeuille } from "../../models/DateFeuille";
import { Variables } from "../../providers/variables";
/*
  Generated class for the Try page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TryPage = (function () {
    function TryPage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.patient = [];
        this.patientliste = [];
        this.datefeuille = [];
        this.med = "medecin foulen foulen foulen";
        this.liste("admin", "", "all");
        this.DateFeuille();
        this.date = " En Ligne: Derniére mise a jour le 15/03/2017 08:37:10";
        this.dateArr = " على الانترنت: آخر تحديث 15/03/2017 08:37:10";
        console.log("a " + this.dateArr.substr(0, 25));
        this.patientliste = this.patient;
    }
    TryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TryPage');
    };
    /*async getPersonFullNameUsingAsync() {
      let response = await fetch('./data/person.json');
      let person = await response.json();
      console.log(`${person.firstName} ${person.lastName}`);
    }*/
    TryPage.prototype.DateFeuille = function () {
        var _this = this;
        this.datefeuille.pop();
        this.datefeuille = [];
        this.datefeuille.length = 0;
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
                    var x, i, d;
                    x = _this.xml.getElementsByTagName("return");
                    //    this.datefeuille = this.datefeuille + this.DateF[0].childNodes[0].nodeValue;
                    for (i = 0; i < x.length; i++) {
                        d = new DateFeuille();
                        d.setdatefeuille(x[i].childNodes[0].nodeValue);
                        _this.datefeuille.push(d);
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    TryPage.prototype.liste = function (user, searchText, etage) {
        var _this = this;
        this.patient.pop();
        this.patient = [];
        this.patient.length = 0;
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
                        p = new Patient();
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
    return TryPage;
}());
TryPage = __decorate([
    Component({
        selector: 'page-try',
        templateUrl: 'try.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], TryPage);
export { TryPage };
//# sourceMappingURL=try.js.map