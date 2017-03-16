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
import { NavParams } from 'ionic-angular';
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
var TabsPage = (function () {
    function TabsPage(navParams, Url) {
        this.navParams = navParams;
        this.Url = Url;
        this.tab1Root = DossierPage;
        this.tab2Root = ExamenRadioPage;
        this.tab3Root = ListPreanesthesiePage;
        this.tab4Root = ExamenLaboPage;
        this.LabosT = [];
        this.LabosF = [];
        this.GetExamenRadioByNumDossResponseTest = false;
        this.examenRT = [];
        this.examenRF = [];
        this.codeClinique = navParams.get("codeClinique");
        this.pass = navParams.get("mypatient");
        console.log("patient " + this.pass.getimg());
        this.coountexamenR = 0;
        this.coountexamenRT = 0;
        this.countPdfT = 0;
        this.countPdf = 0;
        var d = new Date();
        this.dat = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        this.tabLangue = {
            pass: navParams.get("mypatient"),
            dateFeuille: navParams.get("dateFeuille"),
            dat: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
            Labost: this.LabosT,
            Labosf: this.LabosF,
            examenRT: this.examenRT,
            examenRF: this.examenRF,
            langue: navParams.get("langue"),
            tabLangue: navParams.data.tabLangue.tabLangue, codeClinique: this.codeClinique
        };
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        this.findAllLaboByNumDossier(this.pass.getdossier(), this.codeClinique);
        this.GetExamenRadioByNumDossResponse(this.pass.getdossier(), this.codeClinique);
        ;
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
                        var tabgLabo = new tabBadge();
                        tabgLabo.setnumDoss(numDoss);
                        tabgLabo.setFichier(_this.countPdf);
                        tabgLabo.setFichierT(_this.countPdfT);
                        tabgLabo.setcodeClinique(codeClinique);
                        _this.LabosFs = new LaboFService();
                        _this.LabosFs.getLabos(_this.LabosF, numDoss, codeClinique);
                        _this.LabosTs = new LaboTService();
                        _this.LabosTs.getLabos(_this.LabosT, numDoss, codeClinique);
                        _this.countPdfs = new tabBadgeLaboService();
                        //      this.countPdfs.getTabBadgeLabo(, numDoss, this.countPdfT, this.countPdf, codeClinique);
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
    return TabsPage;
}());
TabsPage = __decorate([
    Component({
        selector: 'page-tabs',
        templateUrl: 'tabs.html',
        providers: [Variables]
    }),
    Injectable(),
    __metadata("design:paramtypes", [NavParams, Variables])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.js.map