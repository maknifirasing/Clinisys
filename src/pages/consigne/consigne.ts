import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {Consigne} from "../../models/Consigne";
<<<<<<< HEAD
=======
import {Content} from "ionic-angular";
import {DossierPage} from "../dossier/dossier";
import {ConsigneService} from "../../services/ConsigneService";
import {tabBadge} from "../../models/tabBadge";
import {tabBadgeConsigneService} from "../../services/tabBadgeConsigneService";
import {SQLite} from "@ionic-native/sqlite";
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e

@Component({
  selector: 'page-consigne',
  templateUrl: 'consigne.html',
  providers: [Variables]
})
export class ConsignePage {
  consigne: Array<Consigne> = [];

<<<<<<< HEAD
  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.getPlanificationTacheInfirmierByNumDossAndType("16002649","all","all");

    console.log(this.consigne);
=======
  consigne: Array<Consigne> = [];
  histd: any;
  connection: boolean;
  tabLangue: any;
  pass: any;
  codeClinique: any;
  langue: any;
  private consigneserv: any;
  private type: any;
  private etat: any;
  coountConsigne: any = 0;
  coountConsigneT: any = 0;
  tabgConsigne: Array<tabBadge> = [];
  countConsigneserv: any;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, public platform: Platform,private sqlite: SQLite) {
    this.tabLangue = navParams.get("tabLangue");
    this.codeClinique = navParams.get("codeClinique");
    this.pass = navParams.get("pass");
    this.langue = navParams.get("langue");
    this.consigne = navParams.get("consigne");
    this.type = navParams.get("typeconsigne");
    this.etat = navParams.get("etatconsigne");
    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;
        this.getPlanificationTacheInfirmierByNumDossAndTypeOff(this.consigne, this.pass.getdossier(), this.type, this.etat, this.codeClinique);
      } else {
        this.connection = true;
      }
    });
    this.histd=DossierPage.hist;
  }

  ionViewDidEnter() {
    //this.content.scrollToBottom(300);//300ms animation speed
    setTimeout(() => {
      this.content.scrollToBottom(300);//300ms animation speed
    });
  }

  getPlanificationTacheInfirmierByNumDossAndTypeOff(consigne, numDoss, type, etat, codeClinique) {
    this.consigneserv = new ConsigneService(this.sqlite);
    this.consigne = this.consigneserv.getConsignes(consigne, numDoss, codeClinique, type, etat);
  }

  CreatePlanificationTacheInfirmiereForTablette(details) {
    if (this.connection === true) {
      var c = new Consigne();
      var date = new Date();
      var d = date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDay() + "T"
        + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      c.setnumeroDossier(this.pass.getdossier());
      c.setdetails(details);
      c.settype("Autre");
      c.setheurtache(d);
      c.setuserCreate(this.pass.getnom());
      c.setetat("NL");
      c.setcodeMedecin("");

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
      var sr =
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<ser:CreatePlanificationTacheInfirmiereForTablette>' +
        '<numdoss>' + c.getnumeroDossier() + '</numdoss>' +
        '<details>' + c.getdetails() + '</details>' +
        '<type>' + c.gettype() + '</type>' +
        '<heure>' + c.getheurtache() + '</heure>' +
        '<userCreate>' + c.getuserCreate() + '</userCreate>' +
        '<etat>' + c.getetat() + '</etat>' +
        '<codemed>' + c.getcodeMedecin() + '</codemed>' +
        '</ser:CreatePlanificationTacheInfirmiereForTablette>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            alert("ok");
            var xml;
            xml = xmlhttp.responseXML;
            var x, i;
            x = xml.getElementsByTagName("return");
            console.log(xml);
            console.log(x);
            this.deletePlanificationTacheInfirmierByNumDossAndType(this.pass.getdossier(), this.type, this.etat, this.codeClinique);
          }
        }
      }
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.responseType = "document";
      xmlhttp.send(sr);
    } else {
      alert(this.tabLangue.errConn);
    }
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
  }

  getPlanificationTacheInfirmierByNumDossAndType(numDoss, type, etat, codeClinique) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
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
          var x, i,c;
          x = xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            c = new Consigne();
            if (x[i].childElementCount === 19) {
              c.setcodeMedecin(x[i].children[1].textContent);
              c.setdatetache(x[i].children[6].textContent);
              c.setdetails(x[i].children[7].textContent);
              c.setetat(x[i].children[8].textContent);
              c.setheurtache(x[i].children[9].textContent);
              c.setnumeroDossier(x[i].children[13].textContent);
              c.setuserCreate(x[i].children[16].textContent);
              c.setcodeClinique(codeClinique);
            }
            else if (x[i].childElementCount === 18) {
              c.setcodeMedecin(x[i].children[1].textContent);
              c.setdatetache(x[i].children[6].textContent);
              c.setdetails(x[i].children[7].textContent);
              c.setetat(x[i].children[8].textContent);
              c.setheurtache(x[i].children[9].textContent);
              c.setnumeroDossier(x[i].children[12].textContent);
              c.setuserCreate(x[i].children[15].textContent);
              c.setcodeClinique(codeClinique);
            }
            this.consigne.push(c);
            if (c.getetat() === "F") {
              this.coountConsigneT++;
            }
          }
          this.coountConsigne = this.consigne.length;
          this.consigneserv = new ConsigneService(this.sqlite);
          this.consigneserv.verifConsigne(this.consigne, numDoss, codeClinique, type, etat).then(res => {
            if (res === false) {
              this.consigneserv.getConsignes(this.consigne, numDoss, codeClinique, type, etat);
            }
          });

          var tConsigne = new tabBadge();
          tConsigne.setnumDoss(numDoss);
          tConsigne.setFichier(this.coountConsigne);
          tConsigne.setFichierT(this.coountConsigneT);
          tConsigne.setcodeClinique(codeClinique);
          this.tabgConsigne.push(tConsigne);

          this.countConsigneserv = new tabBadgeConsigneService(this.sqlite);
          this.countConsigneserv.verifTabBadgeConsigne(numDoss, codeClinique).then(res => {
            if (res === false) {
              this.countConsigneserv.getTabBadgeConsigne(this.tabgConsigne, numDoss, codeClinique);
            }
          });
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

<<<<<<< HEAD
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
=======
  deletePlanificationTacheInfirmierByNumDossAndType(numDoss, type, etat, codeClinique) {
    this.countConsigneserv = new tabBadgeConsigneService(this.sqlite);
    this.countConsigneserv.deletetabBadgeConsignes(numDoss, codeClinique);

    this.consigneserv = new ConsigneService(this.sqlite);
    this.consigneserv.deleteConsignes(numDoss, codeClinique).then(res => {
      if (res === true) {
        this.getPlanificationTacheInfirmierByNumDossAndType(numDoss, type, etat, codeClinique);
      }
    })
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
  }
}
