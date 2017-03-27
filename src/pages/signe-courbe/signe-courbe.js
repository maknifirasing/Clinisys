var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Chart } from 'chart.js';
import { SigCourbe } from "../../models/SigCourbe";
import { Variables } from "../../providers/variables";
var SigneCourbePage = (function () {
    function SigneCourbePage(navCtrl, navParams, Url, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.platform = platform;
        this.courbePouls = [];
        this.courbeTA = [];
        this.courbeTemp = [];
        this.courbeSaturation = [];
        this.courbeFrq = [];
        this.codeClinique = navParams.get("codeClinique");
        this.tabLangue = navParams.get("tabLangue");
        this.pass = navParams.get("pass");
        this.getChartSurveillance(this.pass.getdossier(), this.codeClinique);
    }
    SigneCourbePage.prototype.ionViewDidLoad = function () {
    };
    SigneCourbePage.prototype.getChartSurveillance = function (numdoss, codeClinique) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/ReaWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:getChartSurveillanceAndroid>' +
            '<numdoss>' + numdoss + '</numdoss>' +
            '</ser:getChartSurveillanceAndroid>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var xml = xmlhttp.responseXML;
                    var x;
                    x = xml.getElementsByTagName("return");
                    var courbe, i;
                    for (i = 0; i < x.length; i++) {
                        courbe = new SigCourbe();
                        courbe.setcodePosologie(x[i].children[0].textContent);
                        courbe.setdesignation(x[i].children[1].textContent);
                        courbe.setseuilMin(x[i].children[2].textContent);
                        courbe.setseuilMax(x[i].children[3].textContent);
                        courbe.setcolor(x[i].children[4].textContent);
                        courbe.setunite(x[i].children[5].textContent);
                        courbe.setquantite(x[i].children[6].textContent);
                        courbe.setheurePrise(x[i].children[7].textContent);
                        courbe.setdateHeurePrise(x[i].children[8].textContent);
                        if (courbe.getdesignation() === "Pouls") {
                            _this.courbePouls.push(courbe);
                        }
                        if (courbe.getdesignation() === "T.A") {
                            _this.courbeTA.push(courbe);
                        }
                        if (courbe.getdesignation() === "Température") {
                            _this.courbeTemp.push(courbe);
                        }
                        if (courbe.getdesignation() === "Saturation en O2") {
                            _this.courbeSaturation.push(courbe);
                        }
                        if (courbe.getdesignation() === "Frequence respiratoire") {
                            _this.courbeFrq.push(courbe);
                        }
                    }
                    _this.cPouls(_this.courbePouls);
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    SigneCourbePage.prototype.cPouls = function (courbes) {
        var label = [];
        var date;
        for (var i = 0; i < courbes.length; i++) {
            date = (courbes[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbes[i].getdateHeurePrise()).substr(5, 2) + "-" + courbes[i].getheurePrise();
            label.push(date);
        }
        console.log(label);
    };
    SigneCourbePage.prototype.exmp = function () {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            }
        });
    };
    return SigneCourbePage;
}());
__decorate([
    ViewChild('lineCanvas'),
    __metadata("design:type", Object)
], SigneCourbePage.prototype, "lineCanvas", void 0);
SigneCourbePage = __decorate([
    Component({
        selector: 'page-signe-courbe',
        templateUrl: 'signe-courbe.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables, Platform])
], SigneCourbePage);
export { SigneCourbePage };
//# sourceMappingURL=signe-courbe.js.map