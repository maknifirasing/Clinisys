import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Client} from "../../models/Client";
import {Variables} from "../../providers/variables";

/*
 Generated class for the ClientDetail page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-try',
  templateUrl: 'try.html',
  providers: [Variables]
})
export class TryPage {
  clientList: Array<Client> = [];
  image:string;
  nom:string;
  prenom:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.image=navParams.get("image");
    this.nom=navParams.get("nom");
    this.prenom=navParams.get("prenom");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientDetailPage');
  }

  GetClientByNumDoss(numDoss){
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
          d=new Date();
          for (i = 0; i < x.length; i++) {
            client = new Client();
            client.setadrCli(x[i].children[0].textContent);
            d=(x[i].children[3].textContent).substr(0,9);
            client.setdatNai(d);
            client.setlibNat(x[i].children[67].children[1].textContent);
            client.setnumTel(x[i].children[78].textContent);
            client.setetage(x[i].children[76].children[0].children[3].textContent);
            client.setnumCha(x[i].children[76].children[2].textContent);
            client.setnumdoss(x[i].children[77].textContent);
            client.setidentifiant(x[i].children[18].textContent);
            this.clientList.push(client);
          }
        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
}
