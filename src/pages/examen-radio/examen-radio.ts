import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {ExamenRadio} from "../../models/ExamenRadio";
import {Document} from "../../models/Document";
@Component({
  selector: 'page-examen-radio',
  templateUrl: 'examen-radio.html',
  providers: [Variables]
})
export class ExamenRadioPage implements OnInit {
  GetExamenRadioByNumDossResponseTest: boolean = false;
  examenR: Array<ExamenRadio> = [];
  document: Array<Document> = [];
  numDoss: string;
  img: string;
  nom: string;
  age: string;
  ch: string;
  dat: string;
  url:string;
  getdocumentByIdTest: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.numDoss = navParams.data.numDoss;
    this.img = navParams.data.img;
    this.nom = navParams.data.nom;
    this.age = navParams.data.age;
    this.ch = navParams.data.ch;
    this.dat = navParams.data.dat;
  }

  ngOnInit() {
    console.log(this.numDoss);
    this.GetExamenRadioByNumDossResponse(this.numDoss);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamenRadioPage');

  }

  getdocumentById(observ) {
    this.url ="http://192.168.0.140:8084/dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc="+observ;

  }


  GetExamenRadioByNumDossResponse(numDoss) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'WebServiceMedecinEventsService?wsdl', true);
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
              ex.setmedecin(x[i].children[8].textContent);
              ex.setnature(x[i].children[9].textContent);
              ex.setnumeroDossier(x[i].children[10].textContent);
              ex.setnumeroExamen(x[i].children[11].textContent);
              ex.setobserv(x[i].children[12].textContent);
              ex.setresultat(x[i].children[13].textContent);
              this.examenR.push(ex);

            }
            if (this.examenR.length === 0) {
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
