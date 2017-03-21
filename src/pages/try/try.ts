import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Patient} from "../../models/Patient";
import {DateFeuille} from "../../models/DateFeuille";
import {Variables} from "../../providers/variables";

/*
  Generated class for the Try page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-try',
  templateUrl: 'try.html',
  providers: [Variables]
})
export class TryPage {
  xml: any;
  patient: Array<Patient> = [];
  patientliste: Array<Patient> = [];
  dtFeuille: any;
  dtFeuilleserv: any;
  datefeuille: Array<DateFeuille> = [];
  tabLangue: any;
med:string;
date:string;
dateArr:string;
  codeClinique: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.med="medecin foulen foulen foulen";
    this.liste("admin", "", "all");
    this.DateFeuille();
this.date=" En Ligne: Derniére mise a jour le 15/03/2017 08:37:10";
this.dateArr=" على الانترنت: آخر تحديث 15/03/2017 08:37:10";
console.log("a "+this.dateArr.substr(0,25));
  this.patientliste = this.patient;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TryPage');
  }
  /*async getPersonFullNameUsingAsync() {
    let response = await fetch('./data/person.json');
    let person = await response.json();
    console.log(`${person.firstName} ${person.lastName}`);
  }*/
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

        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
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

        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }


}
