import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Client} from "../../models/Client";
import {Variables} from "../../providers/variables";
import {Medecin} from "../../models/Medecin";
import {ClientService} from "../../services/ClientService";
import {MedecinService} from "../../services/MedecinService";
import {SQLite} from "@ionic-native/sqlite";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables,private sqlite: SQLite) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.patient = navParams.get("patient");
    this.motif = navParams.get("motif");
    this.tabLangue = navParams.get("tabLangue");
    this.langue = navParams.get("langue");
    this.codeClinique = navParams.get("codeClinique");
    Variables.checconnection().then(res => {
      if (res === false) {
        this.connection = false;
        this.GetClientByNumDossOff(this.client, this.patient.getdossier());
        this.findMedIntervenatByNumDossOff(this.medecinList, this.patient.getdossier());
      }
      else {
        this.connection = true;
        this.GetClientByNumDoss(this.patient.getdossier());
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

  GetClientByNumDoss(numDoss) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetClientByNumDoss>' +
      '<numDoss>' + numDoss + '</numDoss>' +
      '</ser:GetClientByNumDoss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var xml = xmlhttp.responseXML;
          var x, i;
          x = xml.getElementsByTagName("return");
          var d, d2;
          d = new Date();
          this.client.setadrCli(x[0].children[0].textContent);
          d = (x[0].children[3].textContent).substr(0, 9);
          this.client.setdatNai(d);
          this.client.setlibNat(x[0].children[74].children[1].textContent);
          this.client.setnumTel(x[0].children[85].textContent);
          this.client.setetage(x[0].children[83].children[0].children[3].textContent);
          this.client.setnumCha(x[0].children[83].children[2].textContent);
          this.client.setnumdoss(x[0].children[6].children[8].textContent);
          this.client.setidentifiant(x[0].children[18].textContent);
          d2 = (x[0].children[4].textContent).substr(0, 9);
          this.client.setdateArr(d2);
          this.client.setcodeClinique(this.codeClinique);
          console.log(x[0].children[74].children[1].textContent);
          console.log(x[0].children[85].textContent);
          this.clientserv = new ClientService(this.sqlite);
          this.clientserv.verifClient(this.client, numDoss, this.codeClinique).then(res => {
            if (res === false) {
              this.clientserv.getClients(this.client, numDoss, this.codeClinique);
            }
          });
        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
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
            medecin.setcodMed(x[i].children[1].children[0].textContent);
            medecin.setnomMed(x[i].children[2].textContent);
            medecin.setdesignationSpecialite(x[i].children[0].textContent);
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
