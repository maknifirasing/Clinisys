import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Client} from "../../models/Client";
import {Variables} from "../../providers/variables";
import {Medecin} from "../../models/Medecin";
import {ClientService} from "../../services/ClientService";
import {MedecinService} from "../../services/MedecinService";
import {SQLite} from "@ionic-native/sqlite";
import {TabsPage} from "../tabs/tabs";
import {DossierPage} from "../dossier/dossier";

@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html',
  providers: [Variables]
})
export class ClientDetailPage {
  client = new Client();
  medecinList: Array<Medecin> = [];
  image: string;
  nom: string;
  prenom: string;
  age: any;
  numDoss: any;
  motif: any;
  tabLangue: any;
  langue: string;
  tabBarElement: any;
  codeClinique: any;
  clientserv: any;
  medecinserv: any;
  patient: any;
  connection: boolean;
  pathimage = Variables.path;
  device: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.codeClinique = TabsPage.tabLangue.codeClinique;
    this.tabLangue = TabsPage.tabLangue.tabLangue;
    this.langue = TabsPage.tabLangue.langue;
    this.patient = TabsPage.tabLangue.pass;
    this.motif = DossierPage.motifhh;
    this.client = TabsPage.tabLangue.client;
    if (Variables.device === 63) {
      this.device = false;
    } else {
      this.device = true;
    }

    Variables.checconnection().then(res => {
      if (res === false) {
        this.connection = false;
        this.GetClientByNumDossOff(this.client, this.patient.getdossier());
        this.findMedIntervenatByNumDossOff(this.medecinList, this.patient.getdossier());
      }
      else {
        this.connection = true;
        this.findMedIntervenatByNumDoss(this.patient.getdossier());
      }
    });
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }


  GetClientByNumDossOff(client, numDoss) {
    this.clientserv = new ClientService(this.sqlite);
    this.clientserv.getClients(client, numDoss, this.codeClinique).then(res => {
      this.client = res;
    })
  }

  findMedIntervenatByNumDoss(numDoss) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:findMedIntervenatByNumDoss>' +
      '<numDoss>' + numDoss + '</numDoss>' +
      '</ser:findMedIntervenatByNumDoss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var xml = xmlhttp.responseXML;
          var x, i;
          x = xml.getElementsByTagName("return");
          var medecin;
          for (i = 0; i < x.length; i++) {
            medecin = new Medecin();
            medecin.setcodMed(x[i].children[1].children[3].textContent);
            medecin.setnomMed(x[i].children[1].children[4].textContent);
            medecin.setdesignationSpecialite(x[i].children[1].children[5].children[1].textContent);
            medecin.setcodeClinique(this.codeClinique);
            this.medecinList.push(medecin);
          }
          this.medecinserv = new MedecinService(this.sqlite);
          this.medecinserv.verifMedecin(this.medecinList, numDoss, this.codeClinique).then(res => {
            if (res === false) {
              this.medecinserv.getMedecins(this.medecinList, numDoss, this.codeClinique);
            }
          });
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  findMedIntervenatByNumDossOff(medecinList, numDoss) {
    this.medecinserv = new MedecinService(this.sqlite);
    this.medecinList = this.medecinserv.getMedecins(medecinList, numDoss, this.codeClinique);

  }
}
