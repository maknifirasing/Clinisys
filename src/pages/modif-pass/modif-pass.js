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
import { Variables } from "../../providers/variables";
import { Users } from "../../models/Users";
import { Langue } from "../../models/Langue";
import { UserService } from "../../services/UserService";
import { LangueService } from "../../services/LangueService";
import { ListePage } from "../liste/liste";
import { SQLite } from "@ionic-native/sqlite";
var ModifPassPage = (function () {
    function ModifPassPage(navCtrl, navParams, Url, sqlite) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.sqlite = sqlite;
        this.users = [];
        this.langes = [];
        this.codeClinique = this.navParams.get("codeClinique");
        this.tabLangue = navParams.get("tabLangue");
        this.langue = navParams.get("langue");
        this.nomClinique = navParams.get("nomClinique");
        this.userserv = new UserService(this.sqlite);
        this.userserv.getUser(this.users, this.codeClinique).then(function (res) {
            _this.user = res;
        });
    }
    ModifPassPage.prototype.connecter = function (passWord, newpass, confirm) {
        var _this = this;
        if (passWord === this.user.getpassWord() && newpass === confirm) {
            try {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
                var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
                    '<soapenv:Header/>' +
                    '<soapenv:Body>' +
                    '<ser:ChangerMot2Passe>' +
                    '<Login>' + this.user.getuserName() + '</Login>' +
                    '<AncienMdp>' + passWord + '</AncienMdp>' +
                    '<NewMdp>' + newpass + '</NewMdp>' +
                    '</ser:ChangerMot2Passe>' +
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
                                user.setmatricule(_this.user.getmatricule());
                                user.setpassWord(newpass);
                                user.setuserName(_this.user.getuserName());
                                user.setcodeClinique(_this.codeClinique);
                                _this.users.push(user);
                                _this.userserv.deleteUsers(_this.codeClinique).then(function (res) {
                                    if (res === true) {
                                        _this.userserv.getUser(_this.users, _this.codeClinique);
                                        _this.langserv = new LangueService(_this.sqlite);
                                        var l = new Langue();
                                        l.setlangue(_this.langue);
                                        l.setmatricule(user.getmatricule());
                                        l.setcodeClinique(_this.codeClinique);
                                        l.setnomClinique(_this.nomClinique);
                                        _this.langes.push(l);
                                        _this.langserv.deleteLangues().then(function (delet) {
                                            if (delet === true) {
                                                _this.langserv.getLangues(_this.langes);
                                            }
                                        });
                                        _this.navCtrl.setRoot(ListePage, {
                                            tabLangue: _this.tabLangue,
                                            langue: _this.langue,
                                            codeClinique: _this.codeClinique,
                                            nomClinique: _this.nomClinique
                                        });
                                    }
                                });
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
        }
        else {
            this.err = this.tabLangue.err;
        }
    };
    return ModifPassPage;
}());
ModifPassPage = __decorate([
    Component({
        selector: 'page-modif-pass',
        templateUrl: 'modif-pass.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables, SQLite])
], ModifPassPage);
export { ModifPassPage };
//# sourceMappingURL=modif-pass.js.map