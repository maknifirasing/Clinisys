var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Injectable } from '@angular/core';
import { DossierPage } from "../dossier/dossier";
import { NavParams, Platform } from 'ionic-angular';
import { ExamenRadioPage } from "../examen-radio/examen-radio";
import { ListPreanesthesiePage } from "../list-preanesthesie/list-preanesthesie";
import { ExamenLaboPage } from "../examen-labo/examen-labo";
import { Variables } from "../../providers/variables";
import { Labo } from "../../models/Labo";
import { ExamenRadio } from "../../models/ExamenRadio";
import { LaboFService } from "../../services/LaboFService";
import { LaboTService } from "../../services/LaboTService";
import { tabBadgeLaboService } from "../../services/tabBadgeLaboService";
import { tabBadge } from "../../models/tabBadge";
import { ExamenRadioTService } from "../../services/ExamenRadioTService";
import { ExamenRadioFService } from "../../services/ExamenRadioFService";
import { tabBadgeRadioService } from "../../services/tabBadgeRadioService";
import { ListPreanesthesie } from "../../models/ListPreanesthesie";
import { ListPreanesthesieService } from "../../services/ListPreanesthesieService";
import { tabBadgeListPreanesthesie } from "../../services/tabBadgeListPreanesthesie";
var TabsPage = (function () {
    function TabsPage(navParams, Url, platform) {
        var _this = this;
        this.navParams = navParams;
        this.Url = Url;
        this.platform = platform;
        this.tab1Root = DossierPage;
        this.tab2Root = ExamenRadioPage;
        this.tab3Root = ListPreanesthesiePage;
        this.tab4Root = ExamenLaboPage;
        this.tabgLabo = [];
        this.tabgRadio = [];
        this.ListPreanesthesies = [];
        this.LabosT = [];
        this.LabosF = [];
        this.GetExamenRadioByNumDossResponseTest = false;
        this.examenRT = [];
        this.examenRF = [];
        this.ListPreanesthesieByNumeroDossierTest = false;
        this.ListeP = [];
        this.codeClinique = navParams.get("codeClinique");
        this.pass = navParams.get("mypatient");
        this.tabLangue = navParams.get("tabLangue");
        this.langue = navParams.get("langue");
        this.coountexamenR = 0;
        this.coountexamenRT = 0;
        this.coountListPreanesthesie = 0;
        this.countPdfT = 0;
        this.countPdf = 0;
        this.tabLangue = {
            pass: navParams.get("mypatient"),
            dateFeuille: navParams.get("dateFeuille"),
            Labost: this.LabosT,
            Labosf: this.LabosF,
            ListeP: this.ListeP,
            examenRT: this.examenRT,
            examenRF: this.examenRF,
            langue: this.langue,
            tabLangue: this.tabLangue, codeClinique: this.codeClinique
        };
        this.platform.ready().then(function () {
            Variables.checconnection().then(function (connexion) {
                if (connexion === false) {
                    _this.connection = false;
                    _this.findAllLaboByNumDossierOff(_this.pass.getdossier(), _this.codeClinique);
                    _this.GetExamenRadioByNumDossResponseOff(_this.pass.getdossier(), _this.codeClinique);
                    _this.findListPreanesthesieByNumeroDossierResponseOff(_this.pass.getdossier(), _this.codeClinique);
                }
                else {
                    _this.connection = true;
                    _this.findAllLaboByNumDossier(_this.pass.getdossier(), _this.codeClinique);
                    _this.GetExamenRadioByNumDossResponse(_this.pass.getdossier(), _this.codeClinique);
                    _this.findListPreanesthesieByNumeroDossierResponse(_this.pass.getdossier(), _this.codeClinique);
                }
            });
        });
    }
    TabsPage.prototype.ionViewDidLoad = function () {
    };
    TabsPage.prototype.GetExamenRadioByNumDossResponse = function (numDoss, codeClinique) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:GetExamenRadioByNumDoss>' +
            '<numDoss>' + numDoss + '</numDoss>' +
            '</ser:GetExamenRadioByNumDoss>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        _this.GetExamenRadioByNumDossResponseTest = true;
                        var xml = xmlhttp.responseXML;
                        var x, i, dE, dP, drdv, hP;
                        x = xml.getElementsByTagName("return");
                        var ex;
                        var day = "";
                        var month = "";
                        var year = "";
                        var minu = "";
                        var second = "";
                        var hour = "";
                        _this.coountexamenR = x.length;
                        for (i = 0; i < x.length; i++) {
                            ex = new ExamenRadio();
                            ex.setcodeExamen(x[i].children[0].textContent);
                            ex.setcompterendu(x[i].children[1].textContent);
                            dE = new Date(x[i].children[2].textContent);
                            day = dE.getDate();
                            month = dE.getMonth() + 1;
                            year = dE.getFullYear();
                            ex.setdateExamen(day + "/" + month + "/" + year);
                            dP = new Date(x[i].children[3].textContent);
                            day = dP.getDate();
                            month = dP.getMonth() + 1;
                            year = dP.getFullYear();
                            ex.setdatePrevu(day + "/" + month + "/" + year);
                            drdv = new Date(x[i].children[4].textContent);
                            day = drdv.getDate();
                            month = drdv.getMonth() + 1;
                            year = drdv.getFullYear();
                            ex.setdate_RDV(day + "/" + month + "/" + year);
                            ex.setdesignationExamen(x[i].children[5].textContent);
                            hP = new Date(x[i].children[6].textContent);
                            minu = hP.getMinutes();
                            hour = hP.getHours();
                            second = hP.getSeconds();
                            ex.setheurePrevu(hour + " : " + minu + " : " + second);
                            ex.setidres(x[i].children[7].textContent);
                            if (x[i].childElementCount === 14) {
                                ex.setmedecin(x[i].children[8].textContent);
                                ex.setnature(x[i].children[9].textContent);
                                ex.setnumeroDossier(x[i].children[10].textContent);
                                ex.setnumeroExamen(x[i].children[11].textContent);
                                ex.setobserv(x[i].children[12].textContent);
                                ex.setresultat(x[i].children[13].textContent);
                            }
                            else if (x[i].childElementCount === 13) {
                                ex.setmedecin(null);
                                ex.setnature(x[i].children[8].textContent);
                                ex.setnumeroDossier(x[i].children[9].textContent);
                                ex.setnumeroExamen(x[i].children[10].textContent);
                                ex.setobserv(x[i].children[11].textContent);
                                ex.setresultat(x[i].children[12].textContent);
                            }
                            if (ex.getcompterendu() === "true") {
                                _this.examenRT.push(ex);
                                _this.coountexamenRT++;
                            }
                            else if (ex.getcompterendu() === "false") {
                                _this.examenRF.push(ex);
                            }
                        }
                        if (_this.examenRT.length === 0 && _this.examenRF.length === 0) {
                            _this.GetExamenRadioByNumDossResponseTest = false;
                        }
                        var tRadio = new tabBadge();
                        tRadio.setnumDoss(numDoss);
                        tRadio.setFichier(_this.coountexamenR);
                        tRadio.setFichierT(_this.coountexamenRT);
                        tRadio.setcodeClinique(codeClinique);
                        _this.tabgRadio.push(tRadio);
                        _this.RadiosFs = new ExamenRadioFService();
                        _this.RadiosFs.verifExamenRadio(_this.examenRF, numDoss, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.RadiosFs.getExamenRadios(_this.examenRF, numDoss, codeClinique);
                            }
                        });
                        _this.RadiosTs = new ExamenRadioTService();
                        _this.RadiosTs.verifExamenRadio(_this.examenRT, numDoss, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.RadiosTs.getExamenRadios(_this.examenRT, numDoss, codeClinique);
                            }
                        });
                        _this.countDocs = new tabBadgeRadioService();
                        _this.countDocs.verifTabBadgeRadio(numDoss, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.countDocs.getTabBadgeRadio(_this.tabgRadio, numDoss, codeClinique);
                            }
                        });
                    }
                    catch (Error) {
                        _this.GetExamenRadioByNumDossResponseTest = false;
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    TabsPage.prototype.GetExamenRadioByNumDossResponseOff = function (numDoss, codeClinique) {
        var _this = this;
        this.countDocs = new tabBadgeRadioService();
        this.countDocs.getTabBadgeRadio(this.tabgRadio, numDoss, codeClinique).then(function (res) {
            _this.coountexamenR = res.getFichier();
            _this.coountexamenRT = res.getFichierT();
        });
    };
    TabsPage.prototype.findAllLaboByNumDossier = function (numDoss, codeClinique) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:findAllLaboByNumDossier>' +
            '<numDoss>' + numDoss + '</numDoss>' +
            '</ser:findAllLaboByNumDossier>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        var xml = xmlhttp.responseXML;
                        var x, l, i, drdv;
                        x = xml.getElementsByTagName("return");
                        var day = "";
                        var month = "";
                        var year = "";
                        _this.countPdf = x.length;
                        for (i = 0; i < x.length; i++) {
                            l = new Labo();
                            l.setcodeDemande(x[i].children[0].textContent);
                            l.setcontenuePDF(x[i].children[1].textContent);
                            drdv = new Date(x[i].children[2].textContent);
                            day = drdv.getDate();
                            month = drdv.getMonth() + 1;
                            year = drdv.getFullYear();
                            l.setdateDemande(day + "/" + month + "/" + year);
                            drdv = new Date(x[i].children[3].textContent);
                            day = drdv.getDate();
                            month = drdv.getMonth() + 1;
                            year = drdv.getFullYear();
                            l.setdateRealisation(day + "/" + month + "/" + year);
                            l.setdesignation(x[i].children[4].textContent);
                            l.setetatExamen(x[i].children[5].textContent);
                            l.setid(x[i].children[6].textContent);
                            l.setmedecinTraitant(x[i].children[7].textContent);
                            l.setnomLabo(x[i].children[8].textContent);
                            l.setnumAdmission(x[i].children[9].textContent);
                            l.setnumDossier(x[i].children[10].textContent);
                            l.setpatient(x[i].children[11].textContent);
                            l.setstate(x[i].children[12].textContent);
                            l.setuserName(x[i].children[13].textContent);
                            l.setvalidation(x[i].children[14].textContent);
                            l.setpdf(_this.Url.url + "dmi-web/LaboPDF/" + l.getnumAdmission() + "0.pdf");
                            if (l.getcontenuePDF() === "true") {
                                _this.LabosT.push(l);
                                _this.countPdfT++;
                            }
                            else if (l.getcontenuePDF() === "false") {
                                _this.LabosF.push(l);
                            }
                        }
                        var tLabo = new tabBadge();
                        tLabo.setnumDoss(numDoss);
                        tLabo.setFichier(_this.countPdf);
                        tLabo.setFichierT(_this.countPdfT);
                        tLabo.setcodeClinique(codeClinique);
                        _this.tabgLabo.push(tLabo);
                        _this.LabosFs = new LaboFService();
                        _this.LabosFs.verifLabo(_this.LabosF, numDoss, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.LabosFs.getLabos(_this.LabosF, numDoss, codeClinique);
                            }
                        });
                        _this.LabosTs = new LaboTService();
                        _this.LabosTs.verifLabo(_this.LabosT, numDoss, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.LabosTs.getLabos(_this.LabosT, numDoss, codeClinique);
                            }
                        });
                        _this.countPdfs = new tabBadgeLaboService();
                        _this.countPdfs.verifTabBadgeLabo(numDoss, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.countPdfs.getTabBadgeLabo(_this.tabgLabo, numDoss, codeClinique);
                            }
                        });
                    }
                    catch (Error) {
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    TabsPage.prototype.findAllLaboByNumDossierOff = function (numDoss, codeClinique) {
        var _this = this;
        this.countPdfs = new tabBadgeLaboService();
        this.countPdfs.getTabBadgeLabo(this.tabgLabo, numDoss, codeClinique).then(function (res) {
            _this.countPdf = res.getFichier();
            _this.countPdfT = res.getFichierT();
        });
    };
    TabsPage.prototype.findListPreanesthesieByNumeroDossierResponse = function (numDoss, codeClinique) {
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
                            _this.coountListPreanesthesie++;
                            _this.ListeP.push(LP);
                        }
                        if (_this.ListeP.length === 0) {
                            _this.ListPreanesthesieByNumeroDossierTest = false;
                        }
                        else {
                            _this.ListePserv = new ListPreanesthesieService();
                            _this.ListePserv.verifListPreanesthesie(_this.ListeP, numDoss, codeClinique).then(function (res) {
                                if (res === false) {
                                    _this.ListePserv.getListPreanesthesies(_this.ListeP, numDoss, codeClinique);
                                }
                            });
                        }
                        var tList = new tabBadge();
                        tList.setnumDoss(numDoss);
                        tList.setFichier(_this.coountListPreanesthesie);
                        tList.setFichierT(0);
                        tList.setcodeClinique(codeClinique);
                        _this.ListPreanesthesies.push(tList);
                        _this.countListPreanesthesiess = new tabBadgeListPreanesthesie();
                        _this.countListPreanesthesiess.verifTabBadgeList(numDoss, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.countListPreanesthesiess.getTabBadgeList(_this.ListPreanesthesies, numDoss, codeClinique);
                            }
                        });
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
    TabsPage.prototype.findListPreanesthesieByNumeroDossierResponseOff = function (numDoss, codeClinique) {
        var _this = this;
        this.countListPreanesthesiess = new tabBadgeListPreanesthesie();
        this.countListPreanesthesiess.getTabBadgeList(this.ListPreanesthesies, numDoss, codeClinique).then(function (res) {
            _this.coountListPreanesthesie = res.getFichier();
        });
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Component({
        selector: 'page-tabs',
        templateUrl: 'tabs.html',
        providers: [Variables]
    }),
    Injectable(),
    __metadata("design:paramtypes", [NavParams, Variables, Platform])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.js.map