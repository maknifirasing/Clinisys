import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {Labo} from "../../models/Labo";
import {PdfViewPage} from "../pdf-view/pdf-view";

@Component({
  selector: 'page-examen-labo',
  templateUrl: 'examen-labo.html',
  providers: [Variables]
})
export class ExamenLaboPage {
  numDoss: string;
  Labos: Array<Labo> = [];
  pdf: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.numDoss = navParams.get("numDoss");
  }

  ionViewDidLoad() {
    this.findAllLaboByNumDossier(this.numDoss);
  }

  findAllLaboByNumDossier(numdoss) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:findAllLaboByNumDossier>' +
      '<numDoss>' + numdoss + '</numDoss>' +
      '</ser:findAllLaboByNumDossier>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            var xml = xmlhttp.responseXML;
            var x, l, i, drdv;
            x = xml.getElementsByTagName("return");
            var day = "";
            var month = "";
            var year = "";
            var minu = "";
            var hour = "";
            for (i = 0; i < x.length; i++) {
              l = new Labo();
              l.setcodeDemande(x[i].children[0].textContent);
              l.setcontenuePDF(x[i].children[1].textContent);
              drdv = new Date(x[i].children[2].textContent);
              day = drdv.getDate();
              month = drdv.getMonth() + 1;
              year = drdv.getFullYear();
              l.setdateDemande(day + "/" + month + "/" + year);
              drdv = new Date(x[i].children[3].textContent);
              day = drdv.getDate();
              month = drdv.getMonth() + 1;
              year = drdv.getFullYear();
              l.setdateRealisation(day + "/" + month + "/" + year);
              l.setdesignation(x[i].children[4].textContent);
              l.setetatExamen(x[i].children[5].textContent);
              l.setid(x[i].children[6].textContent);
              l.setmedecinTraitant(x[i].children[7].textContent);
              l.setnomLabo(x[i].children[8].textContent);
              l.setnumAdmission(x[i].children[9].textContent);
              l.setnumDossier(x[i].children[10].textContent);
              l.setpatient(x[i].children[11].textContent);
              l.setstate(x[i].children[12].textContent);
              l.setuserName(x[i].children[13].textContent);
              l.setvalidation(x[i].children[14].textContent);
              this.Labos.push(l);
              console.log(l.getnumAdmission());
            }
          } catch (Error) {
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  openURL(url) {
    this.pdf = "/android_asset/www/assets/img/sujet_pfe_2017.pdf";
    this.navCtrl.push(PdfViewPage, {pdf: this.pdf});
  }
}
