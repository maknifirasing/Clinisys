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
        this.pdf = this.navParams.get("pdf");
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
                    var fields = _this.pdf.split('/');
                    _this.pdfSrc = _this.storageDirectory + fields[5];
                }
                else {
                    _this.connection = true;
                    _this.pdfSrc = _this.pdf;
                    _this.retrieveImage(_this.pdfSrc);
                }
            });
        });
    }
    PdfViewPage.prototype.ionViewDidLoad = function () {
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