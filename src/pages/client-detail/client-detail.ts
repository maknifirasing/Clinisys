import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Client} from "../../models/Client";
import {Variables} from "../../providers/variables";
import {DetailPerPagePage} from "../detail-per-page/detail-per-page";
import {SigneCourbe} from "../../models/SigneCourbe";
import {Chart} from 'chart.js';
import  {} from 'chartjs-plugin-zoom';
import {Medecin} from "../../models/Medecin";
/*
 Generated class for the ClientDetail page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html',
  providers: [Variables]
})
export class ClientDetailPage {
  clientList: Array<Client> = [];
  medecinList: Array<Medecin> = [];
  patient: any;
  motif: any;
  tabLangue: any;
  langue: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.patient = navParams.get("patient");
    this.motif = navParams.get("motif");
    this.tabLangue = navParams.get("tabLangue");
    this.langue = navParams.get("langue");
    this.GetClientByNumDoss(navParams.get("numDoss"));
    this.findMedIntervenatByNumDoss(navParams.get("numDoss"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientDetailPage');
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
          var d;
          var d2;
          d = new Date();
          d2 = new Date();
          for (i = 0; i < x.length; i++) {
            client = new Client();
            client.setadrCli(x[i].children[0].textContent);
            d = (x[i].children[3].textContent).substr(0, 9);
            client.setdatNai(d);
            client.setlibNat(x[i].children[67].children[1].textContent);
            client.setnumTel(x[i].children[78].textContent);
            client.setetage(x[i].children[76].children[0].children[3].textContent);
            client.setnumCha(x[i].children[76].children[2].textContent);
            client.setnumdoss(x[i].children[77].textContent);
            client.setidentifiant(x[i].children[18].textContent);
            d2 = (x[i].children[4].textContent).substr(0, 9);
            client.setdateArr(d2);
            this.clientList.push(client);
          }
        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
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
            medecin.setdesignationSpecialite(x[i].children[0].textContent)
            this.medecinList.push(medecin);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
}
