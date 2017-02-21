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
  chLabo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.countPdfT = 0;
    this.countPdf = 0;
    this.chLabo = " (" + this.countPdfT + "/" + this.countPdf + ")";
    this.findAllLaboByNumDossier(navParams.data.pass.getdossier());
    console.log("cccc",this.chLabo);
  }

  ionViewDidLoad() {
  }

  findAllLaboByNumDossier(numdoss) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
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
            this.countPdf = x.length;
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
              if (l.getcontenuePDF() === "true") {
                this.LabosT.push(l);
                this.countPdfT++;
              }
              else if (l.getcontenuePDF() === "false") {
                this.LabosF.push(l);
              }
            }
            this.chLabo = " (" + this.countPdfT + "/" + this.countPdf + ")";
            console.log("find "+this.chLabo);
          } catch (Error) {
          }
        }
      }
      console.log("findgfd "+this.chLabo);
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
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
