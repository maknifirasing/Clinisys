"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var dossier_1 = require("../dossier/dossier");
var examen_radio_1 = require("../examen-radio/examen-radio");
var list_preanesthesie_1 = require("../list-preanesthesie/list-preanesthesie");
var examen_labo_1 = require("../examen-labo/examen-labo");
var variables_1 = require("../../providers/variables");
var Labo_1 = require("../../models/Labo");
var ExamenRadio_1 = require("../../models/ExamenRadio");
var TabsPage = (function () {
    function TabsPage(navParams, Url) {
        this.navParams = navParams;
        this.Url = Url;
        this.tab1Root = dossier_1.DossierPage;
        this.tab2Root = examen_radio_1.ExamenRadioPage;
        this.tab3Root = list_preanesthesie_1.ListPreanesthesiePage;
        this.tab4Root = examen_labo_1.ExamenLaboPage;
        this.LabosT = [];
        this.LabosF = [];
        this.GetExamenRadioByNumDossResponseTest = false;
        this.examenRT = [];
        this.examenRF = [];
        this.pass = navParams.get("mypatient");
        this.coountexamenR = 0;
        this.coountexamenRT = 0;
        this.countPdfT = 0;
        this.countPdf = 0;
        var d = new Date();
        this.dat = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        if (navParams.data.lang.langue === "arabe") {
            this.tab1 = "الصفحة الرئيسية";
            this.tab2 = "مراجعة الراديو";
            this.tab3 = "قائمة ما قبل التخدير";
            this.tab4 = "مراجعة المختبر";
            this.titreSortie = "المخرجات";
            this.titreAlert = "التنبيهات";
            this.titreMaladie = "تاريخ المرض";
            this.titreClini = "الفحص السريري";
            this.titreEvo = "تطور";
            this.titreConclu = "استنتاج";
            this.titreRegime = "حمية";
            this.titreDemande = "تاريخ تقديم الطلب";
            this.titreExamen = "مراجعة";
            this.titreAct = "حدث";
            this.titreChi = "الجراح";
            this.titreDateAct = "تاريخ الحدث";
            this.titreHeureDeb = "وقت البدء";
            this.titreHeureF = "نهاية الوقت";
            this.titleMed = "الطبيب";
        }
        else if (navParams.data.lang.langue === "francais") {
            this.tab1 = "Page principale";
            this.tab2 = "Revue de Radio";
            this.tab3 = "La liste des pré-anesthésie";
            this.tab4 = "Examen du laboratoire";
            this.titreSortie = "Sorties";
            this.titreAlert = "Alertes";
            this.titreMaladie = "Histoire de Maladie";
            this.titreClini = "Examen Clinique";
            this.titreEvo = "Évolution";
            this.titreConclu = "Conclusion";
            this.titreRegime = "Régime";
            this.titreDemande = "Date demande";
            this.titreExamen = "Examen";
            this.titreAct = "Acte";
            this.titreChi = "Chirurgien";
            this.titreDateAct = "Date Acte";
            this.titreHeureDeb = "Heure Début";
            this.titreHeureF = "Heure Fin";
            this.titleMed = "Medecin";
        }
        else if (navParams.data.lang.langue === "anglais") {
            this.tab1 = "Main page";
            this.tab2 = "Review of Radio";
            this.tab3 = "The list of pre-anesthesia";
            this.tab4 = "Laboratory Review";
            this.titreSortie = "Outputs";
            this.titreAlert = "Alerts";
            this.titreMaladie = "History of Disease";
            this.titreClini = "Clinic Review";
            this.titreEvo = "Evolution";
            this.titreConclu = "Conclusion";
            this.titreRegime = "Diet";
            this.titreDemande = "The date of application";
            this.titreExamen = "Review";
            this.titreAct = "Act";
            this.titreChi = "Surgeon";
            this.titreDateAct = "Act date";
            this.titreHeureDeb = "Start Time";
            this.titreHeureF = "Time End";
            this.titleMed = "Doctor";
        }
        this.chatParams = {
            pass: navParams.get("mypatient"),
            dateFeuille: navParams.get("dateFeuille"),
            dat: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
            Labost: this.LabosT,
            Labosf: this.LabosF,
            examenRT: this.examenRT,
            examenRF: this.examenRF,
            age: navParams.data.lang.age,
            ch: navParams.data.lang.ch,
            titreEnligne: navParams.data.lang.titreEnligne,
            titreMotif: this.navParams.data.lang.titreMotif,
            titreAnt: this.navParams.data.lang.titreAnt,
            titreAll: this.navParams.data.lang.titreAll,
            titreSigneV: this.navParams.data.lang.titreSigneV,
            titreEnt: this.navParams.data.lang.titreEnt,
            titreTrait: this.navParams.data.lang.titreTrait,
            titreSortie: this.titreSortie,
            titreAlert: this.titreAlert,
            titreMaladie: this.titreMaladie,
            titreClini: this.titreClini,
            titreEvo: this.titreEvo,
            titreConclu: this.titreConclu,
            titreRegime: this.titreRegime,
            titreDemande: this.titreDemande,
            titreExamen: this.titreExamen,
            titreAct: this.titreAct,
            titreChi: this.titreChi,
            titreDateAct: this.titreDateAct,
            titreHeureDeb: this.titreHeureDeb,
            titreHeureF: this.titreHeureF,
            titleMed: this.titleMed
        };
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        this.findAllLaboByNumDossier(this.pass.getdossier());
        this.GetExamenRadioByNumDossResponse(this.pass.getdossier());
        console.log("getDoss ", this.pass.getdossier());
    };
    TabsPage.prototype.GetExamenRadioByNumDossResponse = function (numDoss) {
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
                            ex = new ExamenRadio_1.ExamenRadio();
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
                        console.log("emchi", _this.coountexamenRT);
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
    TabsPage.prototype.findAllLaboByNumDossier = function (numDoss) {
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
                            l = new Labo_1.Labo();
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
                            if (l.getcontenuePDF() === "true") {
                                _this.LabosT.push(l);
                                _this.countPdfT++;
                            }
                            else if (l.getcontenuePDF() === "false") {
                                _this.LabosF.push(l);
                            }
                        }
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
    TabsPage = __decorate([
        core_1.Component({
            selector: 'page-tabs',
            templateUrl: 'tabs.html',
            providers: [variables_1.Variables]
        }),
        core_1.Injectable()
    ], TabsPage);
    return TabsPage;
}());
exports.TabsPage = TabsPage;
