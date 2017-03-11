import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MotifHospitalisation} from '../../models/motifHospitalisation';
import {Antec} from '../../models/Antec';
import {SigneClinique} from '../../models/SigneClinique';
import {Traitement} from "../../models/Traitement";
import {Evenement} from "../../models/Evenement";
import {Rigime} from "../../models/Rigime";
import {Variables} from "../../providers/variables";
import {SigneCliniqueAlertService} from "../../services/SigneCliniqueAlertService";
import {TraitementService} from "../../services/TraitementService";
import {EvenementConService} from "../../services/EvenementConService";
import {EvenementEvoService} from "../../services/EvenementEvoService";
import {EvenementExaService} from "../../services/EvenementExaService";
import {EvenementHisService} from "../../services/EvenementHisService";
import {motifHospitalisationService} from "../../services/motifHospitalisationService";
import {AntecService} from "../../services/AntecService";
import {RigimeService} from "../../services/RigimeService";
import {SigneCliniqueService} from "../../services/SigneCliniqueService";
import {SigneCliniqueEntService} from "../../services/SigneCliniqueEntService";
import {SigneCliniqueSorService} from "../../services/SigneCliniqueSorService";
import {SigneCliniqueSigService} from "../../services/SigneCliniqueSigService";
import {AlegService} from "../../services/AlegService";
import {AntecCh} from "../../models/AntecCh";
import {AlegchService} from "../../services/AlegchService";
import {AntechService} from "../../services/AntechService";

@Component({
  selector: 'page-dossier',
  templateUrl: 'dossier.html',
  providers: [Variables]
})

export class DossierPage {
  m = new MotifHospitalisation();
  mserv: any;
  antec: Array<Antec> = [];
  aleg: Array<Antec> = [];
  alechl: Array<AntecCh> = [];
  antechl: Array<AntecCh> = [];
  antecserv: any;
  alegserv: any;
  signe: Array<SigneClinique> = [];
  disig: string;
  test: boolean;
  AlerteSigneCliniqueTest: boolean = false;
  AntecedentAllergieTest: boolean = false;
  stringAlerg: string = "";
  stringAntec: string = "";
  Alerg: boolean = false;
  Ante: boolean = false;
  codeType: string;
  codeTypeOf: string;
  traitement: Array<Traitement> = [];
  traitementServ: any;
  Histoiremaladie: Array<Evenement> = [];
  Evolution: Array<Evenement> = [];
  Examenclinique: Array<Evenement> = [];
  Conclusion: Array<Evenement> = [];
  signec: Array<SigneClinique> = [];
  Entrees: Array<SigneClinique> = [];
  Sorties: Array<SigneClinique> = [];
  rigime = new Rigime();
  rigimeserv: any;
  trait: boolean;
  His: boolean;
  Evo: boolean;
  Exa: boolean;
  Con: boolean;
  Ri: boolean;
  AlerteS: boolean;
  Sor: boolean;
  Ent: boolean;
  titreEnligne: string;
  connection: boolean;
  signeCliniqueEntS: any;
  signeCliniqueSorS: any;
  signeCliniqueSigS: any;
  signeCliniqueAlertS: any;
  EvenementConS: any;
  EvenementEvoS: any;
  EvenementExaS: any;
  EvenementHisS: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {

    if (this.navParams.data.pass.getnature() === "REA") {
      this.codeType = "'1','G','L','E','7','I','9','A','3'";
      this.codeTypeOf = "1GLE7I9A3";
    }
    else if (this.navParams.data.pass.getnature() === "sur") {
      this.codeType = "'1','3','4'";
      this.codeTypeOf = "134";
    }
    if (Variables.checconnection() === "No network connection") {
      this.connection = false;
   //   alert("dossier " + this.navParams.data.pass.getdossier() + " date" + this.navParams.data.dateFeuille + " nature " + this.navParams.data.pass.getnature());
      this.GetAllMotifHospitalisationByNumDossOff(this.m, this.navParams.data.pass.getdossier());
      this.getAntecedentAllergieByIdentifiantOff(this.antechl, this.alechl, this.navParams.data.pass.getid());
      this.GetAlerteSigneCliniqueOff(this.signe, this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille, this.navParams.data.pass.getnature());
      this.GetTraitementsOff(this.traitement, this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille);
      this.GetEvenementByDossierOff(this.navParams.data.pass.getdossier());
      this.GetListRegimeOff(this.rigime, this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille, this.navParams.data.pass.getnature());
      this.GetSigneCliniqueOff(this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille, this.navParams.data.pass.getnature(), this.codeTypeOf);

    }
    else {
      this.connection = true;
      this.GetAllMotifHospitalisationByNumDoss(this.navParams.data.pass.getdossier());
      this.getAntecedentAllergieByIdentifiant(this.navParams.data.pass.getid());
      this.GetAlerteSigneClinique(this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille, this.navParams.data.pass.getnature());
      this.GetTraitements(this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille);
      this.GetEvenementByDossier(this.navParams.data.pass.getdossier());
      this.GetListRegime(this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille, this.navParams.data.pass.getnature());
      this.GetSigneClinique(this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille, this.navParams.data.pass.getnature(), this.codeType, this.codeTypeOf);

    }
  }


