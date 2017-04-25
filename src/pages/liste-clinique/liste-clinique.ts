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
import {SQLite} from "@ionic-native/sqlite";

@Component({
  selector: 'page-liste-clinique',
  templateUrl: 'liste-clinique.html',
  providers: [Variables]
})
export class ListeCliniquePage {
  cliniqueact: Array<Clinique> = [];
  cliniqueaut: Array<Clinique> = [];
  clinique: Array<Clinique> = [];
  clinserv: any;
  connection: boolean;
  tabLangue: any;
  langue: any;
  userserv: any;
  users: Array<Users> = [];
  langserv: any;
  langes: Array<Langue> = [];
  test: boolean;
  pathimage=Variables.path;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, private viewCtrl: ViewController, public platform: Platform,private sqlite: SQLite) {
    this.viewCtrl.showBackButton(false);
    this.tabLangue = navParams.get("tabLangue");
    this.langue = navParams.get("langue");
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
  }

  ListClinique() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
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
          var x, i, c;
          x = xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            c = new Clinique();
            c.setcode(x[i].children[0].textContent);
            c.setnom(x[i].children[2].textContent);
            c.seturl(x[i].children[3].textContent);
            this.clinique.push(c);
          }
          this.getcliniques(this.clinique);
          this.clinserv = new CliniqueService(this.sqlite);
          this.clinserv.verifClinique(this.clinique).then(res => {
            if (res === false) {
              this.clinserv.getCliniques(this.clinique);
            }
          });
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  getcliniques(cliniques) {
    this.cliniqueact = [];
    this.cliniqueact.length = 0;
    this.cliniqueaut = [];
    this.cliniqueaut.length = 0;
    this.test = false;

    this.userserv = new UserService(this.sqlite);
    this.userserv.getAllUser().then(res => {
        if (res.length > 0) {
          for (var i = 0; i < cliniques.length; i++) {
            if (this.exist(res, cliniques[i].getcode()) === true) {
              this.cliniqueact.push(cliniques[i]);
            }
            else {
              this.cliniqueaut.push(cliniques[i]);
            }
          }
        } else {
          this.cliniqueaut = cliniques;
        }
        if (this.cliniqueact.length > 0) {
          this.test = true;
        }

      }
    );
  }


  exist(t, code): boolean {
    for (var j = 0; j < t.length; j++) {
      if (t[j].getcodeClinique() === code) {
        return true;
      }
    }
    return false;
  }

  ListCliniqueOff(cliniques) {
    this.clinserv = new CliniqueService(this.sqlite);
    this.clinserv.getCliniques(cliniques).then(resact => {
      this.getcliniques(resact);
    });
  }

  goToHomePage(codeC) {
    this.userserv = new UserService(this.sqlite);
    this.userserv.verifUser(codeC.getcode()).then(user => {
      if (user === false) {
        this.navCtrl.push(HomePage, {
          tabLangue: this.tabLangue,
          langue: this.langue,
          codeClinique: codeC.getcode(),
          nomClinique: codeC.getnom(),
          url: codeC.geturl()
        });
      } else {
        this.langserv = new LangueService(this.sqlite);
        this.langserv.verifLangue().then(res => {
          if (res === true) {
            this.langserv.getLangues(this.langes).then(lg => {
              var l = new Langue();
              l.setlangue(lg.getlangue());
              l.setnom(lg.getnom());
              l.setmatricule(lg.getmatricule());
              l.setcodeClinique(codeC.getcode());
              l.setnomClinique(codeC.getnom());
              l.seturl(lg.geturl());
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
            nomClinique: codeC.getnom(),
            url: codeC.geturl()
          });
        });
      }
    });
  }
}
