import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {Consigne} from "../../models/Consigne";

@Component({
  selector: 'page-consigne',
  templateUrl: 'consigne.html',
  providers: [Variables]
})
export class ConsignePage {
  consigne: Array<Consigne> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.getPlanificationTacheInfirmierByNumDossAndType("16002649","all","all");

    console.log(this.consigne);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsignePage');
  }

  /*
   CreatePlanificationTacheInfirmiereForTablette(type, heure,details,userCreate, numdoss,codemed,etat) {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
   var sr =
   '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
   '<soapenv:Header/>' +
   '<soapenv:Body>' +
   '<ser:CreatePlanificationTacheInfirmiereForTablette>' +
   '<numdoss>' + numdoss + '</numdoss>' +
   '<details>' + details + '</details>' +
   '<type>' + type + '</type>' +
   '<heure>' + heure + '</heure>' +
   '<userCreate>' + userCreate + '</userCreate>' +
   '<etat>' + etat + '</etat>' +
   '<codemed>' + codemed + '</codemed>' +
   '</ser:CreatePlanificationTacheInfirmiereForTablette>' +
   '</soapenv:Body>' +
   '</soapenv:Envelope>';

   xmlhttp.onreadystatechange = () => {
   if (xmlhttp.readyState == 4) {
   if (xmlhttp.status == 200) {
   try {
   var xml = xmlhttp.responseXML;

   } catch (Error) {
   }
   }
   }
   }
   xmlhttp.setRequestHeader('Content-Type', 'text/xml');
   xmlhttp.responseType = "document";
   xmlhttp.send(sr);
   }
   */

  getPlanificationTacheInfirmierByNumDossAndType(numDoss, type, etat) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:getPlanificationTacheInfirmierByNumDossAndType>' +
      '<numDoss>' + numDoss + '</numDoss>' +
      '<type>' + type + '</type>' +
      '<etat>' + etat + '</etat>' +
      '</ser:getPlanificationTacheInfirmierByNumDossAndType>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var xml;
          xml = xmlhttp.responseXML;
          var x, i;
          x = xml.getElementsByTagName("return");

          var c;
          var tempsEnMs = new Date().getFullYear();
          var d;
          for (i = 0; i < x.length; i++) {
            c = new Consigne();
            if (x[i].childElementCount === 19) {
              c.setcodeExamen(x[i].children[0].textContent);
              c.setcodeMedecin(x[i].children[1].textContent);
              c.setcodeinf(x[i].children[2].textContent);
              c.setdate(x[i].children[3].textContent);
              c.setdateDelete(x[i].children[4].textContent);
              c.setdateRealisation(x[i].children[5].textContent);
              c.setdatetache(x[i].children[6].textContent);
              c.setdetails(x[i].children[7].textContent);
              c.setetat(x[i].children[8].textContent);
              c.setheurtache(x[i].children[9].textContent);
              c.setid(x[i].children[10].textContent);
              c.setlistCode(x[i].children[11].textContent);
              c.setnomMed(x[i].children[12].textContent);
              c.setnumeroDossier(x[i].children[13].textContent);
              c.setobservation(x[i].children[14].textContent);
              c.settype(x[i].children[15].textContent);
              c.setuserCreate(x[i].children[16].textContent);
              c.setuserDelete(x[i].children[17].textContent);
              c.setuserRealise(x[i].children[18].textContent);
            }
            else if (x[i].childElementCount === 18) {
              c.setcodeExamen(x[i].children[0].textContent);
              c.setcodeMedecin(x[i].children[1].textContent);
              c.setcodeinf(x[i].children[2].textContent);
              c.setdate(x[i].children[3].textContent);
              c.setdateDelete(x[i].children[4].textContent);
              c.setdateRealisation(x[i].children[5].textContent);
              c.setdatetache(x[i].children[6].textContent);
              c.setdetails(x[i].children[7].textContent);
              c.setetat(x[i].children[8].textContent);
              c.setheurtache(x[i].children[9].textContent);
              c.setid(x[i].children[10].textContent);
              c.setlistCode(x[i].children[11].textContent);
              c.setnomMed("");
              c.setnumeroDossier(x[i].children[12].textContent);
              c.setobservation(x[i].children[13].textContent);
              c.settype(x[i].children[14].textContent);
              c.setuserCreate(x[i].children[15].textContent);
              c.setuserDelete(x[i].children[16].textContent);
              c.setuserRealise(x[i].children[17].textContent);

            }
            this.consigne.push(c);


          }

        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
}
