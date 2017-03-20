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
import { Patient } from '../../models/Patient';
import { Variables } from "../../providers/variables";
import { TabsPage } from "../tabs/tabs";
import { DateFeuilleService } from "../../services/DateFeuilleService";
import { PatientService } from "../../services/PatientService";
import { DateFeuille } from "../../models/DateFeuille";
import { HistPatient } from "../../models/HistPatient";
import { HistPatientService } from "../../services/HistPatientService";
var ListePage = (function () {
    function ListePage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.patient = [];
        this.patientliste = [];
        this.datefeuille = [];
        this.hist = [];
        this.histl = new HistPatient();
        this.dtFeuille = new DateFeuille();
        this.codeClinique = navParams.get("codeClinique");
        console.log(navParams.get("tabLangue"));
        if (Variables.checconnection() === "No network connection") {
            this.connection = false;
            //     this.historiqueOff(this.hist, "admin", "", "all", this.codeClinique);
            this.listeOff(this.patient, "admin", "", "all", this.codeClinique);
            //    this.DateFeuilleOff(this.datefeuille, this.codeClinique);
        }
        else {
            this.connection = true;
            //    this.historique("admin", "", "all", this.codeClinique);
            this.liste("admin", "", "all", this.codeClinique);
            //   this.DateFeuille(this.codeClinique);
        }
        this.patientliste = this.patient;
    }
    ListePage.prototype.listee = function (user, searchText, etage, codeClinique) {
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
                    if (searchText === "")
                        searchText = "vide";
                    _this.patienserv = new PatientService();
                    _this.patienserv.verifPatient(_this.patient, user, searchText, etage, codeClinique).then(function (res) {
                        if (res === false) {
                            _this.patienserv.getPatients(_this.patient, user, searchText, etage, codeClinique);
                        }
                    });
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    ListePage.prototype.liste = function (user, searchText, etage, codeClinique) {
        var _this = this;
        var p = new Patient();
        p.setid("rr");
        p.setdossier("rr");
        p.setchambre("rr");
        p.setprenom("rr");
        p.setnom("rr");
        p.setdateNaiss("rr");
        p.setmedecin("rr");
        p.setspec("rr");
        p.setetat("rr");
        p.setnature("sur");
        p.setage(22);
        p.setimg("babyboy.png");
        this.patient.push(p);
        if (searchText === "")
            searchText = "vide";
        this.patienserv = new PatientService();
        this.patienserv.verifPatient(this.patient, user, searchText, etage, codeClinique).then(function (res) {
            if (res === false) {
                _this.patienserv.getPatients(_this.patient, user, searchText, etage, codeClinique);
            }
        });
    };
    ListePage.prototype.listeOff = function (patient, user, searchText, etage, codeClinique) {
        if (searchText === "")
            searchText = "vide";
        this.patienserv = new PatientService();
        this.patient = this.patienserv.getPatients(patient, user, searchText, etage, codeClinique);
        this.patientliste = this.patient;
    };
    ListePage.prototype.DateFeuille = function (codeClinique) {
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
                    for (i = 0; i < x.length; i++) {
                        d = new DateFeuille();
                        d.setdatefeuille(x[i].childNodes[0].nodeValue);
                        _this.datefeuille.push(d);
                    }
                    _this.dtFeuilleserv = new DateFeuilleService();
                    _this.dtFeuilleserv.verifDateFeuille(codeClinique).then(function (res) {
                        if (res === false) {
                            _this.dtFeuilleserv.getDateFeuille(_this.datefeuille, codeClinique);
                        }
                    });
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    ListePage.prototype.DateFeuilleOff = function (datefeuille, codeClinique) {
        this.dtFeuilleserv = new DateFeuilleService();
        this.datefeuille = this.dtFeuilleserv.getDateFeuille(this.datefeuille, codeClinique);
    };
    ListePage.prototype.goToDossierPage = function (patient) {
        this.tabLangue = {
            tabLangue: this.navParams.data.tabLangue.tabLangue,
        };
        this.navCtrl.push(TabsPage, {
            tabLangue: this.tabLangue, langue: this.navParams.get("langue"), mypatient: patient,
            dateFeuille: this.datefeuille[0].getdatefeuille(), codeClinique: this.codeClinique
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
    ListePage.prototype.deleteListe = function (user, searchText, etage, codeClinique) {
        this.patienserv = new PatientService();
        this.patienserv.deletePatients(user, searchText, etage, codeClinique);
    };
    ListePage.prototype.deleteDateFeuille = function (codeClinique) {
        this.dtFeuilleserv = new DateFeuilleService();
        this.dtFeuilleserv.deleteDateFeuille(codeClinique);
    };
    ListePage.prototype.doRefresh = function (refresher, codeClinique) {
        this.historique("admin", "", "all", codeClinique);
        this.deleteListe("admin", "", "all", codeClinique);
        this.liste("admin", "", "all", codeClinique);
        this.deleteDateFeuille(codeClinique);
        this.DateFeuille(codeClinique);
        setTimeout(function () {
            //   alert('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    ListePage.prototype.historique = function (user, searchText, etage, codeClinique) {
        var _this = this;
        this.histserv = new HistPatientService();
        var h = new HistPatient();
        var d = new Date();
        h.setuser(user);
        h.setsearchText(searchText);
        h.setetage(etage);
        h.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
        h.setcodeClinique(codeClinique);
        this.hist.push(h);
        try {
            this.histserv.deleteHistPatients(user, searchText, etage, codeClinique);
            this.histserv.getHistPatients(this.hist, user, searchText, etage, codeClinique).then(function (res) {
                _this.histl = res.getdate();
            });
        }
        catch (Error) {
            this.histserv.getHistPatients(this.hist, user, searchText, etage, codeClinique).then(function (res) {
                _this.histl = res.getdate();
            });
        }
    };
    ListePage.prototype.historiqueOff = function (hist, user, searchText, etage, codeClinique) {
        var _this = this;
        this.histserv = new HistPatientService();
        this.histserv.getHistPatients(hist, user, searchText, etage, codeClinique).then(function (res) {
            _this.histl = res.getdate();
        });
    };
    return ListePage;
}());
ListePage = __decorate([
    Component({
        selector: 'page-liste',
        templateUrl: 'liste.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], ListePage);
export { ListePage };
//# sourceMappingURL=liste.js.map