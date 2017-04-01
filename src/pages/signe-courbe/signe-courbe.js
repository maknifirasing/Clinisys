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
import { SigneCourbe } from "../../models/SigneCourbe";
import { Variables } from "../../providers/variables";
import { SigneCourbePoulsService } from "../../services/SigneCourbePoulsService";
import { HistDossier } from "../../models/HistDossier";
import { SigneCourbeFrqService } from "../../services/SigneCourbeFrqService";
import { SigneCourbeSaturationService } from "../../services/SigneCourbeSaturationService";
import { SigneCourbeTAService } from "../../services/SigneCourbeTAService";
import { SigneCourbeTempService } from "../../services/SigneCourbeTempService";
import { HistSigneCourbeService } from "../../services/HistSigneCourbeService";
var SigneCourbePage = (function () {
    function SigneCourbePage(navCtrl, navParams, Url, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.courbePouls = [];
        this.courbeTA = [];
        this.courbeTemp = [];
        this.courbeSaturation = [];
        this.courbeFrq = [];
        this.histC = [];
        this.histc = new HistDossier();
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.codeClinique = navParams.get("codeClinique");
        this.tabLangue = navParams.get("tabLangue");
        this.pass = navParams.get("pass");
        this.langue = navParams.get("langue");
        Variables.checconnection().then(function (connexion) {
            if (connexion === false) {
                _this.connection = false;
                _this.getChartSurveillanceOff(_this.pass.getdossier(), _this.codeClinique);
                _this.historiqueOff(_this.histC, _this.pass.getdossier(), _this.codeClinique);
            }
            else {
                _this.connection = true;
                _this.update();
            }
        });
    }
    SigneCourbePage.prototype.ionViewDidLoad = function () {
        this.tabBarElement.style.display = 'none';
    };
    SigneCourbePage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
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
                    for (i = x.length - 1; i > 0; i--) {
                        courbe = new SigneCourbe();
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
                    _this.sgcPserv = new SigneCourbePoulsService();
                    _this.sgcPserv.verifSigneCourbe(_this.courbePouls, numdoss, codeClinique).then(function (res) {
                        if (res === false) {
                            _this.sgcPserv.getSigneCourbes(_this.courbePouls, numdoss, codeClinique);
                        }
                    });
                    _this.sgcTAserv = new SigneCourbeTAService();
                    _this.sgcTAserv.verifSigneCourbe(_this.courbeTA, numdoss, codeClinique).then(function (res) {
                        if (res === false) {
                            _this.sgcTAserv.getSigneCourbes(_this.courbeTA, numdoss, codeClinique);
                        }
                    });
                    _this.sgcTserv = new SigneCourbeTempService();
                    _this.sgcTserv.verifSigneCourbe(_this.courbeTemp, numdoss, codeClinique).then(function (res) {
                        if (res === false) {
                            _this.sgcTserv.getSigneCourbes(_this.courbeTemp, numdoss, codeClinique);
                        }
                    });
                    _this.sgcSserv = new SigneCourbeSaturationService();
                    _this.sgcSserv.verifSigneCourbe(_this.courbeSaturation, numdoss, codeClinique).then(function (res) {
                        if (res === false) {
                            _this.sgcSserv.getSigneCourbes(_this.courbeSaturation, numdoss, codeClinique);
                        }
                    });
                    _this.sgcFserv = new SigneCourbeFrqService();
                    _this.sgcFserv.verifSigneCourbe(_this.courbeFrq, numdoss, codeClinique).then(function (res) {
                        if (res === false) {
                            _this.sgcFserv.getSigneCourbes(_this.courbeFrq, numdoss, codeClinique);
                        }
                    });
                    _this.onecourbes(_this.courbePouls);
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    SigneCourbePage.prototype.DeletegetChartSurveillance = function (numdoss, codeClinique) {
        this.sgcPserv = new SigneCourbePoulsService();
        this.sgcPserv.deleteSigneCourbes(numdoss, codeClinique);
        this.sgcTAserv = new SigneCourbeTAService();
        this.sgcTAserv.deleteSigneCourbes(numdoss, codeClinique);
        this.sgcTserv = new SigneCourbeTempService();
        this.sgcTserv.deleteSigneCourbes(numdoss, codeClinique);
        this.sgcSserv = new SigneCourbeSaturationService();
        this.sgcSserv.deleteSigneCourbes(numdoss, codeClinique);
        this.sgcFserv = new SigneCourbeFrqService();
        this.sgcFserv.deleteSigneCourbes(numdoss, codeClinique);
    };
    SigneCourbePage.prototype.getChartSurveillanceOff = function (numdoss, codeClinique) {
        this.sgcPserv = new SigneCourbePoulsService();
        this.courbePouls = this.sgcPserv.getSigneCourbes(this.courbePouls, numdoss, codeClinique);
        this.sgcTAserv = new SigneCourbeTAService();
        this.courbeTA = this.sgcTAserv.getSigneCourbes(this.courbeTA, numdoss, codeClinique);
        this.sgcTserv = new SigneCourbeTempService();
        this.courbeTemp = this.sgcTserv.getSigneCourbes(this.courbeTemp, numdoss, codeClinique);
        this.sgcSserv = new SigneCourbeSaturationService();
        this.courbeSaturation = this.sgcSserv.getSigneCourbes(this.courbeSaturation, numdoss, codeClinique);
        this.sgcFserv = new SigneCourbeFrqService();
        this.courbeFrq = this.sgcFserv.getSigneCourbes(this.courbeFrq, numdoss, codeClinique);
    };
    SigneCourbePage.prototype.onecourbes = function (courbe) {
        var labelcourbe = [];
        var data = [];
        for (var i = 0; i < courbe.length; i++) {
            labelcourbe.push((courbe[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbe[i].getdateHeurePrise()).substr(5, 2) + "-" + courbe[i].getheurePrise());
            data.push(courbe[i].getquantite());
        }
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: labelcourbe,
                datasets: [{
                        label: courbe[0].getdesignation(),
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgb(" + courbe[0].getcolor() + ")",
                        borderColor: "rgb(" + courbe[0].getcolor() + ")",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointBackgroundColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointBorderWidth: 1,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointHoverBorderColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointHoverBorderWidth: 3,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: data,
                        spanGaps: true,
                        DatasetStrokeWidth: 10,
                        ScaleShowLabels: true
                    }]
            },
            options: {
                //  scaleShowVerticalLines: true,
                responsive: true,
                //  maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                            ticks: { min: Number(courbe[0].getseuilMin()), max: Number(courbe[0].getseuilMax()) }
                        }
                    ],
                }
            }
        });
    };
    SigneCourbePage.prototype.doublecourbes = function (courbe) {
        var labelcourbe = [];
        var data1 = [];
        var data2 = [];
        for (var i = 0; i < courbe.length; i++) {
            labelcourbe.push((courbe[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbe[i].getdateHeurePrise()).substr(5, 2) + "-" + courbe[i].getheurePrise());
            data1.push(courbe[i].getquantite().split("/")[0]);
            data2.push(courbe[i].getquantite().split("/")[1]);
        }
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: labelcourbe,
                datasets: [{
                        label: courbe[0].getdesignation(),
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgb(" + courbe[0].getcolor() + ")",
                        borderColor: "rgb(" + courbe[0].getcolor() + ")",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointBackgroundColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointBorderWidth: 1,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointHoverBorderColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointHoverBorderWidth: 3,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: data1,
                        spanGaps: true,
                        DatasetStrokeWidth: 10,
                        ScaleShowLabels: true
                    },
                    {
                        label: courbe[0].getdesignation(),
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgb(" + courbe[0].getcolor() + ")",
                        borderColor: "rgb(" + courbe[0].getcolor() + ")",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointBackgroundColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointBorderWidth: 1,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointHoverBorderColor: "rgb(" + courbe[0].getcolor() + ")",
                        pointHoverBorderWidth: 3,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: data2,
                        spanGaps: true,
                        DatasetStrokeWidth: 10,
                        ScaleShowLabels: true
                    }]
            },
            options: {
                //   scaleShowVerticalLines: true,
                responsive: true,
                //    maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                            ticks: { min: Number(courbe[0].getseuilMin()), max: Number(courbe[0].getseuilMax()) }
                        }
                    ],
                }
            }
        });
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
    SigneCourbePage.prototype.historique = function (numDoss, codeClinique) {
        var _this = this;
        this.histserv = new HistSigneCourbeService();
        var h = new HistDossier();
        var d = new Date();
        h.setnumDoss(numDoss);
        h.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
        h.setcodeClinique(codeClinique);
        this.histC.push(h);
        try {
            this.histserv.deleteHistSigneCourbes(numDoss, codeClinique);
            this.histserv.getHistSigneCourbes(this.histC, numDoss, codeClinique).then(function (res) {
                _this.histc = res.getdate();
            });
        }
        catch (Error) {
            this.histserv.getHistSigneCourbes(this.histC, numDoss, codeClinique).then(function (res) {
                _this.histc = res.getdate();
            });
        }
    };
    SigneCourbePage.prototype.historiqueOff = function (hist, numDoss, codeClinique) {
        var _this = this;
        this.histserv = new HistSigneCourbeService();
        this.histserv.getHistSigneCourbes(hist, numDoss, codeClinique).then(function (res) {
            _this.histc = res.getdate();
        });
    };
    SigneCourbePage.prototype.update = function () {
        this.DeletegetChartSurveillance(this.pass.getdossier(), this.codeClinique);
        this.getChartSurveillance(this.pass.getdossier(), this.codeClinique);
        this.historique(this.pass.getdossier(), this.codeClinique);
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