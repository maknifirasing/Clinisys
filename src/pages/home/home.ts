import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Users} from '../../models/Users';
import {ListePage} from "../liste/liste";
import {Variables} from "../../providers/variables";
import {UserService} from "../../services/UserService";
import {Langue} from "../../models/Langue";
import {LangueService} from "../../services/LangueService";
import {SQLite} from "@ionic-native/sqlite";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Variables]
})
export class HomePage {
  err: string;
  xml: any;
  users: Array<Users> = [];
  errConn: string;
  tabLangue: any;
  userserv: any;
  codeClinique: string;
  langue: any;
  nomClinique: string;
  url: string;
  langserv: any;
  langes: Array<Langue> = [];
  pathimage=Variables.path;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, private sqlite: SQLite) {
    this.codeClinique = this.navParams.get("codeClinique");
    this.tabLangue = navParams.get("tabLangue");
    this.langue = navParams.get("langue");
    this.nomClinique = navParams.get("nomClinique");
    this.url = navParams.get("url");

  }

  connecter(userName, passWord) {
    try {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
      var sr =
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<ser:Authentification>' +
        '<username>' + userName + '</username>' +
        '<password>' + passWord + '</password>' +
        '</ser:Authentification>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            try {

              this.xml = xmlhttp.responseXML;
              var x, user;
              x = this.xml.getElementsByTagName("return");
              user = new Users();
              user.setmatricule(x[0].children[8].textContent);
              user.setpassWord(x[0].children[11].textContent);
              user.setuserName(x[0].children[12].textContent);
              user.setcodeClinique(this.codeClinique);
              this.users.push(user);
              if (this.users.length > 0) {
                this.userserv = new UserService(this.sqlite);
                this.userserv.verifUser(this.codeClinique).then(res => {
                  if (res === false) {
                    this.userserv.getUser(this.users, this.codeClinique);
                  }
                });
                this.langserv = new LangueService(this.sqlite);
                this.langserv.verifLangue().then(result => {
                  var l = new Langue();
                  l.setlangue(this.langue);
                  l.setnom(user.getuserName());
                  l.setmatricule(user.getmatricule());
                  l.setcodeClinique(this.codeClinique);
                  l.setnomClinique(this.nomClinique);
                  l.seturl(this.url);
                  this.langes.push(l);
                  if (result === true) {
                    this.langserv.getLangues(this.langes).then(lg => {
                      this.langserv.deleteLangues().then(delet => {
                        if (delet === true) {
                          this.langserv._insertLangues(this.langes);
                        }
                      });
                    });
                  } else {
                    this.langserv.getLangues(this.langes);
                  }
                  this.navCtrl.setRoot(ListePage, {
                    tabLangue: this.tabLangue,
                    langue: this.langue,
                    codeClinique: this.codeClinique,
                    nomClinique: this.nomClinique
                  });
                });
              }
              else {
                this.err = this.tabLangue.err;
              }

            } catch (Error) {
              this.err = this.tabLangue.err;
            }
          }
        }
      }

      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.responseType = "document";
      xmlhttp.send(sr);
    } catch (Error) {
      this.errConn = this.tabLangue.errConn;
    }
  }

  conn() {
    this.navCtrl.push(ListePage, {
      tabLangue: this.tabLangue,
      langue: this.langue,
      codeClinique: this.codeClinique,
      nomClinique: this.nomClinique
    });
  }

}
