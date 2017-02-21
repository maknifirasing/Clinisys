import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {ListPreanesthesie} from "../../models/ListPreanesthesie";

/*
 Generated class for the ListPreanesthesie page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-preanesthesie',
  templateUrl: 'list-preanesthesie.html',
  providers: [Variables]
})
export class ListPreanesthesiePage {
  ListPreanesthesieByNumeroDossierTest: boolean = false;
  ListeP: Array<ListPreanesthesie> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {

  }

  ionViewDidLoad() {
    this.findListPreanesthesieByNumeroDossierResponse(this.navParams.data.pass.getdossier());
  }

  findListPreanesthesieByNumeroDossierResponse(numDoss) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:findListPreanesthesieByNumeroDossier>' +
      '<numeroDossier>' + numDoss + '</numeroDossier>' +
      '</ser:findListPreanesthesieByNumeroDossier>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.ListPreanesthesieByNumeroDossierTest = true;
            var xml = xmlhttp.responseXML;
            var x, i,hdebut;
            x = xml.getElementsByTagName("return");
            var LP,hfin;
            var minu = "";
            var second = "";
            var hour = "";
            for (i = 0; i < x.length; i++) {
              LP = new ListPreanesthesie();
              LP.setacte(x[i].children[0].textContent);
              LP.setchirurgien(x[i].children[1].textContent);
              LP.setcodeActe(x[i].children[2].textContent);
              LP.setcodeExamen(x[i].children[3].textContent);
              LP.setcodeMedecinReanimateur(x[i].children[4].textContent);
              LP.setcodeMedecinchirurgi(x[i].children[5].textContent);
              LP.setcodeMedecinchirurgien(x[i].children[6].textContent);
              LP.setcodePostop(x[i].children[7].textContent);
              LP.setdateacte(x[0].children[8].textContent);
              LP.setdatedemande(x[0].children[8].textContent);
              LP.setetatReservationBloc(x[i].children[10].textContent);
              LP.sethasAnesth(x[i].children[11].textContent);
              LP.sethasPost(x[i].children[12].textContent);
              LP.sethasPre(x[i].children[13].textContent);

              hdebut = new Date(x[0].children[14].textContent);
              minu = hdebut.getMinutes();
              hour = hdebut.getHours();
              second = hdebut.getSeconds();
              LP.setheureDebut(hour + " : " + minu + " : " + second);

              hfin= new Date(x[0].children[15].textContent);
              minu = hfin.getMinutes();
              hour = hfin.getHours();
              second = hfin.getSeconds();
              LP.setheureFin(hour + " : " + minu + " : " + second);
              LP.setid(x[i].children[16].textContent);
              LP.setidentifiant(x[i].children[17].textContent);
              LP.setkc(x[i].children[18].textContent);
              LP.setnom(x[i].children[19].textContent);
              LP.setnomReanimateur(x[i].children[20].textContent);
              LP.setnumeroDossier(x[i].children[21].textContent);
              LP.setprenom(x[i].children[22].textContent);
              this.ListeP.push(LP);
            }
            if (this.ListeP.length === 0) {
              this.ListPreanesthesieByNumeroDossierTest = false;
            }

          } catch (Error) {
            this.ListPreanesthesieByNumeroDossierTest = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
}
