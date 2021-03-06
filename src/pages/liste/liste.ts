import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {Patient} from '../../models/Patient';
import {Variables} from "../../providers/variables";
import {TabsPage} from "../tabs/tabs";
import {DateFeuilleService} from "../../services/DateFeuilleService";
import {PatientService} from "../../services/PatientService";
import {DateFeuille} from "../../models/DateFeuille";
import {HistPatient} from "../../models/HistPatient";
import {HistPatientService} from "../../services/HistPatientService";
import {Langue} from "../../models/Langue";
import {SQLite} from "@ionic-native/sqlite";

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
  hist: Array<HistPatient> = [];
  histl = new HistPatient();
  codeClinique: string;
  nomClinique: string;
  langue: any;
  langes: Array<Langue> = [];
  pathimage = Variables.path;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private sqlite: SQLite, public loadingCtrl: LoadingController) {
    this.dtFeuille = new DateFeuille();
    this.codeClinique = navParams.get("codeClinique");
    this.nomClinique = navParams.get("nomClinique");
    this.tabLangue = navParams.get("tabLangue");
    this.langue = navParams.get("langue");
    Variables.langue = this.langue;
    Variables.nomClinique = this.nomClinique;
    Variables.tab = this.tabLangue;
    this.presentLoadingDefault();
    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;
        this.historiqueOff(this.hist, "admin", "", "all", this.codeClinique);
        this.updateOff();
      }
      else {
        this.connection = true;

        this.historique("admin", "", "all", this.codeClinique);
        this.update();
      }
      this.patientliste = this.patient;
    });

  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: this.tabLangue.titreLoading,
      spinner: 'bubbles'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  liste(user, searchText, etage, codeClinique) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
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
          this.patienserv = new PatientService(this.sqlite);
          this.patienserv.verifPatient(this.patient, user, searchText, etage, codeClinique).then(res => {
            if (res === false) {
              this.patienserv.getPatients(this.patient, user, searchText, etage, codeClinique);
            }
          });
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  listeOff(patient, user, searchText, etage, codeClinique) {
    this.patienserv = new PatientService(this.sqlite);
    this.patient = this.patienserv.getPatients(patient, user, searchText, etage, codeClinique);
    this.patientliste = this.patient;
  }

  DateFeuille(codeClinique) {
    this.datefeuille.pop();
    this.datefeuille = [];
    this.datefeuille.length = 0;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
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
          for (i = 0; i < x.length; i++) {
            d = new DateFeuille();
            d.setdatefeuille(x[i].childNodes[0].nodeValue);
            this.datefeuille.push(d);
          }
          this.dtFeuilleserv = new DateFeuilleService(this.sqlite);
          this.dtFeuilleserv.verifDateFeuille(codeClinique).then(res => {
            if (res === false) {
              this.dtFeuilleserv.getDateFeuille(this.datefeuille, codeClinique);
            }
          });
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  DateFeuilleOff(datefeuille, codeClinique) {
    this.dtFeuilleserv = new DateFeuilleService(this.sqlite);
    this.datefeuille = this.dtFeuilleserv.getDateFeuille(this.datefeuille, codeClinique);
  }

  goToDossierPage(patient) {
    console.log("patient " + patient.getdossier());
    this.navCtrl.push(TabsPage, {
      tabLangue: this.tabLangue, langue: this.langue, mypatient: patient,
      dateFeuille: this.datefeuille[0].getdatefeuille(), codeClinique: this.codeClinique
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

  deleteListe(user, searchText, etage, codeClinique) {
    this.patient = [];
    this.patienserv = new PatientService(this.sqlite);
    this.patienserv.deletePatients(user, searchText, etage, codeClinique);
  }

  deleteDateFeuille(codeClinique) {
    this.dtFeuilleserv = new DateFeuilleService(this.sqlite);
    this.dtFeuilleserv.deleteDateFeuille(codeClinique);
  }

  doRefresh(refresher, codeClinique) {
    Variables.checconnection().then(connexion => {
      if (connexion === true) {
        this.historique("admin", "", "all", codeClinique);
        this.deleteListe("admin", "", "all", codeClinique);
        this.liste("admin", "", "all", codeClinique);
        this.deleteDateFeuille(codeClinique);
        this.DateFeuille(codeClinique);
        setTimeout(() => {
          //   alert('Async operation has ended');
          refresher.complete();
        }, 2000);
      }
    });
  }

  historique(user, searchText, etage, codeClinique) {
    this.histserv = new HistPatientService(this.sqlite);
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
      this.histserv.getHistPatients(this.hist, user, searchText, etage, codeClinique).then(res => {
        this.histl = res.getdate();
      });
    }
    catch (Error) {
      this.histserv.getHistPatients(this.hist, user, searchText, etage, codeClinique).then(res => {
        this.histl = res.getdate();

      });
    }

  }

  update() {

    this.patienserv = new PatientService(this.sqlite);
    this.patienserv.verifPatient(this.patient, "admin", "", "all", this.codeClinique).then(res => {
      if (res === false) {
        this.liste("admin", "", "all", this.codeClinique);
      } else {
        this.listeOff(this.patient, "admin", "", "all", this.codeClinique);
      }
    });
    this.DateFeuille(this.codeClinique);
  }

  historiqueOff(hist, user, searchText, etage, codeClinique) {
    this.histserv = new HistPatientService(this.sqlite);
    this.histserv.getHistPatients(hist, user, searchText, etage, codeClinique).then(res => {
      this.histl = res.getdate();
    });
  }

  updateOff() {
    this.listeOff(this.patient, "admin", "", "all", this.codeClinique);
    this.DateFeuilleOff(this.datefeuille, this.codeClinique);
  }

}
