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
import { PdfViewPage } from "../pdf-view/pdf-view";
var ExamenLaboPage = (function () {
    function ExamenLaboPage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.LabosT = [];
        this.LabosF = [];
        this.countPdfT = 0;
        this.countPdf = 0;
        this.LabosT = this.navParams.data.Labost;
        this.LabosF = this.navParams.data.Labosf;
    }
    ExamenLaboPage.prototype.openURL = function (numAdmission) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:creationPDF>' +
            '<numDemande>' + numAdmission + '</numDemande>' +
            '</ser:creationPDF>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try {
                        var xml = xmlhttp.responseXML;
                        var x;
                        x = xml.getElementsByTagName("return");
                        _this.pdf = _this.Url.url + "dmi-web/LaboPDF/" + x[0].childNodes[0].nodeValue.split("1.")[0] + ".pdf";
                        console.log("p   " + x[0].childNodes[0].nodeValue);
                        console.log("pdf   " + _this.pdf);
                        _this.navCtrl.push(PdfViewPage, { pdf: _this.pdf });
                    }
                    catch (Error) {
                    }
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    ExamenLaboPage.prototype.gotPdf = function (pdf) {
        this.navCtrl.push(PdfViewPage, { pdf: pdf.getpdf() });
    };
    return ExamenLaboPage;
}());
ExamenLaboPage = __decorate([
    Component({
        selector: 'page-examen-labo',
        templateUrl: 'examen-labo.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], ExamenLaboPage);
export { ExamenLaboPage };
//# sourceMappingURL=examen-labo.js.map