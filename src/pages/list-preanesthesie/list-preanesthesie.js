"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var variables_1 = require("../../providers/variables");
var ListPreanesthesie_1 = require("../../models/ListPreanesthesie");
/*
 Generated class for the ListPreanesthesie page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var ListPreanesthesiePage = (function () {
    function ListPreanesthesiePage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.ListPreanesthesieByNumeroDossierTest = false;
        this.ListeP = [];
    }
    ListPreanesthesiePage.prototype.ionViewDidLoad = function () {
        this.findListPreanesthesieByNumeroDossierResponse(this.navParams.data.pass.getdossier());
    };
    ListPreanesthesiePage.prototype.findListPreanesthesieByNumeroDossierResponse = function (numDoss) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '  <ser:findListPreanesthesieByNumeroDossier>' +
            '<numeroDossier>' + numDoss + '</numeroDossier>' +
            '</ser:findListPreanesthesieByNumeroDossier>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        _this.ListPreanesthesieByNumeroDossierTest = true;
                        var xml = xmlhttp.responseXML;
                        var x, i, hdebut;
                        x = xml.getElementsByTagName("return");
                        var LP, hfin;
                        var minu = "";
                        var second = "";
                        var hour = "";
                        for (i = 0; i < x.length; i++) {
                            LP = new ListPreanesthesie_1.ListPreanesthesie();
                            LP.setacte(x[i].children[0].textContent);
                            LP.setchirurgien(x[i].children[1].textContent);
                            LP.setcodeActe(x[i].children[2].textContent);
                            LP.setcodeExamen(x[i].children[3].textContent);
                            LP.setcodeMedecinReanimateur(x[i].children[4].textContent);
                            LP.setcodeMedecinchirurgi(x[i].children[5].textContent);
                            LP.setcodeMedecinchirurgien(x[i].children[6].textContent);
                            LP.setcodePostop(x[i].children[7].textContent);
                            LP.setdateacte(x[0].children[8].textContent);
                            LP.setdatedemande(x[0].children[8].textContent);
                            LP.setetatReservationBloc(x[i].children[10].textContent);
                            LP.sethasAnesth(x[i].children[11].textContent);
                            LP.sethasPost(x[i].children[12].textContent);
                            LP.sethasPre(x[i].children[13].textContent);
                            hdebut = new Date(x[0].children[14].textContent);
                            minu = hdebut.getMinutes();
                            hour = hdebut.getHours();
                            second = hdebut.getSeconds();
                            LP.setheureDebut(hour + " : " + minu + " : " + second);
                            hfin = new Date(x[0].children[15].textContent);
                            minu = hfin.getMinutes();
                            hour = hfin.getHours();
                            second = hfin.getSeconds();
                            LP.setheureFin(hour + " : " + minu + " : " + second);
                            LP.setid(x[i].children[16].textContent);
                            LP.setidentifiant(x[i].children[17].textContent);
                            LP.setkc(x[i].children[18].textContent);
                            LP.setnom(x[i].children[19].textContent);
                            LP.setnomReanimateur(x[i].children[20].textContent);
                            LP.setnumeroDossier(x[i].children[21].textContent);
                            LP.setprenom(x[i].children[22].textContent);
                            _this.ListeP.push(LP);
                        }
                        if (_this.ListeP.length === 0) {
                            _this.ListPreanesthesieByNumeroDossierTest = false;
                        }
                    }
                    catch (Error) {
                        _this.ListPreanesthesieByNumeroDossierTest = false;
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    ListPreanesthesiePage = __decorate([
        core_1.Component({
            selector: 'page-list-preanesthesie',
            templateUrl: 'list-preanesthesie.html',
            providers: [variables_1.Variables]
        })
    ], ListPreanesthesiePage);
    return ListPreanesthesiePage;
}());
exports.ListPreanesthesiePage = ListPreanesthesiePage;
