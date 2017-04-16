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
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { File, Transfer } from 'ionic-native';
import { Variables } from "../../providers/variables";
import { HistDossier } from "../../models/HistDossier";
import { HistPdfService } from "../../services/HistPdfService";
import { HistDoc } from "../../models/HistDoc";
var PdfViewPage = (function () {
    function PdfViewPage(navCtrl, navParams, PdfViewerComponent, platform, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.PdfViewerComponent = PdfViewerComponent;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.page = 1;
        this.storageDirectory = '';
        this.histC = [];
        this.histp = new HistDossier();
        this.codeClinique = navParams.get("codeClinique");
        this.tabLangue = navParams.get("tabLangue");
        this.pass = navParams.get("pass");
        this.langue = navParams.get("langue");
        this.pdf = this.navParams.get("pdf");
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
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
            var fields = _this.pdf.split('/');
            Variables.checconnection().then(function (connexion) {
                if (connexion === false) {
                    _this.connection = false;
                    _this.pdfSrc = _this.storageDirectory + fields[5];
                    _this.historiqueOff(_this.histC, _this.pass.getdossier(), fields[5], _this.codeClinique);
                }
                else {
                    _this.connection = true;
                    _this.pdfSrc = _this.pdf;
                    _this.retrieveImage(_this.pdfSrc);
                    _this.historique(_this.pass.getdossier(), fields[5], _this.codeClinique);
                }
            });
        });
    }
    PdfViewPage.prototype.ionViewDidLoad = function () {
        this.tabBarElement.style.display = 'none';
    };
    PdfViewPage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
    };
    PdfViewPage.prototype.downloadImage = function (file) {
        var _this = this;
        this.platform.ready().then(function () {
            var fileTransfer = new Transfer();
            fileTransfer.download(_this.pdf, _this.storageDirectory + file).then(function (entry) {
                /*
                 const alertSuccess = this.alertCtrl.create({
                 title: `Download Succeeded!`,
                 subTitle: `${file} was successfully downloaded to: ${entry.toURL()}`,
                 buttons: ['Ok']
                 });
        
                 alertSuccess.present();
                 */
            }, function (error) {
                /*
                 const alertFailure = this.alertCtrl.create({
                 title: `Download Failed!`,
                 subTitle: `${file} was not successfully downloaded. Error code: ${error.code}`,
                 buttons: ['Ok']
                 });
        
                 alertFailure.present();
                 */
            });
        });
    };
    PdfViewPage.prototype.retrieveImage = function (src) {
        var _this = this;
        var imageLocation = "" + src;
        var fields = imageLocation.split('/');
        var file = fields[5];
        File.checkFile(this.storageDirectory, file)
            .then(function () {
            /*
             const alertSuccess = this.alertCtrl.create({
             title: `File retrieval Succeeded!`,
             subTitle: `${file} was successfully retrieved from: ${this.storageDirectory}`,
             buttons: ['Ok']
             });
    
             return alertSuccess.present();
             */
        })
            .catch(function (err) {
            /*      const alertFailure = this.alertCtrl.create({
             title: `File retrieval Failed!`,
             subTitle: `${file} was not successfully retrieved. Error Code: ${err.code}`,
             buttons: ['Ok']
             });
    
             return alertFailure.present(); */
            _this.downloadImage(file);
        });
    };
    PdfViewPage.prototype.historique = function (numDoss, file, codeClinique) {
        var _this = this;
        this.histserv = new HistPdfService();
        var h = new HistDoc();
        var d = new Date();
        h.setnumDoss(numDoss);
        h.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
        h.setcodeClinique(codeClinique);
        h.setnom(file);
        this.histC.push(h);
        try {
            this.histserv.deleteHistPdfs(numDoss, codeClinique, file);
            this.histserv.getHistPdfs(this.histC, numDoss, codeClinique, file).then(function (res) {
                _this.histp = res.getdate();
            });
        }
        catch (Error) {
            this.histserv.getHistPdfs(this.histC, numDoss, codeClinique, file).then(function (res) {
                _this.histp = res.getdate();
            });
        }
    };
    PdfViewPage.prototype.historiqueOff = function (hist, numDoss, file, codeClinique) {
        var _this = this;
        this.histserv = new HistPdfService();
        this.histserv.getHistPdfs(hist, numDoss, codeClinique, file).then(function (res) {
            _this.histp = res.getdate();
        });
    };
    return PdfViewPage;
}());
PdfViewPage = __decorate([
    Component({
        selector: 'page-pdf-view',
        templateUrl: 'pdf-view.html',
        providers: [PdfViewerComponent]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, PdfViewerComponent, Platform, AlertController])
], PdfViewPage);
export { PdfViewPage };
//# sourceMappingURL=pdf-view.js.map