import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Patient} from '../../models/Patient';
import {Variables} from "../../providers/variables";
import {TabsPage} from "../tabs/tabs";
import {PatientService} from "../../services/PatientService";
import {DateFeuille} from "../../models/DateFeuille";
import {DateFeuilleService} from "../../services/DateFeuilleService";

@Component({
  selector: 'page-liste',
  templateUrl: 'liste.html',
  providers: [Variables]
})
export class ListePage {
  patient: Array<Patient> = [];
  patientliste: Array<Patient> = [];
  DateF: any;
  dtFeuille: any;
  datefeuille: string = "";
  patienserv: any;
  connection: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    if (Variables.checconnection() === "No network connection") {
      this.connection = false;
      this.listeOff(this.patient, "admin", "", "all");
  //    this.DateFeuilleOff();
    }
    else {
      this.connection = true;
      this.liste("admin", "", "all");
    //  this.DateFeuille();
    }
    this.patientliste = this.patient;
  }

  ionViewDidLoad() {
    alert("connection " + this.connection);
  }

  liste(user, searchText, etage) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetListClientForTablette>' +
      '<user>' + user + '</user>' +
      '<searchText>' + searchText + '</searchText>' +
      '<etage>' + etage + '</etage>' +
      '</ser:GetListClientForTablette>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var xml = xmlhttp.responseXML;
          var x, i;
          x = xml.getElementsByTagName("return");
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
            this.patient.push(p);
          }
          if (searchText === "")
            searchText = "vide";
          this.patienserv = new PatientService();
          if (this.patienserv.verifPatient(this.patient, user, searchText, etage) === false) {
            this.patienserv.getPatients(this.patient, user, searchText, etage);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  listeOff(patient, user, searchText, etage) {
    if (searchText === "")
      searchText = "vide";
    this.patienserv = new PatientService();
    this.patient = this.patienserv.getPatients(patient, user, searchText, etage);
    this.patientliste = this.patient;
  }

  DateFeuille() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetDateFeuille/>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var xml = xmlhttp.responseXML;
          this.DateF = xml.getElementsByTagName("return");
          this.datefeuille = this.DateF[0].childNodes[0].nodeValue;
          var d = new DateFeuille();
          d.setdatefeuille(this.datefeuille);
          var datefe = new DateFeuilleService();
          if (datefe.verifDateFeuille() === false) {
            datefe.getDateFeuille(d);
          }
          return this.datefeuille;
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  DateFeuilleOff() {
    var datefe = new DateFeuilleService();
    this.datefeuille = datefe.getDateFeuille(this.dtFeuille).getdatefeuille();
  }

  goToDossierPage(patient) {
    this.navCtrl.push(TabsPage, {
      mypatient: patient,
      dateFeuille: this.datefeuille
    });
  }

  initializeItems() {
    this.patientliste = this.patient;
  }

  getItems(searchbar) {
    this.initializeItems();
    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }
    this.patientliste = this.patientliste.filter((v) => {
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
  }
}
