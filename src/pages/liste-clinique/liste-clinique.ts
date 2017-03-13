import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {Clinique} from "../../models/Clinique";
import {HomePage} from "../home/home";
/*
 Generated class for the ListeClinique page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-liste-clinique',
  templateUrl: 'liste-clinique.html',
  providers: [Variables]
})
export class ListeCliniquePage {
  clinique: Array<Clinique> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables,private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.viewCtrl.showBackButton(false);
    this.ListClinique();
  }

  ListClinique() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:ListCliniqueForAndroid/>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var xml = xmlhttp.responseXML;
          var x, i,c;
          x = xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            c = new Clinique();
            c.setcode(x[i].children[0].textContent);
            c.setid(x[i].children[1].textContent);
            c.setnom(x[i].children[2].textContent);
            c.seturl(x[i].children[3].textContent);
            this.clinique.push(c);
          }
        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
  goToHomePage(){
    this.navCtrl.push(HomePage,{tabLangue: this.navParams.data.tabLangue,langue:this.navParams.get("langue")});
  }
}
