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
    }
    HomePage.prototype.connecterr = function (userName, passWord) {
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
                            _this.tabLangue = {
                                tabLangue: _this.navParams.data.tabLangue
                            };
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
                                _this.navCtrl.push(ListePage, {
                                    tabLangue: _this.tabLangue,
                                    langue: _this.navParams.get("langue"),
                                    codeClinique: _this.codeClinique
                                });
                            }
                            else {
                                _this.err = _this.navParams.data.tabLangue.err;
                            }
                        }
                        catch (Error) {
                            _this.err = _this.navParams.data.tabLangue.err;
                        }
                    }
                }
            };
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        }
        catch (Error) {
            this.errConn = this.navParams.data.tabLangue.errConn;
        }
    };
    HomePage.prototype.connecter = function (userName, passWord) {
        var _this = this;
        var user = new Users();
        user.setactif(1);
        user.setchStat(1);
        user.setcodeMedecinInfirmier("f");
        user.setcodePin(2);
        user.setdateModPwd("d");
        user.setdernierDateCnx("e");
        user.setdescription("ee");
        user.setgrp("rr");
        user.setmatricule("rr");
        user.setnatureUserDS("rr");
        user.setoldGrp("rr");
        user.setpassWord("rr");
        user.setuserName("rr");
        user.setvalidCptRend("rr");
        user.setvalidPHNuit("rr");
        user.setcodeClinique(this.codeClinique);
        this.tabLangue = {
            tabLangue: this.navParams.data.tabLangue
        };
        this.users.push(user);
        if (this.users.length > 0) {
            this.userserv = new UserService();
            //   this.userserv.verifUser(userName, passWord, this.codeClinique).then(res => {
            this.userserv.verifUser().then(function (res) {
                if (res === false) {
                    //       this.userserv.getUser(this.users, userName, passWord, this.codeClinique);
                    _this.userserv.getUser(_this.users);
                }
            });
            this.navCtrl.push(ListePage, {
                tabLangue: this.tabLangue,
                langue: this.navParams.get("langue"),
                codeClinique: this.codeClinique
            });
        }
        else {
            this.err = this.navParams.data.tabLangue.err;
        }
    };
    HomePage.prototype.verifuser = function () {
        this.userserv = new UserService();
        alert("ee4 " + this.userserv.verifUser(this.codeClinique));
    };
    HomePage.prototype.checkNetwork = function () {
        alert("connexion " + Variables.checconnection());
    };
    HomePage.prototype.doesConnectionExist = function () {
        Variables.checservice(this.Url.url).then(function (res) {
            alert("serv " + res);
        });
    };
    HomePage.prototype.conn = function () {
        this.tabLangue = {
            tabLangue: this.navParams.data.tabLangue
        };
        this.navCtrl.push(ListePage, {
            tabLangue: this.tabLangue,
            langue: this.navParams.get("langue"),
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