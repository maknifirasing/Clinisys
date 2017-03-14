import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Patient} from '../../models/Patient';
import {Variables} from "../../providers/variables";
import {TabsPage} from "../tabs/tabs";
import {DateFeuilleService} from "../../services/DateFeuilleService";
import {PatientService} from "../../services/PatientService";
import {DateFeuille} from "../../models/DateFeuille";
import {HistPatient} from "../../models/HistPatient";
import {HistPatientService} from "../../services/HistPatientService";

@Component({
  selector: 'page-liste',
  templateUrl: 'liste.html',
  providers: [Variables]
})
export class ListePage {
  xml: any;
  patient: Array<Patient> = [];
  patientliste: Array<Patient> = [];
  dtFeuille: any;
  dtFeuilleserv: any;
  datefeuille: Array<DateFeuille> = [];
  tabLangue: any;
  patienserv: any;
  connection: boolean;
  histserv: any;
  hist: Array<HistPatient>= [];
  codeClinique: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.dtFeuille = new DateFeuille();
    this.codeClinique = navParams.get("codeClinique");
    if (Variables.checconnection() === "No network connection") {
      this.connection = false;
      this.historiqueOff(this.hist, "admin", "", "all", this.codeClinique);
      this.listeOff(this.patient, "admin", "", "all");
      this.DateFeuilleOff(this.datefeuille);
    }
    else {
      this.connection = true;
      this.historique("admin", "", "all", this.codeClinique);
      this.liste("admin", "", "all");
      this.DateFeuille();

    }
    this.patientliste = this.patient;
  }


  liste(user, searchText, etage) {
    this.patient.pop();
    this.patient = [];
    this.patient.length = 0;
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
          this.xml = xmlhttp.responseXML;
          var x, i;
          x = this.xml.getElementsByTagName("return");
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
          //     if (this.patienserv.verifPatient(this.patient, user, searchText, etage) === false) {
          this.patienserv.getPatients(this.patient, user, searchText, etage);
          //     }
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
    this.datefeuille.pop();
    this.datefeuille = [];
    this.datefeuille.length = 0;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:GetDateFeuille/>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, d;
          x = this.xml.getElementsByTagName("return");
          //    this.datefeuille = this.datefeuille + this.DateF[0].childNodes[0].nodeValue;
          for (i = 0; i < x.length; i++) {
            d = new DateFeuille();
            d.setdatefeuille(x[i].childNodes[0].nodeValue);
            this.datefeuille.push(d);
          }
          this.dtFeuilleserv = new DateFeuilleService();
          //    if (this.dtFeuilleserv.verifDateFeuille() === false) {
          this.dtFeuilleserv.getDateFeuille(this.datefeuille);
          //      }
          //    return this.datefeuille;
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  DateFeuilleOff(datefeuille) {
    this.dtFeuilleserv = new DateFeuilleService();
    this.datefeuille = this.dtFeuilleserv.getDateFeuille(this.datefeuille);
  }

  goToDossierPage(patient) {
    this.tabLangue = {
      tabLangue: this.navParams.data.tabLangue.tabLangue,

    };
    this.navCtrl.push(TabsPage, {
      tabLangue: this.tabLangue, langue: this.navParams.get("langue"), mypatient: patient,
      dateFeuille: this.datefeuille[0].getdatefeuille()
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


  deleteListe(user, searchText, etage) {
    this.patienserv = new PatientService();
    this.patienserv.deletePatients(user, searchText, etage);
  }

  deleteDateFeuille() {
    this.dtFeuilleserv = new DateFeuilleService();
    this.dtFeuilleserv.deleteDateFeuille();
  }

  doRefresh(refresher) {
    this.historique("admin", "", "all", this.codeClinique);
    this.deleteListe("admin", "", "all");
    this.liste("admin", "", "all");
    this.deleteDateFeuille();
    this.DateFeuille();
    setTimeout(() => {
      //   alert('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  historique(user, searchText, etage, codeClinique) {
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
      this.hist = this.histserv.getHistPatients(this.hist, user, searchText, etage, codeClinique);
    }
    catch (Error)
    {
      this.hist = this.histserv.getHistPatients(this.hist, user, searchText, etage, codeClinique);
    }

  }

  historiqueOff(hist, user, searchText, etage, codeClinique) {
    this.histserv = new HistPatientService();
    this.hist = this.histserv.getHistPatientsOff(hist, user, searchText, etage, codeClinique);
  }
}
