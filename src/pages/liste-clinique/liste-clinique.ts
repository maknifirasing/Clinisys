import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {Clinique} from "../../models/Clinique";
import {HomePage} from "../home/home";
import {CliniqueService} from "../../services/CliniqueService";

@Component({
  selector: 'page-liste-clinique',
  templateUrl: 'liste-clinique.html',
  providers: [Variables]
})
export class ListeCliniquePage {
  clinique: Array<Clinique> = [];
  c:any;
  clinserv: any;
  connection: boolean;
  tabLangue: any;
  langue: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables,private viewCtrl: ViewController) {
    this.viewCtrl.showBackButton(false);
    this.tabLangue=navParams.get("tabLangue");
    this.langue = navParams.get("langue");
    if (Variables.checconnection() === "No network connection") {
      this.connection = false;
      this.ListCliniqueOff(this.clinique);
    }
    else {
      this.connection = true;
      this.ListClinique();

    }
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
          var x, i;
          x = xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            this.c = new Clinique();
            this.c.setcode(x[i].children[0].textContent);
            this.c.setid(x[i].children[1].textContent);
            this.c.setnom(x[i].children[2].textContent);
            this.c.seturl(x[i].children[3].textContent);
            this.clinique.push(this.c);
          }
          this.clinserv = new CliniqueService();
          this.clinserv.getCliniques(this.clinique);
        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  ListCliniqueOff(cliniques) {
    this.clinserv = new CliniqueService();
    this.clinique=this.clinserv.getCliniques(cliniques);
  }

  goToHomePage(codeC){
    this.navCtrl.push(HomePage,{tabLangue: this.tabLangue,langue:this.langue,codeClinique:codeC});
  }
}
