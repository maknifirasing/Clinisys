import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";

@Component({
  selector: 'page-consigne',
  templateUrl: 'consigne.html',
  providers: [Variables]
})
export class ConsignePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsignePage');
  }

  /*
   CreatePlanificationTacheInfirmiereForTablette(type, heure,details,userCreate, numdoss,codemed,etat) {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
   var sr =
   '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
   '<soapenv:Header/>' +
   '<soapenv:Body>' +
   '<ser:CreatePlanificationTacheInfirmiereForTablette>' +
   '<numdoss>' + numdoss + '</numdoss>' +
   '<details>' + details + '</details>' +
   '<type>' + type + '</type>' +
   '<heure>' + heure + '</heure>' +
   '<userCreate>' + userCreate + '</userCreate>' +
   '<etat>' + etat + '</etat>' +
   '<codemed>' + codemed + '</codemed>' +
   '</ser:CreatePlanificationTacheInfirmiereForTablette>' +
   '</soapenv:Body>' +
   '</soapenv:Envelope>';

   xmlhttp.onreadystatechange = () => {
   if (xmlhttp.readyState == 4) {
   if (xmlhttp.status == 200) {
   try {
   var xml = xmlhttp.responseXML;

   } catch (Error) {
   }
   }
   }
   }
   xmlhttp.setRequestHeader('Content-Type', 'text/xml');
   xmlhttp.responseType = "document";
   xmlhttp.send(sr);
   }
   */
}
