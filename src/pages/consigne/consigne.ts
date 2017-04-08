import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {HistDossier} from "../../models/HistDossier";
import {Consigne} from "../../models/Consigne";
import {Content} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {DossierPage} from "../dossier/dossier";
import {ConsigneService} from "../../services/ConsigneService";

@Component({
  selector: 'page-consigne',
  templateUrl: 'consigne.html',
  providers: [Variables]
})
export class ConsignePage {

  consigne: Array<Consigne> = [];
  histd :any;
  connection: boolean;
  tabLangue: any;
  pass: any;
  codeClinique: any;
  langue: any;
  private consigneserv: any;
  private type: any;
  private etat: any;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, public platform: Platform) {
    this.tabLangue = navParams.get("tabLangue");
    this.codeClinique = navParams.get("codeClinique");
    this.pass = navParams.get("pass");
    this.langue = navParams.get("langue");
    this.consigne = navParams.get("consigne");
    this.type = navParams.get("typeconsigne");
    this.etat = navParams.get("etatconsigne");
    this.platform.ready().then(() => {
      Variables.checconnection().then(connexion => {
        if (connexion === false) {
          this.connection = false;
          this.getPlanificationTacheInfirmierByNumDossAndTypeOff(this.consigne, this.pass.getdossier(), this.type, this.etat, this.codeClinique);
        } else {
          this.connection = true;
        }
      });
    });
    this.histd=DossierPage.hist;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsignePage');
  }

  ionViewDidEnter() {
    //this.content.scrollToBottom(300);//300ms animation speed
    setTimeout(() => {
      this.content.scrollToBottom(300);//300ms animation speed
    });
  }

  getPlanificationTacheInfirmierByNumDossAndTypeOff(consigne, numDoss, type, etat, codeClinique) {
    this.consigneserv = new ConsigneService();
    this.consigne = this.consigneserv.getConsignes(consigne, numDoss, codeClinique, type, etat);
  }

  CreatePlanificationTacheInfirmiereForTablette(details) {
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
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
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
          var xml;
          xml = xmlhttp.responseXML;
          var x, i;
          x = xml.getElementsByTagName("return");
          console.log(xml);
          console.log(x);

        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
}
