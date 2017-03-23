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
<<<<<<< HEAD
import { ListPreanesthesie } from "../../models/ListPreanesthesie";
=======
import { HistDossier } from "../../models/HistDossier";
import { HistDossierService } from "../../services/HistDossierService";
>>>>>>> 4be4927213b1323428f917514734f104c677a059
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
        this.histD = [];
        this.histd = new HistDossier();
        this.ListeP = navParams.get("ListeP");
        this.pass = navParams.get("pass");
        this.codeClinique = navParams.get("codeClinique");
        this.langue = navParams.get("langue");
        if (Variables.checconnection() === "No network connection") {
            this.connection = false;
        }
        else {
            this.connection = true;
        }
        this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique);
    }
    ListPreanesthesiePage.prototype.ionViewDidLoad = function () {
    };
    ListPreanesthesiePage.prototype.historiqueOff = function (hist, numDoss, codeClinique) {
        var _this = this;
<<<<<<< HEAD
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
                            LP = new ListPreanesthesie();
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
=======
        this.histserv = new HistDossierService();
        this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(function (res) {
            _this.histd = res.getdate();
        });
>>>>>>> 4be4927213b1323428f917514734f104c677a059
    };
    return ListPreanesthesiePage;
}());
ListPreanesthesiePage = __decorate([
    Component({
        selector: 'page-list-preanesthesie',
        templateUrl: 'list-preanesthesie.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], ListPreanesthesiePage);
export { ListPreanesthesiePage };
//# sourceMappingURL=list-preanesthesie.js.map