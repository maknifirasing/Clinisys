import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MotifHospitalisation} from '../../models/motifHospitalisation';
import {ListePage} from "../liste/liste";
import {ContactPage} from "../contact/contact";
import {AboutPage} from "../about/about";

@Component({
  selector: 'page-dossier',
  templateUrl: 'dossier.html'
})

export class DossierPage implements OnInit {
  m = new MotifHospitalisation();
  json: any;
  xml: any;
  public id: any;
  public numDoss: any;
  public img: any;
  public nom: any;
  public age: any;
  public ch: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get("identifiant");
    this.numDoss = navParams.get("numeroDossier");
    this.img = navParams.get("image");
    this.nom = navParams.get("nom");
    this.age = navParams.get("age");
    this.ch = navParams.get("chambre");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DossierPage');
  }

  ngOnInit() {

    this.GetAllMotifHospitalisationByNumDoss();
  }

  GetAllMotifHospitalisationByNumDoss() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://192.168.0.65:8084/dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:GetAllMotifHospitalisationByNumDoss>' +
      '<numDoss>' + this.numDoss + '</numDoss>' +
      '</ser:GetAllMotifHospitalisationByNumDoss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, m, drdv, dsortie, hrdv, hsortie;
          var day = "";
          var month = "";
          var year = "";
          var minu = "";
          var second = "";
          var hour = "";
          x = this.xml.getElementsByTagName("return");
          this.m.setconclusion(x[0].children[0].textContent);
          drdv = new Date(x[0].children[1].textContent);
          day = drdv.getDay();
          month = drdv.getMonth();
          year = drdv.getFullYear();
          this.m.setdateRdv(day + "/" + month + "/" + year);
          dsortie = new Date(x[0].children[2].textContent);
          day = dsortie.getDay();
          month = dsortie.getMonth();
          year = dsortie.getFullYear();
          this.m.setdateSortie(day + "/" + month + "/" + year);
          this.m.setgroupeSang(x[0].children[3].textContent);
          hrdv = new Date(x[0].children[4].textContent);
          minu = hrdv.getMinutes();
          hour = hrdv.getHours();
          second = hrdv.getSeconds();
          this.m.setheureRdv(hour + " : " + minu + " : " + second);
          hsortie = new Date(x[0].children[5].textContent);
          minu = hrdv.getMinutes();
          hour = hrdv.getHours();
          second = hrdv.getSeconds();
          this.m.setheureSortie(hour + " : " + minu + " : " + second);
          this.m.sethistoiremaladie(x[0].children[6].textContent);
          this.m.setmotifhospitalisation(x[0].children[7].textContent);
          this.m.setnumdoss(x[0].children[8].textContent);
          this.m.setobservationSejour(x[0].children[9].textContent);
          this.m.setpoid(x[0].children[10].textContent);
          this.m.settaille(x[0].children[11].textContent);
          this.m.settraitementHabituelle(x[0].children[12].textContent);
          this.m.settraitementSejour(x[0].children[13].textContent);
          this.m.settraitementSortie(x[0].children[14].textContent);
          this.m.setutilisateurMotif(x[0].children[15].textContent);
          return this.m;
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
}