  GetAlerteSigneClinique(numDoss, dateFeuille, nature) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:GetAlerteSigneClinique>' +
      '<numdoss>' + numDoss + '</numdoss>' +
      '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
      '<nature>' + nature + '</nature>' +
      '</ser:GetAlerteSigneClinique>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.AlerteSigneCliniqueTest = true;
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
              this.signe.push(s);
            }
            if (this.signe.length === 0) {
              this.AlerteSigneCliniqueTest = false;
            }
          } catch (Error) {
            this.AlerteSigneCliniqueTest = false;
          }
          this.signeCliniqueAlertS = new SigneCliniqueAlertService();
          //    if (this.signeCliniqueS.verifSigneCliniqueAlert(this.signe, this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille, this.navParams.data.pass.getnature())===false) {
          this.signeCliniqueAlertS.getSigneCliniquesAlert(this.signe, this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille, this.navParams.data.pass.getnature());
          //    }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetAlerteSigneCliniqueOff(signe, numDoss, dateFeuille, nature) {
    this.signeCliniqueAlertS = new SigneCliniqueAlertService();
    this.signe = this.signeCliniqueAlertS.getSigneCliniquesAlert(signe, numDoss, dateFeuille, nature);
    //  if (this.signe.length === 0) {
    //     this.AlerteSigneCliniqueTest = false;
    // } else if (this.signe.length != 0) {
    this.AlerteSigneCliniqueTest = true;
    // }
  }

  getAntecedentAllergieByIdentifiant(idpass) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:getAntecedentAllergieByIdentifiant>' +
      '<identifiant>' + idpass + '</identifiant>' +
      '</ser:getAntecedentAllergieByIdentifiant>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.AntecedentAllergieTest = true;
            this.disig = "";
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
                if (a.getcodeFamille() === ("FA02")) // Allergie
                {
                  if (a.getcodeAntecedent().toUpperCase() === ("ALER")) {
                    this.stringAlerg += a.getobservation() + ", ";
                    this.Alerg = true;

                  }
                  else {
                    this.stringAlerg += a.getdesignation() + ", ";
                    this.Alerg = true;
                  }
                  this.aleg.push(a);
                }
                else // Antécédent
                {
                  if (a.getcodeFamille().toUpperCase() === ("AUTR")) {
                    this.stringAntec += a.getobservation() + ", ";
                    this.Ante = true;
                  }
                  else {
                    this.stringAntec += a.getdesignation() + ", ";
                    this.Ante = true;
                  }
                }
                this.antec.push(a);
              }


            }
            if (this.antec.length === 0) {
              this.AntecedentAllergieTest = false;
            }


            var antech = new AntecCh();

            antech.setidpass(idpass);
            antech.setch(this.stringAntec);

            this.antechl.push(antech);

            this.antecserv = new AntechService();
            this.antecserv.getAntecs(this.antechl, idpass);




            var alech = new AntecCh();

            alech.setidpass(idpass);
            alech.setch(this.stringAlerg);

            this.alechl.push(alech);

            this.alegserv = new AlegchService();
            this.alegserv.getAlegs(this.alechl, idpass);

          } catch (Error) {
            this.AntecedentAllergieTest = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  getAntecedentAllergieByIdentifiantOff(antec, aleg, idpass) {
    this.AntecedentAllergieTest = true;

    this.antecserv = new AntechService();
    this.antechl=this.antecserv.getAntecs(antec, idpass);
    this.Ante = true;

    this.alegserv = new AlegchService();
    this.alechl=this.alegserv.getAlegs(aleg, idpass);
    this.Alerg = true;
  }

  GetAllMotifHospitalisationByNumDoss(numDoss) {
    this.test = false;
    ;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetAllMotifHospitalisationByNumDoss>' +
      '<numDoss>' + numDoss + '</numDoss>' +
      '</ser:GetAllMotifHospitalisationByNumDoss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.test = true;
            var xml = xmlhttp.responseXML;
            var x, drdv, dsortie, hrdv, hsortie;
            var day = "";
            var month = "";
            var year = "";
            var minu = "";
            var second = "";
            var hour = "";
            x = xml.getElementsByTagName("return");
            this.m.setconclusion(x[0].children[0].textContent);
            drdv = new Date(x[0].children[1].textContent);
            day = drdv.getDate();
            month = drdv.getMonth() + 1;
            year = drdv.getFullYear();
            this.m.setdateRdv(day + "/" + month + "/" + year);
            dsortie = new Date(x[0].children[2].textContent);
            day = dsortie.getDate();
            month = dsortie.getMonth() + 1;
            year = dsortie.getFullYear();
            this.m.setdateSortie(day + "/" + month + "/" + year);
            this.m.setgroupeSang(x[0].children[3].textContent);
            hrdv = new Date(x[0].children[4].textContent);
            minu = hrdv.getMinutes();
            hour = hrdv.getHours();
            second = hrdv.getSeconds();
            this.m.setheureRdv(hour + " : " + minu + " : " + second);
            hsortie = new Date(x[0].children[5].textContent);
            minu = hrdv.getMinutes();
            hour = hrdv.getHours();
            second = hrdv.getSeconds();
            this.m.setheureSortie(hour + " : " + minu + " : " + second);
            this.m.sethistoiremaladie(x[0].children[6].textContent);
            this.m.setmotifhospitalisation(x[0].children[7].textContent);
            this.m.setnumdoss(x[0].children[8].textContent);
            this.m.setobservationSejour(x[0].children[9].textContent);
            this.m.setpoid(x[0].children[10].textContent);
            this.m.settaille(x[0].children[11].textContent);
            this.m.settraitementHabituelle(x[0].children[12].textContent);
            this.m.settraitementSejour(x[0].children[13].textContent);
            this.m.settraitementSortie(x[0].children[14].textContent);
            this.m.setutilisateurMotif(x[0].children[15].textContent);
            if (this.m === null) {
              this.test = false;
            }
            //  return this.m;
            this.mserv = new motifHospitalisationService();
            this.mserv.getmotifHospitalisations(this.m, numDoss);
          } catch (Error) {
            this.test = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetAllMotifHospitalisationByNumDossOff(motif, numdoss) {
    this.mserv = new motifHospitalisationService();
    this.m = this.mserv.getmotifHospitalisations(motif, numdoss);
    this.test = true;
  }

  GetTraitements(numdoss, datefeuille) {
    this.trait = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:findPrescriptionByNumDossAndDate>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '<datefeuille>' + datefeuille + '</datefeuille>' +
      '</ser:findPrescriptionByNumDossAndDate>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.trait = true;
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
              this.traitement.push(t);
            }
            if (this.traitement.length === 0) {
              this.trait = false;
            }


            this.traitementServ = new TraitementService();
            //    if (this.traitementServ.verifTraitement(this.traitement, this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille))===false) {
            this.traitementServ.getTraitements(this.traitement, this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille);
            //    }
          } catch (Error) {
            this.trait = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetTraitementsOff(traitement, numdoss, datefeuille) {
    this.trait = true;
    this.traitementServ = new TraitementService();
    this.traitement = this.traitementServ.getTraitements(this.traitement, this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille);
  }

  convertHTMLtoRTF(rtf) {
    rtf = rtf.replace(/\\par[d]?/g, "");
    return rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "").trim();
  }

  GetEvenementByDossier(numdoss) {
    this.His = false;
    this.Exa = false;
    this.Con = false;
    this.Evo = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetEvenementByDossier>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '</ser:GetEvenementByDossier>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.trait = true;
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
              e.setdetail(this.convertHTMLtoRTF(x[i].children[3].textContent));
              e.setIDEvenement(x[i].children[4].textContent);
              e.setnumdoss(x[i].children[5].textContent);
              e.setuserCreat(x[i].children[6].textContent);
              if (e.getevenements() === "Evolution") {
                this.Evolution.push(e);
                this.Evo = true;
              }
              if (e.getevenements() === "Histoire de la maladie") {
                this.Histoiremaladie.push(e);
                this.His = true;
              }
              if (e.getevenements() === "Examen clinique") {
                this.Examenclinique.push(e);
                this.Exa = true;
              }
              if (e.getevenements() === "Conclusion") {
                this.Conclusion.push(e);
                this.Con = true;
              }
            }
            if (this.Conclusion.length === 0) {
              this.Con = false;
            } else {
              this.EvenementConS = new EvenementConService();
              this.EvenementConS.getEvenements(this.Conclusion, this.navParams.data.pass.getdossier());
            }
            if (this.Examenclinique.length === 0) {
              this.Exa = false;
            } else {
              this.EvenementExaS = new EvenementExaService();
              this.EvenementExaS.getEvenements(this.Examenclinique, this.navParams.data.pass.getdossier());
            }
            if (this.Histoiremaladie.length === 0) {
              this.His = false;
            } else {
              this.EvenementHisS = new EvenementHisService();
              this.EvenementHisS.getEvenements(this.Histoiremaladie, this.navParams.data.pass.getdossier());
            }
            if (this.Evolution.length === 0) {
              this.Evo = false;
            }
            else {
              this.EvenementEvoS = new EvenementEvoService();
              this.EvenementEvoS.getEvenements(this.Evolution, this.navParams.data.pass.getdossier());
            }
          } catch (Error) {
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetEvenementByDossierOff(numdoss) {
    this.EvenementConS = new EvenementConService();
    this.Conclusion = this.EvenementConS.getEvenements(this.Conclusion, this.navParams.data.pass.getdossier());

    this.EvenementEvoS = new EvenementEvoService();
    this.Evolution = this.EvenementEvoS.getEvenements(this.Evolution, this.navParams.data.pass.getdossier());

    this.EvenementExaS = new EvenementExaService();
    this.Examenclinique = this.EvenementExaS.getEvenements(this.Examenclinique, this.navParams.data.pass.getdossier());

    this.EvenementHisS = new EvenementHisService();
    this.Histoiremaladie = this.EvenementHisS.getEvenements(this.Histoiremaladie, this.navParams.data.pass.getdossier());

    this.Con = true;
    this.Exa = true;
    this.His = true;
    this.Evo = true;

    /*
     if (this.Conclusion.length === 0) {
     this.Con = false;
     }
     if (this.Examenclinique.length === 0) {
     this.Exa = false;
     }
     if (this.Histoiremaladie.length === 0) {
     this.His = false;
     }
     if (this.Evolution.length === 0) {
     this.Evo = false;
     }

     */
  }

  GetListRegime(numdoss, datefeuille, nature) {
    var xmlhttp = new XMLHttpRequest();
    this.Ri = false;
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetListRegime>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '<dateFeuille>' + datefeuille + '</dateFeuille>' +
      '<nature>' + nature + '</nature>' +
      '</ser:GetListRegime>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {

            var xml = xmlhttp.responseXML;
            var x, r;
            r = new Rigime();
            x = xml.getElementsByTagName("return");
            r.setcodeRegime(x[0].children[0].textContent);
            r.setdesignation(x[0].children[1].textContent);
            this.rigime = r;
            this.Ri = true;
            this.rigimeserv = new RigimeService();
            this.rigimeserv.getRigimes(this.rigime, numdoss, datefeuille, nature);
          } catch (Error) {
            this.Ri = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetListRegimeOff(rigime, numdoss, datefeuille, nature) {
    this.Ri = true;
    this.rigimeserv = new RigimeService();
    this.rigime = this.rigimeserv.getRigimes(rigime, numdoss, datefeuille, nature);
  }

  GetSigneClinique(numdoss, dateFeuille, nature, codeType, codeTypeOf) {
    var xmlhttp = new XMLHttpRequest();
    this.Ri = false;
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
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
    xmlhttp.onreadystatechange = () => {
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
                this.Entrees.push(s);
                this.Ent = true;
              }
              if (listSorties.search(s.getcodeType()) >= 0) {
                this.Sorties.push(s);
                this.Sor = true;
              }
              if (listEntrees.search(s.getcodeType()) === -1 && listSorties.search(s.getcodeType()) === -1) {
                this.signec.push(s);
                this.AlerteS = true;
              }
            }
            if (this.signec.length === 0) {
              this.AlerteS = false;
              this.Sor = false;
              this.Ent = false;
            }

            this.signeCliniqueEntS = new SigneCliniqueEntService();
            this.signeCliniqueEntS.getSigneCliniques(this.Entrees, numdoss, dateFeuille, nature, codeTypeOf);

            this.signeCliniqueSorS = new SigneCliniqueSorService();
            this.signeCliniqueSorS.getSigneCliniques(this.Sorties, numdoss, dateFeuille, nature, codeTypeOf);

            this.signeCliniqueSigS = new SigneCliniqueSigService();
            this.signeCliniqueSigS.getSigneCliniques(this.signec, numdoss, dateFeuille, nature, codeTypeOf);
          } catch (Error) {
            this.AlerteS = false;
            this.Sor = false;
            this.Ent = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetSigneCliniqueOff(numdoss, dateFeuille, nature, codeTypeOf) {
    this.signeCliniqueEntS = new SigneCliniqueEntService();
    this.Entrees = this.signeCliniqueEntS.getSigneCliniques(this.Entrees, numdoss, dateFeuille, nature, codeTypeOf);

    this.signeCliniqueSorS = new SigneCliniqueSorService();
    this.Sorties = this.signeCliniqueSorS.getSigneCliniques(this.Sorties, numdoss, dateFeuille, nature, codeTypeOf);

    this.signeCliniqueSigS = new SigneCliniqueSigService();
    this.signec = this.signeCliniqueSigS.getSigneCliniques(this.signec, numdoss, dateFeuille, nature, codeTypeOf);


    this.AlerteS = true;
    this.Sor = true;
    this.Ent = true;


    //  if (this.signe.length === 0) {
    //     this.AlerteSigneCliniqueTest = false;
    // } else if (this.signe.length != 0) {
    this.Ent = true;
    // }

  }

  goToDetailPage() {

    this.traitementServ = new TraitementService();
    this.traitementServ.deleteTraitements(this.navParams.data.pass.getdossier(), this.navParams.data.dateFeuille);
  }


}

