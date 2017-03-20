var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MotifHospitalisation } from "../../models/motifHospitalisation";
import { Antec } from "../../models/Antec";
import { SigneClinique } from "../../models/SigneClinique";
import { Traitement } from "../../models/Traitement";
import { Evenement } from "../../models/Evenement";
import { Rigime } from "../../models/Rigime";
import { Variables } from "../../providers/variables";
import { SigneCliniqueAlertService } from "../../services/SigneCliniqueAlertService";
import { TraitementService } from "../../services/TraitementService";
import { EvenementConService } from "../../services/EvenementConService";
import { EvenementEvoService } from "../../services/EvenementEvoService";
import { EvenementExaService } from "../../services/EvenementExaService";
import { EvenementHisService } from "../../services/EvenementHisService";
import { motifHospitalisationService } from "../../services/motifHospitalisationService";
import { RigimeService } from "../../services/RigimeService";
import { SigneCliniqueEntService } from "../../services/SigneCliniqueEntService";
import { SigneCliniqueSorService } from "../../services/SigneCliniqueSorService";
import { SigneCliniqueSigService } from "../../services/SigneCliniqueSigService";
import { AntecCh } from "../../models/AntecCh";
import { AlegchService } from "../../services/AlegchService";
import { AntechService } from "../../services/AntechService";
import { HistDossierService } from "../../services/HistDossierService";
import { HistDossier } from "../../models/HistDossier";
var DossierPage = (function () {
    function DossierPage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.motifh = [];
        this.antec = [];
        this.aleg = [];
        this.alechl = [];
        this.antechl = [];
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
        this.rigime = [];
        this.histD = [];
        this.histd = new HistDossier();
        this.codeClinique = navParams.get("codeClinique");
        this.tabLangue = navParams.get("tabLangue");
        this.pass = navParams.get("pass");
        this.dateFeuille = navParams.get("dateFeuille");
        this.langue = navParams.get("langue");
        if (this.pass.getnature() === "REA") {
            this.codeType = "'1','G','L','E','7','I','9','A','3'";
            this.codeTypeOf = "1GLE7I9A3";
        }
        else if (this.pass.getnature() === "sur") {
            this.codeType = "'1','3','4'";
            this.codeTypeOf = "134";
        }
        if (Variables.checconnection() === "No network connection") {
            this.connection = false;
            //    alert("dossier " + this.pass.getdossier() + " date" + this.dateFeuille + " nature " + this.pass.getnature());
            this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique);
            this.GetAllMotifHospitalisationByNumDossOff(this.motifh, this.pass.getdossier(), this.codeClinique);
            this.getAntecedentAllergieByIdentifiantOff(this.antechl, this.alechl, this.pass.getid(), this.codeClinique);
            this.GetAlerteSigneCliniqueOff(this.signe, this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
            this.GetTraitementsOff(this.traitement, this.pass.getdossier(), this.dateFeuille, this.codeClinique);
            this.GetEvenementByDossierOff(this.pass.getdossier(), this.codeClinique);
            this.GetListRegimeOff(this.rigime, this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
            this.GetSigneCliniqueOff(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeTypeOf, this.codeClinique);
        }
        else {
            this.connection = true;
            this.historique(this.pass.getdossier(), this.codeClinique);
            /*
             this.GetAllMotifHospitalisationByNumDoss(this.pass.getdossier());
             this.getAntecedentAllergieByIdentifiant(this.pass.getid());
             this.GetAlerteSigneClinique(this.pass.getdossier(), this.dateFeuille, this.pass.getnature());
             this.GetTraitements(this.pass.getdossier(), this.dateFeuille);
             this.GetEvenementByDossier(this.pass.getdossier());
             this.GetListRegime(this.pass.getdossier(), this.dateFeuille, this.pass.getnature());
             this.GetSigneClinique(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeType, this.codeTypeOf);
             */
            this.update();
        }
    }
    DossierPage.prototype.GetAlerteSigneClinique = function (numDoss, dateFeuille, nature, codeClinique) {
        var _this = this;
        this.signe.pop();
        this.signe = [];
        this.signe.length = 0;
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
                            s = new SigneClinique();
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
                    _this.signeCliniqueAlertS = new SigneCliniqueAlertService();
                    _this.signeCliniqueAlertS.verifSigneCliniqueAlert(_this.signe, numDoss, dateFeuille, nature, codeClinique).then(function (res) {
                        if (res === false) {
                            _this.signeCliniqueAlertS.getSigneCliniquesAlert(_this.signe, numDoss, dateFeuille, nature, codeClinique);
                        }
                    });
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    DossierPage.prototype.GetAlerteSigneCliniqueOff = function (signe, numDoss, dateFeuille, nature, codeClinique) {
        var _this = this;
        this.signeCliniqueAlertS = new SigneCliniqueAlertService();
        this.signeCliniqueAlertS.verifSigneCliniqueAlert(signe, numDoss, dateFeuille, nature, codeClinique).then(function (res) {
            if (res === true) {
                _this.signe = _this.signeCliniqueAlertS.getSigneCliniquesAlert(signe, numDoss, dateFeuille, nature, codeClinique);
                _this.AlerteSigneCliniqueTest = true;
            }
        });
    };
    DossierPage.prototype.DeleteGetAlerteSigneClinique = function (numDoss, dateFeuille, nature, codeClinique) {
        this.traitementServ = new TraitementService();
        this.traitementServ.deleteTraitements(numDoss, dateFeuille, nature, codeClinique);
    };
    DossierPage.prototype.getAntecedentAllergieByIdentifiant = function (idpass, codeClinique) {
        var _this = this;
        this.stringAlerg = "";
        this.stringAntec = "";
        this.aleg.pop();
        this.aleg = [];
        this.aleg.length = 0;
        this.alechl.pop();
        this.alechl = [];
        this.alechl.length = 0;
        this.antec.pop();
        this.antec = [];
        this.antec.length = 0;
        this.antechl.pop();
        this.antechl = [];
        this.antechl.length = 0;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:getAntecedentAllergieByIdentifiant>' +
            '<identifiant>' + idpass + '</identifiant>' +
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
                            a = new Antec();
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
                                    _this.aleg.push(a);
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
                                _this.antec.push(a);
                            }
                        }
                        if (_this.antec.length === 0) {
                            _this.AntecedentAllergieTest = false;
                        }
                        var antech = new AntecCh();
                        antech.setidpass(idpass);
                        antech.setch(_this.stringAntec);
                        _this.antechl.push(antech);
                        _this.antecserv = new AntechService();
                        _this.antecserv.verifAntec(_this.antechl, idpass, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.antecserv.getAntecs(_this.antechl, idpass, codeClinique);
                            }
                        });
                        var alech = new AntecCh();
                        alech.setidpass(idpass);
                        alech.setch(_this.stringAlerg);
                        _this.alechl.push(alech);
                        _this.alegserv = new AlegchService();
                        _this.alegserv.verifAleg(_this.alechl, idpass, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.alegserv.getAlegs(_this.alechl, idpass, codeClinique);
                            }
                        });
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
    DossierPage.prototype.getAntecedentAllergieByIdentifiantOff = function (antec, aleg, idpass, codeClinique) {
        var _this = this;
        this.AntecedentAllergieTest = true;
        this.antecserv = new AntechService();
        this.antecserv.verifAntec(this.antechl, idpass, codeClinique).then(function (res) {
            if (res === true) {
                _this.antechl = _this.antecserv.getAntecs(antec, idpass, codeClinique);
                _this.Ante = true;
            }
        });
        this.alegserv = new AlegchService();
        this.alegserv.verifAleg(this.alechl, idpass, codeClinique).then(function (res) {
            if (res === true) {
                _this.alechl = _this.alegserv.getAlegs(aleg, idpass, codeClinique);
                _this.Alerg = true;
            }
        });
    };
    DossierPage.prototype.DeletegetAntecedentAllergieByIdentifiant = function (idpass, codeClinique) {
        this.antecserv = new AntechService();
        this.antecserv.deleteAntecs(idpass, codeClinique);
        this.alegserv = new AlegchService();
        this.alegserv.deleteAlegs(idpass, codeClinique);
    };
    DossierPage.prototype.GetAllMotifHospitalisationByNumDoss = function (numDoss, codeClinique) {
        var _this = this;
        this.motifh.pop();
        this.motifh = [];
        this.motifh.length = 0;
        this.test = false;
        ;
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
                        var x, i, drdv, dsortie, hrdv, hsortie;
                        var day = "";
                        var month = "";
                        var year = "";
                        var minu = "";
                        var second = "";
                        var hour = "";
                        x = xml.getElementsByTagName("return");
                        var a;
                        for (i = 0; i < x.length; i++) {
                            a = new MotifHospitalisation();
                            a.setconclusion(x[0].children[0].textContent);
                            drdv = new Date(x[0].children[1].textContent);
                            day = drdv.getDate();
                            month = drdv.getMonth() + 1;
                            year = drdv.getFullYear();
                            a.setdateRdv(day + "/" + month + "/" + year);
                            dsortie = new Date(x[0].children[2].textContent);
                            day = dsortie.getDate();
                            month = dsortie.getMonth() + 1;
                            year = dsortie.getFullYear();
                            a.setdateSortie(day + "/" + month + "/" + year);
                            a.setgroupeSang(x[0].children[3].textContent);
                            hrdv = new Date(x[0].children[4].textContent);
                            minu = hrdv.getMinutes();
                            hour = hrdv.getHours();
                            second = hrdv.getSeconds();
                            a.setheureRdv(hour + " : " + minu + " : " + second);
                            hsortie = new Date(x[0].children[5].textContent);
                            minu = hrdv.getMinutes();
                            hour = hrdv.getHours();
                            second = hrdv.getSeconds();
                            a.setheureSortie(hour + " : " + minu + " : " + second);
                            a.sethistoiremaladie(x[0].children[6].textContent);
                            a.setmotifhospitalisation(x[0].children[7].textContent);
                            a.setnumdoss(x[0].children[8].textContent);
                            a.setobservationSejour(x[0].children[9].textContent);
                            a.setpoid(x[0].children[10].textContent);
                            a.settaille(x[0].children[11].textContent);
                            a.settraitementHabituelle(x[0].children[12].textContent);
                            a.settraitementSejour(x[0].children[13].textContent);
                            a.settraitementSortie(x[0].children[14].textContent);
                            a.setutilisateurMotif(x[0].children[15].textContent);
                            _this.motifh.push(a);
                        }
                        if (_this.motifh.length === 0) {
                            _this.test = false;
                        }
                        //  return this.m;
                        _this.mserv = new motifHospitalisationService();
                        _this.mserv.verifmotifHospitalisation(_this.motifh, numDoss, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.mserv.getmotifHospitalisations(_this.motifh, numDoss, codeClinique);
                            }
                        });
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
    DossierPage.prototype.GetAllMotifHospitalisationByNumDossOff = function (motif, numdoss, codeClinique) {
        var _this = this;
        this.mserv = new motifHospitalisationService();
        this.mserv.verifmotifHospitalisation(motif, numdoss, codeClinique).then(function (res) {
            if (res === true) {
                _this.motifh = _this.mserv.getmotifHospitalisations(motif, numdoss, codeClinique);
                _this.test = true;
            }
        });
    };
    DossierPage.prototype.DeleteGetAllMotifHospitalisationByNumDoss = function (numDoss, codeClinique) {
        this.mserv = new motifHospitalisationService();
        this.mserv.deleteMotifhospitalisations(numDoss, codeClinique);
    };
    DossierPage.prototype.GetTraitements = function (numdoss, datefeuille, codeClinique) {
        var _this = this;
        this.traitement.pop();
        this.traitement = [];
        this.traitement.length = 0;
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
                            t = new Traitement();
                            if (x[i].childElementCount === 20) {
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
                            }
                            else if (x[i].childElementCount === 19) {
                                t.setcodePosologie(x[i].children[0].textContent);
                                t.setdate(x[i].children[1].textContent);
                                t.setdateFinTrait(x[i].children[2].textContent);
                                t.setdci("");
                                t.setdesignation(x[i].children[3].textContent);
                                t.setdureEnJour(x[i].children[4].textContent);
                                t.setheure(x[i].children[5].textContent);
                                t.setheureDebut(x[i].children[6].textContent);
                                t.setjour(x[i].children[7].textContent);
                                t.setnbFois(x[i].children[8].textContent);
                                t.setnumDoss(x[i].children[9].textContent);
                                t.setnumTraitement(x[i].children[10].textContent);
                                t.setnumbon(x[i].children[11].textContent);
                                t.setposologie(x[i].children[12].textContent);
                                t.setprescripteur(x[i].children[13].textContent);
                                t.setquantite(x[i].children[14].textContent);
                                t.setunite(x[i].children[15].textContent);
                                t.setvitesse(x[i].children[16].textContent);
                                t.setvoie(x[i].children[17].textContent);
                                t.setvolume(x[i].children[18].textContent);
                            }
                            _this.traitement.push(t);
                        }
                        if (_this.traitement.length === 0) {
                            _this.trait = false;
                        }
                        _this.traitementServ = new TraitementService();
                        _this.traitementServ.verifTraitement(_this.traitement, _this.pass.getdossier(), _this.dateFeuille, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.traitementServ.getTraitements(_this.traitement, _this.pass.getdossier(), _this.dateFeuille, codeClinique);
                            }
                        });
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
    DossierPage.prototype.GetTraitementsOff = function (traitement, numdoss, datefeuille, codeClinique) {
        var _this = this;
        this.traitementServ = new TraitementService();
        this.traitementServ.verifTraitement(this.traitement, this.pass.getdossier(), this.dateFeuille, codeClinique).then(function (res) {
            if (res === true) {
                _this.traitement = _this.traitementServ.getTraitements(_this.traitement, _this.pass.getdossier(), _this.dateFeuille, codeClinique);
                _this.trait = true;
            }
        });
    };
    DossierPage.prototype.DeleteTraitement = function (numdoss, dateFeuille, codeClinique) {
        this.traitementServ = new TraitementService();
        this.traitementServ.deleteTraitements(numdoss, dateFeuille, codeClinique);
    };
    DossierPage.prototype.convertHTMLtoRTF = function (rtf) {
        rtf = rtf.replace(/\\par[d]?/g, "");
        return rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "").trim();
    };
    DossierPage.prototype.GetEvenementByDossier = function (numdoss, codeClinique) {
        var _this = this;
        this.Evolution.pop();
        this.Evolution = [];
        this.Evolution.length = 0;
        this.Histoiremaladie.pop();
        this.Histoiremaladie = [];
        this.Histoiremaladie.length = 0;
        this.Examenclinique.pop();
        this.Examenclinique = [];
        this.Examenclinique.length = 0;
        this.Conclusion.pop();
        this.Conclusion = [];
        this.Conclusion.length = 0;
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
                            e = new Evenement();
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
                        else {
                            _this.EvenementConS = new EvenementConService();
                            _this.EvenementConS.verifEvenement(_this.Conclusion, _this.pass.getdossier(), codeClinique).then(function (res) {
                                if (res === false) {
                                    _this.EvenementConS.getEvenements(_this.Conclusion, _this.pass.getdossier(), codeClinique);
                                }
                            });
                        }
                        if (_this.Examenclinique.length === 0) {
                            _this.Exa = false;
                        }
                        else {
                            _this.EvenementExaS = new EvenementExaService();
                            _this.EvenementExaS.verifEvenement(_this.Examenclinique, _this.pass.getdossier(), codeClinique).then(function (res) {
                                if (res === false) {
                                    _this.EvenementExaS.getEvenements(_this.Examenclinique, _this.pass.getdossier(), codeClinique);
                                }
                            });
                        }
                        if (_this.Histoiremaladie.length === 0) {
                            _this.His = false;
                        }
                        else {
                            _this.EvenementHisS = new EvenementHisService();
                            _this.EvenementHisS.verifEvenement(_this.Histoiremaladie, _this.pass.getdossier(), codeClinique).then(function (res) {
                                if (res === false) {
                                    _this.EvenementHisS.getEvenements(_this.Histoiremaladie, _this.pass.getdossier(), codeClinique);
                                }
                            });
                        }
                        if (_this.Evolution.length === 0) {
                            _this.Evo = false;
                        }
                        else {
                            _this.EvenementEvoS = new EvenementEvoService();
                            _this.EvenementEvoS.verifEvenement(_this.Evolution, _this.pass.getdossier(), codeClinique).then(function (res) {
                                if (res === false) {
                                    _this.EvenementEvoS.getEvenements(_this.Evolution, _this.pass.getdossier(), codeClinique);
                                }
                            });
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
    DossierPage.prototype.GetEvenementByDossierOff = function (numdoss, codeClinique) {
        var _this = this;
        this.EvenementConS = new EvenementConService();
        this.EvenementConS.verifEvenement(this.Conclusion, numdoss, codeClinique).then(function (res) {
            if (res === true) {
                _this.Conclusion = _this.EvenementConS.getEvenements(_this.Conclusion, numdoss, codeClinique);
                _this.Con = true;
            }
        });
        this.EvenementExaS = new EvenementExaService();
        this.EvenementExaS.verifEvenement(this.Examenclinique, this.pass.getdossier(), codeClinique).then(function (res) {
            if (res === true) {
                _this.Examenclinique = _this.EvenementExaS.getEvenements(_this.Examenclinique, numdoss, codeClinique);
                _this.Exa = true;
            }
        });
        this.EvenementHisS = new EvenementHisService();
        this.EvenementHisS.verifEvenement(this.Histoiremaladie, this.pass.getdossier(), codeClinique).then(function (res) {
            if (res === true) {
                _this.Histoiremaladie = _this.EvenementHisS.getEvenements(_this.Histoiremaladie, _this.pass.getdossier(), codeClinique);
                _this.His = true;
            }
        });
        this.EvenementEvoS = new EvenementEvoService();
        this.EvenementEvoS.verifEvenement(this.Evolution, this.pass.getdossier(), codeClinique).then(function (res) {
            if (res === true) {
                _this.Evolution = _this.EvenementEvoS.getEvenements(_this.Evolution, _this.pass.getdossier(), codeClinique);
                _this.Evo = true;
            }
        });
    };
    DossierPage.prototype.DeleteGetEvenementByDossier = function (numdoss, codeClinique) {
        this.EvenementConS = new EvenementConService();
        this.EvenementConS.deleteEvenementCons(numdoss, codeClinique);
        this.EvenementExaS = new EvenementExaService();
        this.EvenementExaS.deleteEvenementExas(numdoss, codeClinique);
        this.EvenementHisS = new EvenementHisService();
        this.EvenementHisS.deleteEvenementHis(numdoss, codeClinique);
        this.EvenementEvoS = new EvenementEvoService();
        this.EvenementEvoS.deleteEvenementEvos(numdoss, codeClinique);
    };
    DossierPage.prototype.GetListRegime = function (numdoss, datefeuille, nature, codeClinique) {
        var _this = this;
        this.rigime.pop();
        this.rigime = [];
        this.rigime.length = 0;
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
                        var x, r, i;
                        x = xml.getElementsByTagName("return");
                        for (i = 0; i < x.length; i++) {
                            r = new Rigime();
                            r.setcodeRegime(x[0].children[0].textContent);
                            r.setdesignation(x[0].children[1].textContent);
                            _this.rigime.push(r);
                        }
                        if (_this.rigime.length === 0) {
                            _this.Ri = false;
                        }
                        else {
                            _this.Ri = true;
                        }
                        _this.rigimeserv = new RigimeService();
                        _this.rigimeserv.verifRigime(_this.rigime, numdoss, datefeuille, nature, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.rigimeserv.getRigimes(_this.rigime, numdoss, datefeuille, nature, codeClinique);
                            }
                        });
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
    DossierPage.prototype.GetListRegimeOff = function (rigime, numdoss, datefeuille, nature, codeClinique) {
        var _this = this;
        this.rigimeserv = new RigimeService();
        this.rigimeserv.verifRigime(this.rigime, numdoss, datefeuille, nature, codeClinique).then(function (res) {
            if (res === true) {
                _this.rigimeserv.getRigimes(_this.rigime, numdoss, datefeuille, nature, codeClinique);
                _this.Ri = true;
            }
        });
    };
    DossierPage.prototype.DeleteGetListRegime = function (numdoss, datefeuille, nature, codeClinique) {
        this.rigimeserv = new RigimeService();
        this.rigimeserv.deleteRigimes(numdoss, datefeuille, nature, codeClinique);
    };
    DossierPage.prototype.GetSigneClinique = function (numdoss, dateFeuille, nature, codeType, codeTypeOf, codeClinique) {
        var _this = this;
        this.Entrees.pop();
        this.Entrees = [];
        this.Entrees.length = 0;
        this.Sorties.pop();
        this.Sorties = [];
        this.Sorties.length = 0;
        this.Sorties.pop();
        this.Sorties = [];
        this.Sorties.length = 0;
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
                            s = new SigneClinique();
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
                        _this.signeCliniqueEntS = new SigneCliniqueEntService();
                        _this.signeCliniqueEntS.verifSigneClinique(_this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.signeCliniqueEntS.getSigneCliniques(_this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
                            }
                        });
                        _this.signeCliniqueSorS = new SigneCliniqueSorService();
                        _this.signeCliniqueSorS.verifSigneClinique(_this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.signeCliniqueSorS.getSigneCliniques(_this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
                            }
                        });
                        _this.signeCliniqueSigS = new SigneCliniqueSigService();
                        _this.signeCliniqueSigS.verifSigneClinique(_this.signec, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(function (res) {
                            if (res === false) {
                                _this.signeCliniqueSigS.getSigneCliniques(_this.signec, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
                            }
                        });
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
    DossierPage.prototype.GetSigneCliniqueOff = function (numdoss, dateFeuille, nature, codeTypeOf, codeClinique) {
        var _this = this;
        this.signeCliniqueEntS = new SigneCliniqueEntService();
        this.signeCliniqueEntS.verifSigneClinique(this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(function (res) {
            if (res === true) {
                _this.Entrees = _this.signeCliniqueEntS.getSigneCliniques(_this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
                _this.Ent = true;
            }
        });
        this.signeCliniqueSorS = new SigneCliniqueSorService();
        this.signeCliniqueSorS.verifSigneClinique(this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(function (res) {
            if (res === true) {
                _this.Sorties = _this.signeCliniqueSorS.getSigneCliniques(_this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
                _this.Sor = true;
            }
        });
        this.signeCliniqueSigS = new SigneCliniqueSigService();
        this.signeCliniqueSigS.verifSigneClinique(this.signec, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(function (res) {
            if (res === true) {
                _this.signec = _this.signeCliniqueSigS.getSigneCliniques(_this.signec, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
                _this.AlerteS = true;
            }
        });
    };
    DossierPage.prototype.DeleteGetSigneClinique = function (numdoss, dateFeuille, nature, codeTypeOf, codeClinique) {
        this.signeCliniqueEntS = new SigneCliniqueEntService();
        this.signeCliniqueEntS.deleteSigneCliniques(numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
        this.signeCliniqueSorS = new SigneCliniqueSorService();
        this.signeCliniqueSorS.deleteSigneCliniques(numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
        this.signeCliniqueSigS = new SigneCliniqueSigService();
        this.signeCliniqueSigS.deleteSigneCliniques(numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
    };
    DossierPage.prototype.update = function () {
        this.DeleteGetAllMotifHospitalisationByNumDoss(this.pass.getdossier(), this.codeClinique);
        this.GetAllMotifHospitalisationByNumDoss(this.pass.getdossier(), this.codeClinique);
        this.DeletegetAntecedentAllergieByIdentifiant(this.pass.getid(), this.codeClinique);
        this.getAntecedentAllergieByIdentifiant(this.pass.getid(), this.codeClinique);
        this.DeleteGetAlerteSigneClinique(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
        this.GetAlerteSigneClinique(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
        this.DeleteTraitement(this.pass.getdossier(), this.dateFeuille, this.codeClinique);
        this.GetTraitements(this.pass.getdossier(), this.dateFeuille, this.codeClinique);
        this.DeleteGetEvenementByDossier(this.pass.getdossier(), this.codeClinique);
        this.GetEvenementByDossier(this.pass.getdossier(), this.codeClinique);
        this.DeleteGetListRegime(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
        this.GetListRegime(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
        this.DeleteGetSigneClinique(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeTypeOf, this.codeClinique);
        this.GetSigneClinique(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeType, this.codeTypeOf, this.codeClinique);
    };
    DossierPage.prototype.doRefresh = function (refresher) {
        this.update();
        setTimeout(function () {
            //   alert('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    DossierPage.prototype.historique = function (numDoss, codeClinique) {
        var _this = this;
        this.histserv = new HistDossierService();
        var h = new HistDossier();
        var d = new Date();
        h.setnumDoss(numDoss);
        h.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
        h.setcodeClinique(codeClinique);
        this.histD.push(h);
        try {
            this.histserv.deleteHistDossiers(numDoss, codeClinique);
            this.histserv.getHistDossiers(this.histD, numDoss, codeClinique).then(function (res) {
                _this.histd = res.getdate();
            });
        }
        catch (Error) {
            this.histserv.getHistDossiers(this.histD, numDoss, codeClinique).then(function (res) {
                _this.histd = res.getdate();
            });
        }
    };
    DossierPage.prototype.historiqueOff = function (hist, numDoss, codeClinique) {
        var _this = this;
        this.histserv = new HistDossierService();
        this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(function (res) {
            _this.histd = res.getdate();
        });
    };
    return DossierPage;
}());
DossierPage = __decorate([
    Component({
        selector: 'page-dossier',
        templateUrl: 'dossier.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], DossierPage);
export { DossierPage };
//# sourceMappingURL=dossier.js.map