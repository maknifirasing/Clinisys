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
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Variables } from "../../providers/variables";
import { Clinique } from "../../models/Clinique";
import { HomePage } from "../home/home";
import { CliniqueService } from "../../services/CliniqueService";
import { UserService } from "../../services/UserService";
import { ListePage } from "../liste/liste";
import { Langue } from "../../models/Langue";
import { LangueService } from "../../services/LangueService";
var ListeCliniquePage = (function () {
    function ListeCliniquePage(navCtrl, navParams, Url, viewCtrl, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.viewCtrl = viewCtrl;
        this.platform = platform;
        this.cliniqueact = [];
        this.cliniqueaut = [];
        this.clinique = [];
        this.users = [];
        this.langes = [];
        this.viewCtrl.showBackButton(false);
        this.tabLangue = navParams.get("tabLangue");
        this.langue = navParams.get("langue");
        Variables.checconnection().then(function (connexion) {
            if (connexion === false) {
                _this.connection = false;
                _this.ListCliniqueOff(_this.clinique);
            }
            else {
                _this.connection = true;
                _this.ListClinique();
            }
        });
    }
    ListeCliniquePage.prototype.ListClinique = function () {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:ListCliniqueForAndroid/>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
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
                        _this.clinique.push(c);
                    }
                    _this.getcliniques(_this.clinique);
                    _this.clinserv = new CliniqueService();
                    _this.clinserv.verifClinique(_this.clinique).then(function (res) {
                        if (res === false) {
                            _this.clinserv.getCliniques(_this.clinique);
                        }
                    });
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    ListeCliniquePage.prototype.getcliniques = function (cliniques) {
        var _this = this;
        this.cliniqueact = [];
        this.cliniqueact.length = 0;
        this.cliniqueaut = [];
        this.cliniqueaut.length = 0;
        this.test = false;
        this.userserv = new UserService();
        this.userserv.getAllUser().then(function (res) {
            if (res.length > 0) {
                for (var i = 0; i < cliniques.length; i++) {
                    if (_this.exist(res, cliniques[i].getcode()) === true) {
                        _this.cliniqueact.push(cliniques[i]);
                    }
                    else {
                        _this.cliniqueaut.push(cliniques[i]);
                    }
                }
            }
            else {
                _this.cliniqueaut = cliniques;
            }
            if (_this.cliniqueact.length > 0) {
                _this.test = true;
            }
        });
    };
    ListeCliniquePage.prototype.exist = function (t, code) {
        for (var j = 0; j < t.length; j++) {
            if (t[j].getcodeClinique() === code) {
                return true;
            }
        }
        return false;
    };
    ListeCliniquePage.prototype.ListCliniqueOff = function (cliniques) {
        var _this = this;
        this.clinserv = new CliniqueService();
        this.clinserv.getCliniques(cliniques).then(function (resact) {
            _this.getcliniques(resact);
        });
    };
    ListeCliniquePage.prototype.goToHomePage = function (codeC) {
        var _this = this;
        this.userserv = new UserService();
        this.userserv.verifUser(codeC.getcode()).then(function (user) {
            if (user === false) {
                _this.navCtrl.push(HomePage, {
                    tabLangue: _this.tabLangue,
                    langue: _this.langue,
                    codeClinique: codeC.getcode(),
                    nomClinique: codeC.getnom(),
                    url: codeC.geturl()
                });
            }
            else {
                _this.langserv = new LangueService();
                _this.langserv.verifLangue().then(function (res) {
                    if (res === true) {
                        _this.langserv.getLangues(_this.langes).then(function (lg) {
                            var l = new Langue();
                            l.setlangue(lg.getlangue());
                            l.setmatricule(lg.getmatricule());
                            l.setcodeClinique(codeC.getcode());
                            l.setnomClinique(codeC.getnom());
                            l.seturl(lg.geturl());
                            _this.langes.push(l);
                            _this.langserv.deleteLangues().then(function (delet) {
                                if (delet === true) {
                                    _this.langserv._insertLangues(_this.langes);
                                }
                            });
                        });
                    }
                    _this.navCtrl.setRoot(ListePage, {
                        tabLangue: _this.tabLangue,
                        langue: _this.langue,
                        codeClinique: codeC.getcode(),
                        nomClinique: codeC.getnom(),
                        url: codeC.geturl()
                    });
                });
            }
        });
    };
    return ListeCliniquePage;
}());
ListeCliniquePage = __decorate([
    Component({
        selector: 'page-liste-clinique',
        templateUrl: 'liste-clinique.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables, ViewController, Platform])
], ListeCliniquePage);
export { ListeCliniquePage };
//# sourceMappingURL=liste-clinique.js.map