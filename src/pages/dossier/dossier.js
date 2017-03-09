"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var motifHospitalisation_1 = require('../../models/motifHospitalisation');
var Antec_1 = require('../../models/Antec');
var SigneClinique_1 = require('../../models/SigneClinique');
var Traitement_1 = require("../../models/Traitement");
var Evenement_1 = require("../../models/Evenement");
var Rigime_1 = require("../../models/Rigime");
var variables_1 = require("../../providers/variables");
var DossierPage = (function () {
    function DossierPage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.m = new motifHospitalisation_1.MotifHospitalisation();
        this.antec = [];
        this.signe = [];
        this.AlerteSigneCliniqueTest = false;
        this.AntecedentAllergieTest = false;
        this.stringAlerg = "";
        this.stringAntec = "";
        this.Alerg = false;
        this.Ante = false;
        this.traitement = [];
        this.Histoiremaladie = [];
        this.Evolution = [];
        this.Examenclinique = [];
        this.Conclusion = [];
        this.signec = [];
        this.Entrees = [];
        this.Sorties = [];
    }
    DossierPage.prototype.ionViewDidLoad = function () {
        this.GetAllMotifHospitalisationByNumDoss(this.navParams.data.pass.getdossier());
        this.getAntecedentAllergieByIdentifiant(this.navParams.data.pass.getid());
        this.GetAlerteSigneClinique(this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille, this.navParams.data.pass.getnature());
        this.GetTraitements(this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille);
        this.GetEvenementByDossier(this.navParams.data.pass.getdossier());
        this.GetListRegime(this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille, this.navParams.data.pass.getnature());
        if (this.navParams.data.pass.getnature() === "REA") {
            this.codeType = "'1','G','L','E','7','I','9','A','3'";
        }
        else if (this.navParams.data.pass.getnature() === "sur") {
            this.codeType = "'1','3','4'";
        }
        this.GetSigneClinique(this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille, this.navParams.data.pass.getnature(), this.codeType);
    };
    DossierPage.prototype.GetAlerteSigneClinique = function (numDoss, dateFeuille, nature) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '  <ser:GetAlerteSigneClinique>' +
            '<numdoss>' + numDoss + '</numdoss>' +
            '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
            '<nature>' + nature + '</nature>' +
            '</ser:GetAlerteSigneClinique>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        _this.AlerteSigneCliniqueTest = true;
                        var xml = xmlhttp.responseXML;
                        var x, i;
                        x = xml.getElementsByTagName("return");
                        var s;
                        for (i = 0; i < x.length; i++) {
                            s = new SigneClinique_1.SigneClinique();
                            s.setcodeType(x[i].children[0].textContent);
                            s.setdate(x[i].children[1].textContent);
                            s.setdesignation(x[i].children[2].textContent);
                            s.setquantite(x[i].children[3].textContent);
                            _this.signe.push(s);
                        }
                        if (_this.signe.length === 0) {
                            _this.AlerteSigneCliniqueTest = false;
                        }
                    }
                    catch (Error) {
                        _this.AlerteSigneCliniqueTest = false;
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    DossierPage.prototype.getAntecedentAllergieByIdentifiant = function (id) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '  <ser:getAntecedentAllergieByIdentifiant>' +
            '<identifiant>' + id + '</identifiant>' +
            '</ser:getAntecedentAllergieByIdentifiant>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        _this.AntecedentAllergieTest = true;
                        _this.disig = "";
                        var xml = xmlhttp.responseXML;
                        var x, i;
                        x = xml.getElementsByTagName("return");
                        var a;
                        for (i = 0; i < x.length; i++) {
                            a = new Antec_1.Antec();
                            a.setcodeAntecedent(x[i].children[0].children[0].textContent);
                            a.setcodeFamille(x[i].children[0].children[1].textContent);
                            a.setdesignation(x[i].children[0].children[2].textContent);
                            a.setidDetailAntec(x[i].children[0].children[3].textContent);
                            a.setordre(x[i].children[0].children[4].textContent);
                            a.setvisiblePreAnes(x[i].children[0].children[5].textContent);
                            a.setid(x[i].children[1].textContent);
                            a.setidentifiant(x[i].children[2].textContent);
                            a.setnumeroDossier(x[i].children[3].textContent);
                            a.setobservation(x[i].children[4].textContent);
                            a.setutilisateurAnt(x[i].children[5].textContent);
                            /* if (i === x.length - 1)
                             this.disig += a.getdesignation();
                             else
                             this.disig += a.getdesignation() + ", ";*/
                            if (!(a.getcodeAntecedent() === ("A000")) && (!(a.getcodeAntecedent() === ("A255")))) {
                                if (a.getcodeFamille() === ("FA02")) {
                                    if (a.getcodeAntecedent().toUpperCase() === ("ALER")) {
                                        _this.stringAlerg += a.getobservation() + ", ";
                                        _this.Alerg = true;
                                    }
                                    else {
                                        _this.stringAlerg += a.getdesignation() + ", ";
                                        _this.Alerg = true;
                                    }
                                }
                                else {
                                    if (a.getcodeFamille().toUpperCase() === ("AUTR")) {
                                        _this.stringAntec += a.getobservation() + ", ";
                                        _this.Ante = true;
                                    }
                                    else {
                                        _this.stringAntec += a.getdesignation() + ", ";
                                        _this.Ante = true;
                                    }
                                }
                            }
                            _this.antec.push(a);
                        }
                        if (_this.antec.length === 0) {
                            _this.AntecedentAllergieTest = false;
                        }
                    }
                    catch (Error) {
                        _this.AntecedentAllergieTest = false;
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    DossierPage.prototype.GetAllMotifHospitalisationByNumDoss = function (numDoss) {
        var _this = this;
        this.test = false;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:GetAllMotifHospitalisationByNumDoss>' +
            '<numDoss>' + numDoss + '</numDoss>' +
            '</ser:GetAllMotifHospitalisationByNumDoss>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        _this.test = true;
                        var xml = xmlhttp.responseXML;
                        var x, drdv, dsortie, hrdv, hsortie;
                        var day = "";
                        var month = "";
                        var year = "";
                        var minu = "";
                        var second = "";
                        var hour = "";
                        x = xml.getElementsByTagName("return");
                        _this.m.setconclusion(x[0].children[0].textContent);
                        drdv = new Date(x[0].children[1].textContent);
                        day = drdv.getDate();
                        month = drdv.getMonth() + 1;
                        year = drdv.getFullYear();
                        _this.m.setdateRdv(day + "/" + month + "/" + year);
                        dsortie = new Date(x[0].children[2].textContent);
                        day = dsortie.getDate();
                        month = dsortie.getMonth() + 1;
                        year = dsortie.getFullYear();
                        _this.m.setdateSortie(day + "/" + month + "/" + year);
                        _this.m.setgroupeSang(x[0].children[3].textContent);
                        hrdv = new Date(x[0].children[4].textContent);
                        minu = hrdv.getMinutes();
                        hour = hrdv.getHours();
                        second = hrdv.getSeconds();
                        _this.m.setheureRdv(hour + " : " + minu + " : " + second);
                        hsortie = new Date(x[0].children[5].textContent);
                        minu = hrdv.getMinutes();
                        hour = hrdv.getHours();
                        second = hrdv.getSeconds();
                        _this.m.setheureSortie(hour + " : " + minu + " : " + second);
                        _this.m.sethistoiremaladie(x[0].children[6].textContent);
                        _this.m.setmotifhospitalisation(x[0].children[7].textContent);
                        _this.m.setnumdoss(x[0].children[8].textContent);
                        _this.m.setobservationSejour(x[0].children[9].textContent);
                        _this.m.setpoid(x[0].children[10].textContent);
                        _this.m.settaille(x[0].children[11].textContent);
                        _this.m.settraitementHabituelle(x[0].children[12].textContent);
                        _this.m.settraitementSejour(x[0].children[13].textContent);
                        _this.m.settraitementSortie(x[0].children[14].textContent);
                        _this.m.setutilisateurMotif(x[0].children[15].textContent);
                        if (_this.m === null) {
                            _this.test = false;
                        }
                        return _this.m;
                    }
                    catch (Error) {
                        _this.test = false;
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    DossierPage.prototype.GetTraitements = function (numdoss, datefeuille) {
        var _this = this;
        this.trait = false;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/ReaWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:findPrescriptionByNumDossAndDate>' +
            '<numdoss>' + numdoss + '</numdoss>' +
            '<datefeuille>' + datefeuille + '</datefeuille>' +
            '</ser:findPrescriptionByNumDossAndDate>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        _this.trait = true;
                        var xml = xmlhttp.responseXML;
                        var x, t, i;
                        x = xml.getElementsByTagName("return");
                        for (i = 0; i < x.length; i++) {
                            t = new Traitement_1.Traitement();
                            /*
                             t.setcodePosologie(x[i].children[0].textContent);
                             t.setdate(x[i].children[1].textContent);
                             t.setdateFinTrait(x[i].children[2].textContent);
                             t.setdci(x[i].children[3].textContent);
                             t.setdesignation(x[i].children[4].textContent);
                             t.setdureEnJour(x[i].children[5].textContent);
                             t.setheure(x[i].children[6].textContent);
                             t.setheureDebut(x[i].children[7].textContent);
                             t.setjour(x[i].children[8].textContent);
                             t.setnbFois(x[i].children[9].textContent);
                             t.setnumDoss(x[i].children[10].textContent);
                             t.setnumTraitement(x[i].children[11].textContent);
                             t.setnumbon(x[i].children[12].textContent);
                             t.setposologie(x[i].children[13].textContent);
                             t.setprescripteur(x[i].children[14].textContent);
                             t.setquantite(x[i].children[15].textContent);
                             t.setunite(x[i].children[16].textContent);
                             t.setvitesse(x[i].children[17].textContent);
                             t.setvoie(x[i].children[18].textContent);
                             t.setvolume(x[i].children[19].textContent);
                             */
                            if (x[i].childElementCount === 20) {
                                t.setdesignation(x[i].children[4].textContent);
                                t.setposologie(x[i].children[13].textContent);
                                t.setjour(x[i].children[8].textContent);
                            }
                            else if (x[i].childElementCount === 19) {
                                t.setdesignation(x[i].children[3].textContent);
                                t.setposologie(x[i].children[12].textContent);
                                t.setjour(x[i].children[7].textContent);
                            }
                            _this.traitement.push(t);
                        }
                        if (_this.traitement.length === 0) {
                            _this.trait = false;
                        }
                    }
                    catch (Error) {
                        _this.trait = false;
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    DossierPage.prototype.convertHTMLtoRTF = function (rtf) {
        rtf = rtf.replace(/\\par[d]?/g, "");
        return rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "").trim();
    };
    DossierPage.prototype.GetEvenementByDossier = function (numdoss) {
        var _this = this;
        this.His = false;
        this.Exa = false;
        this.Con = false;
        this.Evo = false;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:GetEvenementByDossier>' +
            '<numdoss>' + numdoss + '</numdoss>' +
            '</ser:GetEvenementByDossier>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        _this.trait = true;
                        var xml = xmlhttp.responseXML;
                        var x, e, i, drdv;
                        x = xml.getElementsByTagName("return");
                        var day = "";
                        var month = "";
                        var year = "";
                        var minu = "";
                        var hour = "";
                        for (i = 0; i < x.length; i++) {
                            e = new Evenement_1.Evenement();
                            e.setaccess(x[i].children[0].textContent);
                            e.setcode(x[i].children[1].children[0].textContent);
                            e.setevenements(x[i].children[1].children[1].textContent);
                            e.setorderEvenement(x[i].children[1].children[2].textContent);
                            e.setvisible(x[i].children[1].children[3].textContent);
                            drdv = new Date(x[i].children[2].textContent);
                            day = drdv.getDay();
                            month = drdv.getMonth();
                            year = drdv.getFullYear();
                            minu = drdv.getMinutes();
                            hour = drdv.getHours();
                            e.setdate(day + "/" + month + "/" + year + " - " + hour + ":" + minu);
                            e.setdetail(_this.convertHTMLtoRTF(x[i].children[3].textContent));
                            e.setIDEvenement(x[i].children[4].textContent);
                            e.setnumdoss(x[i].children[5].textContent);
                            e.setuserCreat(x[i].children[6].textContent);
                            if (e.getevenements() === "Evolution") {
                                _this.Evolution.push(e);
                                _this.Evo = true;
                            }
                            if (e.getevenements() === "Histoire de la maladie") {
                                _this.Histoiremaladie.push(e);
                                _this.His = true;
                            }
                            if (e.getevenements() === "Examen clinique") {
                                _this.Examenclinique.push(e);
                                _this.Exa = true;
                            }
                            if (e.getevenements() === "Conclusion") {
                                _this.Conclusion.push(e);
                                _this.Con = true;
                            }
                        }
                        if (_this.Conclusion.length === 0) {
                            _this.Con = false;
                        }
                        if (_this.Examenclinique.length === 0) {
                            _this.Exa = false;
                        }
                        if (_this.Histoiremaladie.length === 0) {
                            _this.His = false;
                        }
                        if (_this.Evolution.length === 0) {
                            _this.Evo = false;
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
    DossierPage.prototype.GetListRegime = function (numdoss, datefeuille, nature) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        this.Ri = false;
        xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:GetListRegime>' +
            '<numdoss>' + numdoss + '</numdoss>' +
            '<dateFeuille>' + datefeuille + '</dateFeuille>' +
            '<nature>' + nature + '</nature>' +
            '</ser:GetListRegime>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        var xml = xmlhttp.responseXML;
                        var x, r;
                        r = new Rigime_1.Rigime();
                        x = xml.getElementsByTagName("return");
                        r.setcodeRegime(x[0].children[0].textContent);
                        r.setdesignation(x[0].children[1].textContent);
                        _this.rigime = r;
                        _this.Ri = true;
                    }
                    catch (Error) {
                        _this.Ri = false;
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    DossierPage.prototype.GetSigneClinique = function (numdoss, dateFeuille, nature, codeType) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        this.Ri = false;
        xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:GetSigneClinique>' +
            '<numdoss>' + numdoss + '</numdoss>' +
            '<dateFin>' + dateFeuille + '</dateFin>' +
            '<nature>' + nature + '</nature>' +
            '<codeType>' + codeType + '</codeType>' +
            '</ser:GetSigneClinique>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        var xml = xmlhttp.responseXML;
                        var x, i, s;
                        x = xml.getElementsByTagName("return");
                        var listEntrees = 'G4LEF';
                        var listSorties = '7I9A3HJ';
                        for (i = 0; i < x.length; i++) {
                            s = new SigneClinique_1.SigneClinique();
                            s.setcodeType(x[i].children[0].textContent);
                            s.setdate(x[i].children[1].textContent);
                            s.setdesignation(x[i].children[2].textContent);
                            s.setquantite(x[i].children[3].textContent);
                            if (listEntrees.search(s.getcodeType()) >= 0) {
                                _this.Entrees.push(s);
                                _this.Ent = true;
                            }
                            if (listSorties.search(s.getcodeType()) >= 0) {
                                _this.Sorties.push(s);
                                _this.Sor = true;
                            }
                            if (listEntrees.search(s.getcodeType()) === -1 && listSorties.search(s.getcodeType()) === -1) {
                                _this.signec.push(s);
                                _this.AlerteS = true;
                            }
                        }
                        if (_this.signec.length === 0) {
                            _this.AlerteS = false;
                            _this.Sor = false;
                            _this.Ent = false;
                        }
                    }
                    catch (Error) {
                        _this.AlerteS = false;
                        _this.Sor = false;
                        _this.Ent = false;
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    DossierPage.prototype.goToDetailPage = function () {
    };
    DossierPage = __decorate([
        core_1.Component({
            selector: 'page-dossier',
            templateUrl: 'dossier.html',
            providers: [variables_1.Variables]
        })
    ], DossierPage);
    return DossierPage;
}());
exports.DossierPage = DossierPage;
