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
  LabosT: Array<Labo> = [];
  LabosF: Array<Labo> = [];
  pdf: string;
  countPdfT: number;
  countPdf: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {

    this.countPdfT = 0;
    this.countPdf = 0;
    this.LabosT = this.navParams.data.Labost;
    this.LabosF = this.navParams.data.Labosf;

  }

  ionViewDidLoad() {

  }


  openURL(numAdmission) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:creationPDF>' +
      '<numDemande>' + numAdmission + '</numDemande>' +
      '</ser:creationPDF>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            var xml = xmlhttp.responseXML;
            var x;
            x = xml.getElementsByTagName("return");
            this.pdf = this.Url.url + "dmi-web/LaboPDF/" + x[0].childNodes[0].nodeValue.split("1.")[0] + ".pdf";
            console.log("p   " + x[0].childNodes[0].nodeValue);
            console.log("pdf   " + this.pdf);
            this.navCtrl.push(PdfViewPage, {pdf: this.pdf});
          } catch (Error) {
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
}
