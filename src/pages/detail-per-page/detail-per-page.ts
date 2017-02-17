import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
/*
 Generated class for the DetailPerPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-detail-per-page',
  templateUrl: 'detail-per-page.html',
  providers:[Variables]
})
export class DetailPerPagePage {
  nom: string;
  age: string;
  numDoss: string;
  GetClientByNumDossTest: boolean = false
  constructor(public navCtrl: NavController, public navParams: NavParams,private Url:Variables) {
    this.nom = navParams.get("nom");
    this.age = navParams.get("age");
    this.numDoss=navParams.get("numDoss");
  }

  GetClientByNumDoss(numDoss){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url+'DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:GetClientByNumDoss>' +
      '<numdoss>' + numDoss + '</numdoss>' +
      '</ser:GetClientByNumDoss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.GetClientByNumDossTest = true;
            var xml = xmlhttp.responseXML;
            var x, i;
            x = xml.getElementsByTagName("return");
            var s;

          } catch (Error) {
            this.GetClientByNumDossTest = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  ionViewDidLoad() {
    this.GetClientByNumDoss(this.numDoss);
   // this.datenaiss = this.datenaiss.split("T", 9)[0].toString();
  }

}
