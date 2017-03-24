var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Users } from '../../models/Users';
import { ListePage } from "../liste/liste";
import { Variables } from "../../providers/variables";
import { UserService } from "../../services/UserService";
var HomePage = (function () {
    function HomePage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.users = [];
        this.codeClinique = this.navParams.get("codeClinique");
        this.tabLangue = navParams.get("tabLangue");
        this.langue = navParams.get("langue");
        this.nomClinique = navParams.get("nomClinique");
    }
    HomePage.prototype.connecter = function (userName, passWord) {
        var _this = this;
        try {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
            var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                '<ser:Authentification>' +
                '<username>' + userName + '</username>' +
                '<password>' + passWord + '</password>' +
                '</ser:Authentification>' +
                '</soapenv:Body>' +
                '</soapenv:Envelope>';
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        try {
                            _this.xml = xmlhttp.responseXML;
                            var x, user;
                            x = _this.xml.getElementsByTagName("return");
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
                            user.setcodeClinique(_this.codeClinique);
                            _this.users.push(user);
                            if (_this.users.length > 0) {
                                _this.userserv = new UserService();
                                //   this.userserv.verifUser(userName, passWord, this.codeClinique).then(res => {
                                _this.userserv.verifUser().then(function (res) {
                                    if (res === false) {
                                        //       this.userserv.getUser(this.users, userName, passWord, this.codeClinique);
                                        _this.userserv.getUser(_this.users);
                                    }
                                });
                                _this.navCtrl.setRoot(ListePage, {
                                    tabLangue: _this.tabLangue,
                                    langue: _this.langue,
                                    codeClinique: _this.codeClinique,
                                    nomClinique: _this.nomClinique
                                });
                            }
                            else {
                                _this.err = _this.tabLangue.err;
                            }
                        }
                        catch (Error) {
                            _this.err = _this.tabLangue.err;
                        }
                    }
                }
            };
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        }
        catch (Error) {
            this.errConn = this.tabLangue.errConn;
        }
    };
    HomePage.prototype.verifuser = function () {
        this.userserv = new UserService();
        alert("ee4 " + this.userserv.verifUser(this.codeClinique));
    };
    /* checkNetwork() {
       Variables.checconnection().then(connexion=> {
      alert("connexion " +connexion);
         });
     }
   */
    HomePage.prototype.checkNetwork = function () {
        console.log("connexion " + Variables.checconnection());
        //  alert("connexion " + Variables.checconnection());
    };
    HomePage.prototype.doesConnectionExist = function () {
        Variables.checservice().then(function (res) {
            alert("serv " + res);
        });
    };
    HomePage.prototype.conn = function () {
        this.navCtrl.push(ListePage, {
            tabLangue: this.tabLangue,
            langue: this.langue,
            codeClinique: this.codeClinique
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map