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
var ListeCliniquePage = (function () {
    function ListeCliniquePage(navCtrl, navParams, Url, viewCtrl, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.viewCtrl = viewCtrl;
        this.platform = platform;
        this.clinique = [];
        this.users = [];
        this.langes = [];
        this.viewCtrl.showBackButton(false);
        this.tabLangue = navParams.get("tabLangue");
        this.langue = navParams.get("langue");
        this.platform.ready().then(function () {
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
        });
    }
    ListeCliniquePage.prototype.ListClinique = function () {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
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
                    var x, i;
                    x = xml.getElementsByTagName("return");
                    for (i = 0; i < x.length; i++) {
                        _this.c = new Clinique();
                        _this.c.setcode(x[i].children[0].textContent);
                        _this.c.setid(x[i].children[1].textContent);
                        _this.c.setnom(x[i].children[2].textContent);
                        _this.c.seturl(x[i].children[3].textContent);
                        _this.clinique.push(_this.c);
                    }
                    _this.clinserv = new CliniqueService();
                    _this.clinserv.getCliniques(_this.clinique);
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    ListeCliniquePage.prototype.ListCliniqueOff = function (cliniques) {
        this.clinserv = new CliniqueService();
        this.clinique = this.clinserv.getCliniques(cliniques);
    };
    ListeCliniquePage.prototype.goToHomePage = function (codeC) {
        /*
           this.userserv = new UserService();
           this.userserv.verifUser(codeC.getcode()).then(user => {
             if (user === false) {
               this.navCtrl.push(HomePage, {
                 tabLangue: this.tabLangue,
                 langue: this.langue,
                 codeClinique: codeC.getcode(),
                 nomClinique: codeC.getnom()
               });
             } else {
               this.langserv = new LangueService();
               this.langserv.verifLangue().then(res => {
                 if (res === true) {
                   this.langserv.getLangues(this.langes).then(lg => {
                     var l = new Langue();
                     l.setlangue(lg.getlangue());
                     l.setmatricule(lg.getmatricule());
                     l.setcodeClinique(codeC.getcode());
                     l.setnomClinique(codeC.getnom());
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
                   nomClinique: codeC.getnom()
                 });
               });
             }
           });*/
        this.navCtrl.push(HomePage, {
            tabLangue: this.tabLangue,
            langue: this.langue,
            codeClinique: codeC.getcode(),
            nomClinique: codeC.getnom()
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