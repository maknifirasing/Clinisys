"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ng2_pdf_viewer_1 = require('ng2-pdf-viewer');
var PdfViewPage = (function () {
    function PdfViewPage(navCtrl, navParams, PdfViewerComponent) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.PdfViewerComponent = PdfViewerComponent;
        this.page = 1;
        this.pdfSrc = this.navParams.get("pdf");
    }
    PdfViewPage.prototype.ionViewDidLoad = function () {
    };
    PdfViewPage = __decorate([
        core_1.Component({
            selector: 'page-pdf-view',
            templateUrl: 'pdf-view.html',
            providers: [ng2_pdf_viewer_1.PdfViewerComponent]
        })
    ], PdfViewPage);
    return PdfViewPage;
}());
exports.PdfViewPage = PdfViewPage;
