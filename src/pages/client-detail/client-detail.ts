import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Client} from "../../models/Client";
import {Variables} from "../../providers/variables";
import {Medecin} from "../../models/Medecin";
import {ClientService} from "../../services/ClientService";
import {MedecinService} from "../../services/MedecinService";

@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html',
  providers: [Variables]
})
export class ClientDetailPage {
  clientList: Array<Client> = [];
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.patient = navParams.get("patient");
    this.motif = navParams.get("motif");
    this.tabLangue = navParams.get("tabLangue");
    this.langue = navParams.get("langue");
    this.codeClinique = navParams.get("codeClinique");
    Variables.checconnection().then(res => {
      if (res === false) {
        this.connection = false;
        this.GetClientByNumDossOff(this.clientList, this.patient.getdossier());
        this.findMedIntervenatByNumDossOff(this.medecinList,this.patient.getdossier());
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
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
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
          var client;
          var d,d2;
          d = new Date();
          for (i = 0; i < x.length; i++) {
            client = new Client();
            client.setadrCli(x[i].children[0].textContent);
            d = (x[i].children[3].textContent).substr(0, 9);
            client.setdatNai(d);
            client.setlibNat(x[i].children[67].children[1].textContent);
            client.setnumTel(x[i].children[78].textContent);
            client.setetage(x[i].children[83].children[0].children[3].textContent);
            client.setnumCha(x[i].children[83].children[2].textContent);
            client.setnumdoss(x[i].children[6].children[8].textContent);
            client.setidentifiant(x[i].children[18].textContent);
            d2 = (x[i].children[4].textContent).substr(0, 9);
            client.setdateArr(d2);
            client.setcodeClinique(this.codeClinique);
            this.clientList.push(client);
          }
          this.clientserv = new ClientService();
          this.clientserv.verifClient(this.clientList, numDoss, this.codeClinique).then(res => {
            if (res === false) {
              this.clientserv.getClients(this.clientList, numDoss, this.codeClinique);
            }
          });
        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetClientByNumDossOff(clientList, numDoss) {
    this.clientserv = new ClientService();
    this.clientList = this.clientserv.getClients(clientList, numDoss, this.codeClinique);
  }

  findMedIntervenatByNumDoss(numDoss) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/ReaWSService?wsdl', true);
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
          this.medecinserv = new MedecinService();
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

  findMedIntervenatByNumDossOff(medecinList,numDoss) {
    this.medecinserv = new MedecinService();
    this.medecinList = this.medecinserv.getMedecins(medecinList, numDoss, this.codeClinique);

  }
}
