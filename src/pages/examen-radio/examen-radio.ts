import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {ExamenRadio} from "../../models/ExamenRadio";
import {Document} from "../../models/Document";
@Component({
  selector: 'page-examen-radio',
  templateUrl: 'examen-radio.html',
  providers: [Variables]
})
<<<<<<< HEAD
export class ExamenRadioPage{
=======
export class ExamenRadioPage {
>>>>>>> 7b0e36a43bd86a82dd9b92f7098ceefdb82ff7ef
  GetExamenRadioByNumDossResponseTest: boolean = false;
  examenRT: Array<ExamenRadio> = [];
  examenRF: Array<ExamenRadio> = [];
  document: Array<Document> = [];
  url: string;
  getdocumentByIdTest: boolean = false;
  coountexamenRT: number;
  coountexamenR: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.coountexamenR = 0;
  }

  ionViewDidLoad() {
<<<<<<< HEAD
    console.log(this.numDoss);
    this.GetExamenRadioByNumDossResponse(this.numDoss);
=======
    this.GetExamenRadioByNumDossResponse(this.navParams.data.pass.getdossier());
>>>>>>> 7b0e36a43bd86a82dd9b92f7098ceefdb82ff7ef
  }

  getdocumentById(observ) {
    this.url = this.Url.url + "dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=" + observ;

  }


  GetExamenRadioByNumDossResponse(numDoss) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetExamenRadioByNumDoss>' +
      '<numDoss>' + numDoss + '</numDoss>' +
      '</ser:GetExamenRadioByNumDoss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.GetExamenRadioByNumDossResponseTest = true;
            var xml = xmlhttp.responseXML;
            var x, i, dE, dP, drdv, hP;
            x = xml.getElementsByTagName("return");
            var ex;
            var day = "";
            var month = "";
            var year = "";
            var minu = "";
            var second = "";
            var hour = "";
            this.coountexamenR = x.length;
            for (i = 0; i < x.length; i++) {
              ex = new ExamenRadio();
              ex.setcodeExamen(x[i].children[0].textContent);
              ex.setcompterendu(x[i].children[1].textContent);
              dE = new Date(x[i].children[2].textContent);
              day = dE.getDate();
              month = dE.getMonth() + 1;
              year = dE.getFullYear();
              ex.setdateExamen(day + "/" + month + "/" + year);
              dP = new Date(x[i].children[3].textContent);
              day = dP.getDate();
              month = dP.getMonth() + 1;
              year = dP.getFullYear();
              ex.setdatePrevu(day + "/" + month + "/" + year);
              drdv = new Date(x[i].children[4].textContent);
              day = drdv.getDate();
              month = drdv.getMonth() + 1;
              year = drdv.getFullYear();
              ex.setdate_RDV(day + "/" + month + "/" + year);
              ex.setdesignationExamen(x[i].children[5].textContent);
              hP = new Date(x[i].children[6].textContent);
              minu = hP.getMinutes();
              hour = hP.getHours();
              second = hP.getSeconds();
              ex.setheurePrevu(hour + " : " + minu + " : " + second);
              ex.setidres(x[i].children[7].textContent);
              if (x[i].childElementCount === 14) {
                ex.setmedecin(x[i].children[8].textContent);
                ex.setnature(x[i].children[9].textContent);
                ex.setnumeroDossier(x[i].children[10].textContent);
                ex.setnumeroExamen(x[i].children[11].textContent);
                ex.setobserv(x[i].children[12].textContent);
                ex.setresultat(x[i].children[13].textContent);
              }
              else if (x[i].childElementCount === 13) {
                ex.setmedecin(null);
                ex.setnature(x[i].children[8].textContent);
                ex.setnumeroDossier(x[i].children[9].textContent);
                ex.setnumeroExamen(x[i].children[10].textContent);
                ex.setobserv(x[i].children[11].textContent);
                ex.setresultat(x[i].children[12].textContent);
              }
 if (ex.getcompterendu() === "true") {
                this.examenRT.push(ex);
                this.coountexamenRT++;
              }
              else if (ex.getcompterendu() === "false") {
                this.examenRF.push(ex);
              }
            }
            if (this.examenRT.length === 0 && this.examenRF.length === 0) {
              this.GetExamenRadioByNumDossResponseTest = false;
            }
          } catch (Error) {
            this.GetExamenRadioByNumDossResponseTest = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

}
