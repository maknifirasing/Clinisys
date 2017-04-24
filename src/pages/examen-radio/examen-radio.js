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
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Variables } from "../../providers/variables";
import { Document } from "../../models/Document";
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { DocumentService } from "../../services/DocumentService";
import { ExamenRadioTService } from "../../services/ExamenRadioTService";
import { ExamenRadioFService } from "../../services/ExamenRadioFService";
import { ClientDetailPage } from "../client-detail/client-detail";
import { DossierPage } from "../dossier/dossier";
import { HistDoc } from "../../models/HistDoc";
import { HistDocService } from "../../services/HistDocService";
import { SQLite } from "@ionic-native/sqlite";
var ExamenRadioPage = (function () {
    function ExamenRadioPage(navCtrl, navParams, Url, platform, themeableBrowser, alertCtrl, transfer, file, sqlite) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.platform = platform;
        this.themeableBrowser = themeableBrowser;
        this.alertCtrl = alertCtrl;
        this.transfer = transfer;
        this.file = file;
        this.sqlite = sqlite;
        this.GetExamenRadioByNumDossResponseTest = false;
        this.examenRT = [];
        this.examenRF = [];
        this.document = [];
        this.storageDirectory = '';
        this.histDoc = [];
        this.histdoc = new HistDoc();
        this.tabLangue = navParams.get("tabLangue");
        this.pass = navParams.get("pass");
        this.examenRF = navParams.get("examenRF");
        this.examenRT = navParams.get("examenRT");
        this.codeClinique = navParams.get("codeClinique");
        this.langue = navParams.get("langue");
        Variables.checconnection().then(function (connexion) {
            if (connexion === false) {
                _this.connection = false;
                _this.GetExamenRadioByNumDossResponseOff(_this.pass.getdossier(), _this.codeClinique);
            }
            else {
                _this.connection = true;
            }
        });
        this.histd = DossierPage.hist;
    }
    ExamenRadioPage.prototype.ionViewDidLoad = function () {
    };
    ExamenRadioPage.prototype.getdocumentById = function (observ) {
        var _this = this;
        observ += ".html";
        //  observ += "a2a01d9b-684b-478f-824e-5ae8a95bcc0b.html";
        this.platform.ready().then(function () {
            // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
            if (!_this.platform.is('cordova')) {
                return false;
            }
            if (_this.platform.is('ios')) {
                _this.storageDirectory = cordova.file.documentsDirectory;
            }
            else if (_this.platform.is('android')) {
                _this.storageDirectory = cordova.file.dataDirectory;
            }
            else {
                // exit otherwise, but you could add further types here e.g. Windows
                return false;
            }
            Variables.checconnection().then(function (connexion) {
                if (connexion === false) {
                    _this.connection = false;
                    _this.histdocserv = new HistDocService(_this.sqlite);
                    _this.histdocserv.getHistDocs(_this.histDoc, _this.pass.getdossier(), observ, _this.codeClinique).then(function (result) {
                        _this.histdoc = result.getdate();
                        _this.docserv = new DocumentService(_this.sqlite);
                        _this.docserv.getDocuments(_this.document, observ, _this.codeClinique).then(function (res) {
                            _this.retrieveImageOff(res);
                        });
                    });
                }
                else {
                    _this.connection = true;
                    _this.histdocserv = new HistDocService(_this.sqlite);
                    var hi = new HistDoc();
                    var d = new Date();
                    hi.setnumDoss(_this.pass.getdossier());
                    hi.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
                    hi.setcodeClinique(_this.codeClinique);
                    hi.setnom(observ);
                    _this.histDoc.push(hi);
                    var doc = new Document();
                    doc.seturl(_this.storageDirectory + observ);
                    doc.setobserv(observ);
                    doc.setcodeClinique(_this.codeClinique);
                    _this.url = "http://37.59.230.40:8084/dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=" + observ;
                    var url = "http://37.59.230.40:8084/";
                    _this.document.push(doc);
                    try {
                        _this.histdocserv.deleteHistDocs(_this.pass.getdossier(), _this.codeClinique, observ);
                        _this.histdocserv.getHistDocs(_this.histDoc, _this.pass.getdossier(), _this.codeClinique, observ).then(function (result) {
                            _this.histdoc = result.getdate();
                            _this.docserv = new DocumentService(_this.sqlite);
                            _this.docserv.verifDocument(_this.document, observ, _this.codeClinique).then(function (res) {
                                if (res === false) {
                                    _this.docserv.getDocuments(_this.document, observ, _this.codeClinique);
                                }
                            });
                            Variables.checservice(url).then(function (res) {
                                if (res === true) {
                                    _this.open(_this.url);
                                    _this.retrieveImage(_this.url, doc);
                                }
                                else {
                                    alert("document introuvable");
                                }
                            });
                        });
                    }
                    catch (Error) {
                        _this.histdocserv.getHistDocs(_this.histDoc, _this.pass.getdossier(), _this.codeClinique, observ).then(function (result) {
                            _this.histdoc = result.getdate();
                            _this.docserv = new DocumentService(_this.sqlite);
                            _this.docserv.verifDocument(_this.document, observ, _this.codeClinique).then(function (res) {
                                if (res === false) {
                                    _this.docserv.getDocuments(_this.document, observ, _this.codeClinique);
                                }
                            });
                            Variables.checservice(url).then(function (res) {
                                if (res === true) {
                                    _this.open(_this.url);
                                    _this.retrieveImage(_this.url, doc);
                                }
                                else {
                                    alert("document introuvable");
                                }
                            });
                        });
                    }
                }
            });
        });
    };
    ExamenRadioPage.prototype.open = function (url) {
        if (((this.langue === "francais") || (this.langue === "anglais")) && (this.connection)) {
            var options = {
                statusbar: {
                    color: '#0277bd',
                },
                toolbar: {
                    height: 44,
                    color: '#0277bd'
                },
                title: {
                    color: '#FFFFFF',
                    staticText: this.tabLangue.titreEnligne + " " + this.histdoc,
                    showPageTitle: false
                },
                backButton: {
                    wwwImage: '/android_asset/www/assets/img/green.png',
                    align: 'left'
                }
            };
            var browser = this.themeableBrowser.create(url, '_blank', options);
        }
        if (((this.langue === "francais") || (this.langue === "anglais")) && (!this.connection)) {
            var options = {
                statusbar: {
                    color: '#0277bd',
                },
                toolbar: {
                    height: 44,
                    color: '#0277bd'
                },
                title: {
                    color: '#FFFFFF',
                    staticText: this.tabLangue.titreHorsLigne + " " + this.histdoc,
                    showPageTitle: false
                },
                backButton: {
                    wwwImage: '/android_asset/www/assets/img/red.png',
                    align: 'left'
                }
            };
            var browser = this.themeableBrowser.create(url, '_blank', options);
        }
        if ((this.langue === "arabe") && (this.connection)) {
            var options = {
                statusbar: {
                    color: '#0277bd',
                },
                toolbar: {
                    height: 44,
                    color: '#0277bd'
                },
                title: {
                    color: '#FFFFFF',
                    staticText: this.histdoc + " " + this.tabLangue.titreEnligne,
                    showPageTitle: false,
                },
                backButton: {
                    wwwImage: '/android_asset/www/assets/img/green.png',
                    align: 'left'
                }
            };
            var browser = this.themeableBrowser.create(url, '_blank', options);
        }
        if ((this.langue === "arabe") && (!this.connection)) {
            var options = {
                statusbar: {
                    color: '#0277bd',
                },
                toolbar: {
                    height: 44,
                    color: '#0277bd'
                },
                title: {
                    color: '#FFFFFF',
                    staticText: this.histdoc + " " + this.tabLangue.titreHorsLigne,
                    showPageTitle: false
                },
                backButton: {
                    wwwImage: '/android_asset/www/assets/img/red.png',
                    align: 'left'
                }
            };
            var browser = this.themeableBrowser.create(url, '_blank', options);
        }
    };
    ExamenRadioPage.prototype.downloadImage = function (url, doc) {
        var _this = this;
        this.platform.ready().then(function () {
            var fileTransfer = _this.transfer.create();
            fileTransfer.download(url, _this.storageDirectory + doc.getobserv()).then(function (entry) {
                /*    const alertSuccess = this.alertCtrl.create({
                 title: `Download Succeeded!`,
                 subTitle: `${doc.getobserv()} was successfully downloaded to: ${entry.toURL()}`,
                 buttons: ['Ok']
                 });
                 alertSuccess.present();
                 */
            }, function (error) {
                /*
                 const alertFailure = this.alertCtrl.create({
                 title: `Download Failed!`,
                 subTitle: `${doc.getobserv()} was not successfully downloaded. Error code: ${error.code}`,
                 buttons: ['Ok']
                 });
                 alertFailure.present();
                 */
            });
        });
    };
    ExamenRadioPage.prototype.retrieveImage = function (url, doc) {
        var _this = this;
        var file = doc.getobserv();
        this.file.checkFile(this.storageDirectory, file)
            .then(function () {
            /*    const alertSuccess = this.alertCtrl.create({
             title: `File retrieval Succeeded!`,
             subTitle: `${file} was successfully retrieved from: ${this.storageDirectory}`,
             buttons: ['Ok']
             });
             return alertSuccess.present();
             */
        })
            .catch(function (err) {
            /*
             const alertFailure = this.alertCtrl.create({
             title: `File retrieval Failed!`,
             subTitle: `${file} was not successfully retrieved. Error Code: ${err.code}`,
             buttons: ['Ok']
             });
             return alertFailure.present();*/
            _this.downloadImage(url, doc);
        });
    };
    ExamenRadioPage.prototype.retrieveImageOff = function (doc) {
        var _this = this;
        var file = doc.getobserv();
        this.file.checkFile(this.storageDirectory, file)
            .then(function () {
            _this.url = doc.geturl();
            _this.open(_this.url);
            /*    const alertSuccess = this.alertCtrl.create({
             title: `File retrieval Succeeded!`,
             subTitle: `${file} was successfully retrieved from: ${this.storageDirectory}`,
             buttons: ['Ok']
             });
             return alertSuccess.present();
             */
        })
            .catch(function (err) {
            /*
             const alertFailure = this.alertCtrl.create({
             title: `File retrieval Failed!`,
             subTitle: `${file} was not successfully retrieved. Error Code: ${err.code}`,
             buttons: ['Ok']
             });
             return alertFailure.present();*/
        });
    };
    ExamenRadioPage.prototype.GetExamenRadioByNumDossResponseOff = function (numDoss, codeClinique) {
        this.RadiosTs = new ExamenRadioTService(this.sqlite);
        this.examenRT = this.RadiosTs.getExamenRadios(this.examenRT, numDoss, codeClinique);
        this.RadiosFs = new ExamenRadioFService(this.sqlite);
        this.examenRF = this.RadiosFs.getExamenRadios(this.examenRF, numDoss, codeClinique);
    };
    ExamenRadioPage.prototype.goToInfPage = function (patient) {
        this.navCtrl.push(ClientDetailPage, {
            patient: patient,
            motif: DossierPage.motifhh,
            tabLangue: this.tabLangue,
            langue: this.langue,
            codeClinique: this.codeClinique
        });
    };
    return ExamenRadioPage;
}());
ExamenRadioPage = __decorate([
    Component({
        selector: 'page-examen-radio',
        templateUrl: 'examen-radio.html',
        providers: [Variables, ThemeableBrowser]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables, Platform, ThemeableBrowser, AlertController,
        Transfer, File, SQLite])
], ExamenRadioPage);
export { ExamenRadioPage };
//# sourceMappingURL=examen-radio.js.map