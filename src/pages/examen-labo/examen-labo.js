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
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Variables } from "../../providers/variables";
import { PdfViewPage } from "../pdf-view/pdf-view";
import { LaboFService } from "../../services/LaboFService";
import { LaboTService } from "../../services/LaboTService";
import { ClientDetailPage } from "../client-detail/client-detail";
import { DossierPage } from "../dossier/dossier";
var ExamenLaboPage = (function () {
    function ExamenLaboPage(navCtrl, navParams, Url, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.platform = platform;
        this.LabosT = [];
        this.LabosF = [];
        this.tabLangue = navParams.get("tabLangue");
        this.codeClinique = navParams.get("codeClinique");
        this.pass = navParams.get("pass");
        this.langue = navParams.get("langue");
        this.LabosT = navParams.get("Labost");
        this.LabosF = navParams.get("Labosf");
        Variables.checconnection().then(function (connexion) {
            if (connexion === false) {
                _this.connection = false;
                _this.findAllLaboByNumDossierOff(_this.pass.getdossier(), _this.codeClinique);
            }
            else {
                _this.connection = true;
            }
        });
        this.histd = DossierPage.hist;
    }
    ExamenLaboPage.prototype.openURL = function (numAdmission) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
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
                        _this.pdf = Variables.uRL + "dmi-web/LaboPDF/" + x[0].childNodes[0].nodeValue.split("1.")[0] + ".pdf";
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
        this.navCtrl.push(PdfViewPage, { pdf: pdf.getpdf(), tabLangue: this.tabLangue,
            langue: this.langue, codeClinique: this.codeClinique, pass: this.pass });
    };
    ExamenLaboPage.prototype.findAllLaboByNumDossierOff = function (numDoss, codeClinique) {
        this.LabosFs = new LaboFService();
        this.LabosF = this.LabosFs.getLabos(this.LabosF, numDoss, codeClinique);
        this.LabosTs = new LaboTService();
        this.LabosT = this.LabosTs.getLabos(this.LabosT, numDoss, codeClinique);
    };
    ExamenLaboPage.prototype.goToInfPage = function (patient) {
        this.navCtrl.push(ClientDetailPage, {
            patient: patient,
            motif: DossierPage.motifhh,
            tabLangue: this.tabLangue,
            langue: this.langue,
            codeClinique: this.codeClinique
        });
    };
    return ExamenLaboPage;
}());
ExamenLaboPage = __decorate([
    Component({
        selector: 'page-examen-labo',
        templateUrl: 'examen-labo.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables, Platform])
], ExamenLaboPage);
export { ExamenLaboPage };
//# sourceMappingURL=examen-labo.js.map