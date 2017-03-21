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
        this.codeClinique = this.navParams.get("codeClinique");
        this.user = new Users;
        //  this.verifuser();
    }
    HomePage.prototype.connecter = function (login, password) {
        var _this = this;
        try {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
            var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                '<ser:Authentification>' +
                '<username>' + login + '</username>' +
                '<password>' + password + '</password>' +
                '</ser:Authentification>' +
                '</soapenv:Body>' +
                '</soapenv:Envelope>';
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        try {
                            _this.xml = xmlhttp.responseXML;
                            var x;
                            x = _this.xml.getElementsByTagName("return");
                            _this.user.setactif(x[0].children[0].textContent);
                            _this.user.setchStat(x[0].children[1].textContent);
                            _this.user.setcodeMedecinInfirmier(x[0].children[2].textContent);
                            _this.user.setcodePin(x[0].children[3].textContent);
                            _this.user.setdateModPwd(x[0].children[4].textContent);
                            _this.user.setdernierDateCnx(x[0].children[5].textContent);
                            _this.user.setdescription(x[0].children[6].textContent);
                            _this.user.setgrp(x[0].children[7].textContent);
                            _this.user.setmatricule(x[0].children[8].textContent);
                            _this.user.setnatureUserDS(x[0].children[9].textContent);
                            _this.user.setoldGrp(x[0].children[10].textContent);
                            _this.user.setpassWord(x[0].children[11].textContent);
                            _this.user.setuserName(x[0].children[12].textContent);
                            _this.user.setvalidCptRend(x[0].children[13].textContent);
                            _this.user.setvalidPHNuit(x[0].children[14].textContent);
                            _this.tabLangue = {
                                tabLangue: _this.navParams.data.tabLangue
                            };
                            _this.userserv = new UserService();
                            //      if (this.userserv.verifUser() === false) {
                            _this.userserv.getUser(_this.user, _this.codeClinique);
                            //    }
                            _this.navCtrl.push(ListePage, { tabLangue: _this.tabLangue, langue: _this.navParams.get("langue") });
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
        this.navCtrl.push(ListePage, { tabLangue: this.tabLangue, langue: this.navParams.get("langue"), codeClinique: this.codeClinique });
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