import {Component} from '@angular/core';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {Clinique} from "../../models/Clinique";
import {HomePage} from "../home/home";
import {CliniqueService} from "../../services/CliniqueService";
import {Users} from "../../models/Users";
import {UserService} from "../../services/UserService";
import {ListePage} from "../liste/liste";
import {Langue} from "../../models/Langue";
import {LangueService} from "../../services/LangueService";

@Component({
  selector: 'page-liste-clinique',
  templateUrl: 'liste-clinique.html',
  providers: [Variables]
})
export class ListeCliniquePage {
  clinique: Array<Clinique> = [];
  c: any;
  clinserv: any;
  connection: boolean;
  tabLangue: any;
  langue: any;
  userserv: any;
  users: Array<Users> = [];
  langserv: any;
  langes: Array<Langue> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, private viewCtrl: ViewController, public platform: Platform) {
    this.viewCtrl.showBackButton(false);
    this.tabLangue = navParams.get("tabLangue");
    this.langue = navParams.get("langue");
    this.platform.ready().then(() => {
      Variables.checconnection().then(connexion => {
        if (connexion === false) {
          this.connection = false;
          this.ListCliniqueOff(this.clinique);
        }
        else {
          this.connection = true;
          this.ListClinique();
        }
      });
    });

  }


  ListClinique() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:ListCliniqueForAndroid/>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var xml = xmlhttp.responseXML;
          var x, i;
          x = xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            this.c = new Clinique();
            this.c.setcode(x[i].children[0].textContent);
            this.c.setnom(x[i].children[2].textContent);
            this.clinique.push(this.c);
          }
          this.clinserv = new CliniqueService();
          this.clinserv.getCliniques(this.clinique);
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  ListCliniqueOff(cliniques) {
    this.clinserv = new CliniqueService();
    this.clinique = this.clinserv.getCliniques(cliniques);
  }

  goToHomePage(codeC) {

    this.userserv = new UserService();
    this.userserv.verifUser(codeC.getcode()).then(user => {
      if (user === false) {
        this.navCtrl.push(HomePage, {
          tabLangue: this.tabLangue,
          langue: this.langue,
          codeClinique: codeC.getcode(),
          nomClinique: codeC.getnom()
        });
      } else {
        this.langserv = new LangueService();
        this.langserv.verifLangue().then(res => {
          if (res === true) {
            this.langserv.getLangues(this.langes).then(lg => {
              var l = new Langue();
              l.setlangue(lg.getlangue());
              l.setmatricule(lg.getmatricule());
              l.setcodeClinique(codeC.getcode());
              l.setnomClinique(codeC.getnom());
              this.langes.push(l);
              this.langserv.deleteLangues().then(delet => {
                if (delet === true) {
                  this.langserv._insertLangues(this.langes);
                }
              });

            });
          }
          this.navCtrl.setRoot(ListePage, {
            tabLangue: this.tabLangue,
            langue: this.langue,
            codeClinique: codeC.getcode(),
            nomClinique: codeC.getnom()
          });
        });
      }
    });

  }
}
