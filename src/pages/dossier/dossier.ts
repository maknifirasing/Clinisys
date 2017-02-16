import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MotifHospitalisation} from '../../models/motifHospitalisation';
import {ListePage} from "../liste/liste";
import {ContactPage} from "../contact/contact";
import {AboutPage} from "../about/about";
import {Traitement} from "../../models/Traitement";
import {Evenement} from "../../models/Evenement";
import {Rigime} from "../../models/Rigime";
import {SigneClinique} from "../../models/SigneClinique";

@Component({
  selector: 'page-dossier',
  templateUrl: 'dossier.html'
})

export class DossierPage implements OnInit {
  m = new MotifHospitalisation();
  id: string;
  numDoss: string;
  dateFeuille: string;
  img: string;
  nom: string;
  age: string;
  ch: string;
  nature: string;
  codeType: string;
  traitement: Array<Traitement> = [];
  Histoiremaladie: Array<Evenement> = [];
  Evolution: Array<Evenement> = [];
  Examenclinique: Array<Evenement> = [];
  Conclusion: Array<Evenement> = [];
  signec: Array<SigneClinique> = [];

  rigime: Rigime;
  trait: boolean;
  His: boolean;
  Evo: boolean;
  Exa: boolean;
  Con: boolean;
  Ri: boolean;
  AlerteS: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get("identifiant");
    this.numDoss = navParams.get("numeroDossier");
    this.img = navParams.get("image");
    this.nom = navParams.get("nom");
    this.age = navParams.get("age");
    this.ch = navParams.get("chambre");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DossierPage');
  }

  ngOnInit() {

    this.GetAllMotifHospitalisationByNumDoss();
    this.GetTraitements(this.numDoss, this.dateFeuille);
    this.GetEvenementByDossier(this.numDoss);
    this.GetListRegime(this.numDoss, this.dateFeuille, this.nature);
    if (this.nature === "REA") {
      this.codeType = "'1','G','L','E','7','I','9','A','3'";
    }
    else if (this.nature === "sur") {
      this.codeType = "'1','3','4'";
    }
    this.GetSigneClinique(this.numDoss, this.dateFeuille, this.nature, this.codeType);
  }

  GetAllMotifHospitalisationByNumDoss() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://192.168.0.65:8084/dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:GetAllMotifHospitalisationByNumDoss>' +
      '<numDoss>' + this.numDoss + '</numDoss>' +
      '</ser:GetAllMotifHospitalisationByNumDoss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var xml = xmlhttp.responseXML;
          var x, i, m, drdv, dsortie, hrdv, hsortie;
          var day = "";
          var month = "";
          var year = "";
          var minu = "";
          var second = "";
          var hour = "";
          x = xml.getElementsByTagName("return");
          this.m.setconclusion(x[0].children[0].textContent);
          drdv = new Date(x[0].children[1].textContent);
          day = drdv.getDay();
          month = drdv.getMonth();
          year = drdv.getFullYear();
          this.m.setdateRdv(day + "/" + month + "/" + year);
          dsortie = new Date(x[0].children[2].textContent);
          day = dsortie.getDay();
          month = dsortie.getMonth();
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
          return this.m;
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetTraitements(numdoss, datefeuille) {
    this.trait = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://192.168.0.65:8084/dmi-core/ReaWSService?wsdl', true);
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
              t.setdesignation(x[i].children[4].textContent);
              t.setposologie(x[i].children[13].textContent);
              t.setjour(x[i].children[8].textContent);
              this.traitement.push(t);
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

  GetEvenementByDossier(numdoss) {
    this.His = false;
    this.Exa = false;
    this.Con = false;
    this.Evo = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://192.168.0.65:8084/dmi-core/WebServiceMedecinEventsService?wsdl', true);
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
              e.setdetail(x[i].children[3].textContent);
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
          } catch (Error) {
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetListRegime(numdoss, datefeuille, nature) {
    var xmlhttp = new XMLHttpRequest();
    this.Ri = false;
    xmlhttp.open('POST', 'http://192.168.0.65:8084/dmi-core/DossierSoinWSService?wsdl', true);
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

  GetSigneClinique(numdoss, dateFeuille, nature, codeType) {
    var xmlhttp = new XMLHttpRequest();
    this.Ri = false;
    xmlhttp.open('POST', 'http://192.168.0.65:8084/dmi-core/DossierSoinWSService?wsdl', true);
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
            this.AlerteS = true;
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
              this.signec.push(s);
            }
          } catch (Error) {
            this.AlerteS = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
}

