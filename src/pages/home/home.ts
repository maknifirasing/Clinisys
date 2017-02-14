import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Users} from '../../models/Users';
import {ListePage} from "../liste/liste";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  err: string;
  xml: any;
  user: Users;
  tabBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = new Users;

  }




  connecter(login, password) {
    this.err = "";
    try {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://192.168.0.65:8084/dmi-core/DossierSoinWSService?wsdl', true);
      var sr =
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<ser:Authentification>' +
        '<username>' + login + '</username>' +
        '<password>' + password + '</password>' +
        '</ser:Authentification>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            try {
              this.xml = xmlhttp.responseXML;
              var x;
              x = this.xml.getElementsByTagName("return");
              this.user.setactif(x[0].children[0].textContent);
              this.user.setchStat(x[0].children[1].textContent);
              this.user.setcodeMedecinInfirmier(x[0].children[2].textContent);
              this.user.setcodePin(x[0].children[3].textContent);
              this.user.setdateModPwd(x[0].children[4].textContent);
              this.user.setdernierDateCnx(x[0].children[5].textContent);
              this.user.setdescription(x[0].children[6].textContent);
              this.user.setgrp(x[0].children[7].textContent);
              this.user.setmatricule(x[0].children[8].textContent);
              this.user.setnatureUserDS(x[0].children[9].textContent);
              this.user.setoldGrp(x[0].children[10].textContent);
              this.user.setpassWord(x[0].children[11].textContent);
              this.user.setuserName(x[0].children[12].textContent);
              this.user.setvalidCptRend(x[0].children[13].textContent);
              this.user.setvalidPHNuit(x[0].children[14].textContent);
              this.navCtrl.push(ListePage);
            } catch (Error) {
              this.err = "verifier votre login ou password!"
            }
          }
        }
      }

      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.responseType = "document";
      xmlhttp.send(sr);
    } catch (Error) {
      this.err = "verifier votre connextion!"
    }
  }
}
