import {Component} from '@angular/core';
import {NavController, NavParams,Platform} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {ExamenRadio} from "../../models/ExamenRadio";
import {Document} from "../../models/Document";
import {HistDossier} from "../../models/HistDossier";
import {HistDossierService} from "../../services/HistDossierService";
declare var cordova: any;
@Component({
  selector: 'page-examen-radio',
  templateUrl: 'examen-radio.html',
  providers: [Variables]
})

export class ExamenRadioPage {
  GetExamenRadioByNumDossResponseTest: boolean = false;
  examenRT: Array<ExamenRadio> = [];
  examenRF: Array<ExamenRadio> = [];
  document: Array<Document> = [];
  url: string;
  histD: Array<HistDossier> = [];
  histd = new HistDossier();
  histserv: any;
  connection: boolean;
  pass: any;
  codeClinique: any;
  langue: any;
  tabLangue: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables,platform:Platform) {
    platform.ready().then(() => {
      cordova.InAppBrowser.open('http://192.168.0.5:8084/dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=6d303a74-a8cc-43c3-8815-bdc917fbeac1',"_system","location=yes");
    })
    this.examenRF = navParams.get("examenRF");
    this.examenRT = navParams.get("examenRT");
    this.tabLangue = navParams.get("tabLangue");
    this.pass = navParams.get("pass");
    this.codeClinique = navParams.get("codeClinique");
    this.langue = navParams.get("langue");
    if (Variables.checconnection() === "No network connection") {
      this.connection = false;
    } else {
      this.connection = true;
    }
    this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique);
  }

  ionViewDidLoad() {

  }
  getdocumentById2(doc) {
    console.log("in getdocument22");

  }
  getdocumentById(observ) {
   // this.url = this.Url.url + "dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=" + observ;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:getdocumentById>' +
      '<id>' + observ + '</id>' +
      '</ser:getdocumentById>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;
          var x, i;
          x = xml.getElementsByTagName("return");
          var doc;
          for (i = 0; i < x.length; i++) {
            doc = new Document();
            doc.setaccessUsersGrp(x[i].children[0].children[0].textContent);
            doc.setarborescenceID(x[i].children[0].children[1].textContent);
            doc.setIDArborPere(x[i].children[0].children[2].textContent);
            doc.setnomarborescence(x[i].children[0].children[3].textContent);
            doc.setdatedoc(x[i].children[1].textContent);
            doc.setdescription(x[i].children[2].textContent);
            doc.setdoc(x[i].children[3].textContent);
            doc.setdocID(x[i].children[4].textContent);
            doc.setextension(x[i].children[5].textContent);
            doc.setnomdoc(x[i].children[6].textContent);
            doc.setusers(x[i].children[7].textContent);

            this.document.push(doc);
          }
        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  historiqueOff(hist, numDoss, codeClinique) {
    this.histserv = new HistDossierService();
    this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(res => {
      this.histd = res.getdate();
    });
  }

}
