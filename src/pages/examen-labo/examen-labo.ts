import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {Labo} from "../../models/Labo";
import {PdfViewPage} from "../pdf-view/pdf-view";
import {HistDossier} from "../../models/HistDossier";
import {HistDossierService} from "../../services/HistDossierService";
import {LaboFService} from "../../services/LaboFService";
import {LaboTService} from "../../services/LaboTService";

@Component({
  selector: 'page-examen-labo',
  templateUrl: 'examen-labo.html',
  providers: [Variables]
})
export class ExamenLaboPage {
  LabosT: Array<Labo> = [];
  LabosF: Array<Labo> = [];
  pdf: string;
  histD: Array<HistDossier> = [];
  histd = new HistDossier();
  histserv: any;
  connection: boolean;
  tabLangue: any;
  pass: any;
  codeClinique: any;
  langue: any;
  LabosFs: any;
  LabosTs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables,public platform: Platform) {
    this.tabLangue = navParams.get("tabLangue");
    this.codeClinique = navParams.get("codeClinique");
    this.pass = navParams.get("pass");
    this.langue = navParams.get("langue");
    this.LabosT = navParams.get("Labost");
    this.LabosF = navParams.get("Labosf");
    this.platform.ready().then(() => {
      Variables.checconnection().then(connexion => {
        if (connexion === false) {
          this.connection = false;
          this.findAllLaboByNumDossierOff(this.pass.getdossier(), this.codeClinique);
        } else {
          this.connection = true;
        }
      });
    });
    this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique)
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

  gotPdf(pdf) {
    this.navCtrl.push(PdfViewPage, {pdf: pdf.getpdf()});
  }

  historiqueOff(hist, numDoss, codeClinique) {
    this.histserv = new HistDossierService();
    this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(res => {
      this.histd = res.getdate();
    });
  }

  findAllLaboByNumDossierOff(numDoss, codeClinique) {
    this.LabosFs = new LaboFService();
    this.LabosF = this.LabosFs.getLabos(this.LabosF, numDoss, codeClinique);

    this.LabosTs = new LaboTService();
    this.LabosT = this.LabosTs.getLabos(this.LabosT, numDoss, codeClinique);
  }
}
