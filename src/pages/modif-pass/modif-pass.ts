import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {Users} from "../../models/Users";
import {Langue} from "../../models/Langue";
import {UserService} from "../../services/UserService";
import {LangueService} from "../../services/LangueService";
import {ListePage} from "../liste/liste";

@Component({
  selector: 'page-modif-pass',
  templateUrl: 'modif-pass.html',
  providers: [Variables]
})
export class ModifPassPage {

  err: string;
  xml: any;
  users: Array<Users> = [];
  errConn: string;
  tabLangue: any;
  userserv: any;
  codeClinique: string;
  langue: any;
  nomClinique: string;
  langserv: any;
  langes: Array<Langue> = [];
  user: Users;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.codeClinique = this.navParams.get("codeClinique");
    this.tabLangue = navParams.get("tabLangue");
    this.langue = navParams.get("langue");
    this.nomClinique = navParams.get("nomClinique");
    this.userserv = new UserService();
    this.userserv.getUser(this.users, this.codeClinique).then(res => {
      this.user = res;
    })
  }

  connecter(passWord, newpass, confirm) {
    if (passWord === this.user.getpassWord() && newpass === confirm) {
      try {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
        var sr =
          '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
          '<soapenv:Header/>' +
          '<soapenv:Body>' +
          '<ser:ChangerMot2Passe>' +
          '<Login>' + this.user.getuserName() + '</Login>' +
          '<AncienMdp>' + passWord + '</AncienMdp>' +
          '<NewMdp>' + newpass + '</NewMdp>' +
          '</ser:ChangerMot2Passe>' +
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
                user.setmatricule(this.user.getmatricule());
                user.setpassWord(newpass);
                user.setuserName(this.user.getuserName());
                user.setcodeClinique(this.codeClinique);
                this.users.push(user);


                this.userserv.deleteUsers(this.codeClinique).then(res => {
                  if (res === true) {
                    this.userserv.getUser(this.users, this.codeClinique);

                    this.langserv = new LangueService();
                    var l = new Langue();
                    l.setlangue(this.langue);
                    l.setmatricule(user.getmatricule());
                    l.setcodeClinique(this.codeClinique);
                    l.setnomClinique(this.nomClinique);
                    this.langes.push(l);
                    this.langserv.deleteLangues().then(delet => {
                      if (delet === true) {
                        this.langserv.getLangues(this.langes);
                      }
                    });
                    this.navCtrl.setRoot(ListePage, {
                      tabLangue: this.tabLangue,
                      langue: this.langue,
                      codeClinique: this.codeClinique,
                      nomClinique: this.nomClinique
                    });
                  }
                });

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
    else {
      this.err = this.tabLangue.err;
    }
  }
}
