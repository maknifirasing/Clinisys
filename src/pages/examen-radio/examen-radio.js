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
import { HistDossier } from "../../models/HistDossier";
import { HistDossierService } from "../../services/HistDossierService";
import { File, Transfer } from 'ionic-native';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { DocumentService } from "../../services/DocumentService";
var ExamenRadioPage = (function () {
    function ExamenRadioPage(navCtrl, navParams, Url, platform, themeableBrowser, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.platform = platform;
        this.themeableBrowser = themeableBrowser;
        this.alertCtrl = alertCtrl;
        this.GetExamenRadioByNumDossResponseTest = false;
        this.examenRT = [];
        this.examenRF = [];
        this.document = [];
        this.histD = [];
        this.histd = new HistDossier();
        this.storageDirectory = '';
        this.examenRF = navParams.get("examenRF");
        this.examenRT = navParams.get("examenRT");
        this.tabLangue = navParams.get("tabLangue");
        this.pass = navParams.get("pass");
        this.codeClinique = navParams.get("codeClinique");
        this.langue = navParams.get("langue");
        this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique);
        if (Variables.checconnection() === "No network connection") {
            this.connection = false;
        }
        else {
            this.connection = true;
        }
    }
    ExamenRadioPage.prototype.ionViewDidLoad = function () {
    };
    ExamenRadioPage.prototype.getdocumentById = function (observ) {
        var _this = this;
        observ += ".html";
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
            if (_this.connection === false) {
                _this.docserv = new DocumentService();
                _this.docserv.getDocuments(_this.document, observ, _this.codeClinique).then(function (res) {
                    _this.retrieveImageOff(res);
                });
            }
            else {
                var d = new Document();
                d.seturl(_this.storageDirectory + observ);
                d.setobserv(observ);
                d.setcodeClinique(_this.codeClinique);
                _this.document.push(d);
                _this.docserv = new DocumentService();
                _this.docserv.verifDocument(_this.document, observ, _this.codeClinique).then(function (res) {
                    if (res === false) {
                        _this.docserv.getDocuments(_this.document, observ, _this.codeClinique);
                    }
                });
                _this.url = "http://192.168.0.5:8084/dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=" + observ;
                _this.open(_this.url);
                _this.retrieveImage(_this.url, d);
            }
        });
    };
    ExamenRadioPage.prototype.historiqueOff = function (hist, numDoss, codeClinique) {
        var _this = this;
        this.histserv = new HistDossierService();
        this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(function (res) {
            _this.histd = res.getdate();
        });
    };
    ExamenRadioPage.prototype.open = function (url) {
        var options = {
            statusbar: {
                color: '#ffffffff'
            },
            toolbar: {
                height: 44,
                color: '#f0f0f0ff'
            },
            title: {
                color: '#003264ff',
                staticText: "Doc",
                showPageTitle: false
            },
            backButton: {
                image: 'back',
                imagePressed: 'back_pressed',
                align: 'left',
                event: 'backPressed'
            },
            forwardButton: {
                image: 'forward',
                imagePressed: 'forward_pressed',
                align: 'left',
                event: 'forwardPressed'
            },
            closeButton: {
                image: 'close',
                imagePressed: 'close_pressed',
                align: 'left',
                event: 'closePressed'
            },
            customButtons: [
                {
                    image: 'share',
                    imagePressed: 'share_pressed',
                    align: 'right',
                    event: 'sharePressed'
                }
            ],
            backButtonCanClose: true
        };
        var browser = this.themeableBrowser.create(url, '_blank', options);
    };
    ExamenRadioPage.prototype.downloadImage = function (url, doc) {
        var _this = this;
        this.platform.ready().then(function () {
            var fileTransfer = new Transfer();
            fileTransfer.download(url, _this.storageDirectory + doc.getobserv()).then(function (entry) {
                var alertSuccess = _this.alertCtrl.create({
                    title: "Download Succeeded!",
                    subTitle: doc.getobserv() + " was successfully downloaded to: " + entry.toURL(),
                    buttons: ['Ok']
                });
                alertSuccess.present();
            }, function (error) {
                var alertFailure = _this.alertCtrl.create({
                    title: "Download Failed!",
                    subTitle: doc.getobserv() + " was not successfully downloaded. Error code: " + error.code,
                    buttons: ['Ok']
                });
                alertFailure.present();
            });
        });
    };
    ExamenRadioPage.prototype.retrieveImage = function (url, doc) {
        var _this = this;
        var file = doc.getobserv();
        File.checkFile(this.storageDirectory, file)
            .then(function () {
            var alertSuccess = _this.alertCtrl.create({
                title: "File retrieval Succeeded!",
                subTitle: file + " was successfully retrieved from: " + _this.storageDirectory,
                buttons: ['Ok']
            });
            return alertSuccess.present();
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
        File.checkFile(this.storageDirectory, file)
            .then(function () {
            _this.url = doc.geturl();
            _this.open(_this.url);
            var alertSuccess = _this.alertCtrl.create({
                title: "File retrieval Succeeded!",
                subTitle: file + " was successfully retrieved from: " + _this.storageDirectory,
                buttons: ['Ok']
            });
            return alertSuccess.present();
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
    return ExamenRadioPage;
}());
ExamenRadioPage = __decorate([
    Component({
        selector: 'page-examen-radio',
        templateUrl: 'examen-radio.html',
        providers: [Variables, ThemeableBrowser]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables, Platform, ThemeableBrowser, AlertController])
], ExamenRadioPage);
export { ExamenRadioPage };
//# sourceMappingURL=examen-radio.js.map