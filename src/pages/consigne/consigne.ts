import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {Consigne} from "../../models/Consigne";
import {Content} from "ionic-angular";
import {DossierPage} from "../dossier/dossier";
import {ConsigneService} from "../../services/ConsigneService";
import {tabBadge} from "../../models/tabBadge";
import {tabBadgeConsigneService} from "../../services/tabBadgeConsigneService";
import {SQLite} from "@ionic-native/sqlite";
import {TabsPage} from "../tabs/tabs";
import {ClientDetailPage} from "../client-detail/client-detail";

@Component({
  selector: 'page-consigne',
  templateUrl: 'consigne.html',
  providers: [Variables]
})
export class ConsignePage {

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
  pathimage = Variables.path;
  dateFeuille: string;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, public platform: Platform, private sqlite: SQLite) {
    this.codeClinique = TabsPage.tabLangue.codeClinique;
    this.tabLangue = TabsPage.tabLangue.tabLangue;
    this.pass = TabsPage.tabLangue.pass;
    this.langue = TabsPage.tabLangue.langue;
    this.consigne = TabsPage.tabLangue.consigne;
    this.type = TabsPage.tabLangue.typeconsigne;
    this.etat = TabsPage.tabLangue.etatconsigne;
    this.dateFeuille=TabsPage.tabLangue.dateFeuille;
    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;
        this.getPlanificationTacheInfirmierByNumDossAndTypeOff(this.consigne, this.pass.getdossier(), this.type, this.etat, this.codeClinique);
      } else {
        this.connection = true;
      }
    });
    this.histd = DossierPage.hist;
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
            (<HTMLInputElement>document.getElementById("createinput")).value = "";
            var xml;
            xml = xmlhttp.responseXML;
            var x
            x = xml.getElementsByTagName("return");
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
          var x, i, c, d;
          x = xml.getElementsByTagName("return");
          var date = new Date();
          date.setFullYear(Number(this.dateFeuille.substr(6, 4)));
          date.setMonth(Number(this.dateFeuille.substr(3, 2)) - 1);
          date.setDate(Number(this.dateFeuille.substr(0, 2)));
          date.setHours(0);
          date.setMinutes(0);

          for (i = x.length - 1; i >= 0; i--) {
            c = new Consigne();
            if (x[i].childElementCount === 17) {
              c.setcodeMedecin(x[i].children[1].textContent);
              c.setdatetache(x[i].children[5].textContent);
              c.setdetails(x[i].children[6].textContent);
              c.setetat(x[i].children[7].textContent);
              c.setheurtache(x[i].children[8].textContent);
              c.setnumeroDossier(x[i].children[11].textContent);
              c.setuserCreate(x[i].children[14].textContent);
              c.setcodeClinique(codeClinique);
            }
            else if (x[i].childElementCount > 17) {
              c.setcodeMedecin(x[i].children[1].textContent);
              c.setdatetache(x[i].children[6].textContent);
              c.setdetails(x[i].children[7].textContent);
              c.setetat(x[i].children[8].textContent);
              c.setheurtache(x[i].children[9].textContent);
              c.setnumeroDossier(x[i].children[12].textContent);
              c.setuserCreate(x[i].children[15].textContent);
              c.setcodeClinique(codeClinique);
            }
            d = new Date(c.getheurtache());
            if ((date < d)&&(c.getetat()==='NL' || c.getetat()==='AF' ||c.getetat()==='F')) {
              this.consigne.push(c);
              if (c.getetat() === "F") {
                this.coountConsigneT++;
              }
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

  deletePlanificationTacheInfirmierByNumDossAndType(numDoss, type, etat, codeClinique) {
    this.countConsigneserv = new tabBadgeConsigneService(this.sqlite);
    this.countConsigneserv.deletetabBadgeConsignes(numDoss, codeClinique);

    this.consigneserv = new ConsigneService(this.sqlite);
    this.consigneserv.deleteConsignes(numDoss, codeClinique).then(res => {
      if (res === true) {
        this.getPlanificationTacheInfirmierByNumDossAndType(numDoss, type, etat, codeClinique);
      }
    })
  }

  goToInfPage() {
    this.navCtrl.push(ClientDetailPage);
  }
}
