import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Users} from '../../models/Users';
import {ListePage} from "../liste/liste";
import {Variables} from "../../providers/variables";
import {UserService} from "../../services/UserService";


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
  nomClinique:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.codeClinique = this.navParams.get("codeClinique");
    this.tabLangue = navParams.get("tabLangue");
    this.langue = navParams.get("langue");
    this.nomClinique = navParams.get("nomClinique");

  }

  connecter(userName, passWord) {
    try {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
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
              user.setactif(x[0].children[0].textContent);
              user.setchStat(x[0].children[1].textContent);
              user.setcodeMedecinInfirmier(x[0].children[2].textContent);
              user.setcodePin(x[0].children[3].textContent);
              user.setdateModPwd(x[0].children[4].textContent);
              user.setdernierDateCnx(x[0].children[5].textContent);
              user.setdescription(x[0].children[6].textContent);
              user.setgrp(x[0].children[7].textContent);
              user.setmatricule(x[0].children[8].textContent);
              user.setnatureUserDS(x[0].children[9].textContent);
              user.setoldGrp(x[0].children[10].textContent);
              user.setpassWord(x[0].children[11].textContent);
              user.setuserName(x[0].children[12].textContent);
              user.setvalidCptRend(x[0].children[13].textContent);
              user.setvalidPHNuit(x[0].children[14].textContent);
              user.setcodeClinique(this.codeClinique);
              this.users.push(user);
              if (this.users.length > 0) {
                this.userserv = new UserService();
                //   this.userserv.verifUser(userName, passWord, this.codeClinique).then(res => {
                this.userserv.verifUser().then(res => {
                  if (res === false) {
                    //       this.userserv.getUser(this.users, userName, passWord, this.codeClinique);
                    this.userserv.getUser(this.users);
                  }
                });
                this.navCtrl.setRoot(ListePage, {
                  tabLangue: this.tabLangue,
                  langue: this.langue,
                  codeClinique: this.codeClinique,
                  nomClinique:this.nomClinique
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

  verifuser() {
    this.userserv = new UserService();
    alert("ee4 " + this.userserv.verifUser(this.codeClinique));
  }


 /* checkNetwork() {
    Variables.checconnection().then(connexion=> {
   alert("connexion " +connexion);
      });
  }
*/
  checkNetwork() {
    console.log("connexion " + Variables.checconnection());
  //  alert("connexion " + Variables.checconnection());
  }

  doesConnectionExist() {
    Variables.checservice().then(res => {
      alert("serv " + res);
    });
  }

  conn() {
    this.navCtrl.push(ListePage, {
      tabLangue: this.tabLangue,
      langue: this.langue,
      codeClinique: this.codeClinique
    });
  }

}
