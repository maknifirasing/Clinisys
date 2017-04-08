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
                    _this.doublecourbes(_this.courbePouls, _this.courbeTA, _this.courbeTemp, _this.courbeSaturation, _this.courbeFrq);
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
        var _this = this;
        this.sgcPserv = new SigneCourbePoulsService();
        this.sgcPserv.getSigneCourbes(this.courbePouls, numdoss, codeClinique).then(function (resp) {
            _this.courbePouls = resp;
            _this.sgcTAserv = new SigneCourbeTAService();
            _this.sgcTAserv.getSigneCourbes(_this.courbeTA, numdoss, codeClinique).then(function (resta) {
                _this.courbeTA = resta;
                _this.sgcTserv = new SigneCourbeTempService();
                _this.sgcTserv.getSigneCourbes(_this.courbeTemp, numdoss, codeClinique).then(function (rest) {
                    _this.courbeTemp = rest;
                    _this.sgcSserv = new SigneCourbeSaturationService();
                    _this.sgcSserv.getSigneCourbes(_this.courbeSaturation, numdoss, codeClinique).then(function (ress) {
                        _this.courbeSaturation = ress;
                        _this.sgcFserv = new SigneCourbeFrqService();
                        _this.sgcFserv.getSigneCourbes(_this.courbeFrq, numdoss, codeClinique).then(function (resf) {
                            _this.courbeFrq = resf;
                            _this.doublecourbes(_this.courbePouls, _this.courbeTA, _this.courbeTemp, _this.courbeSaturation, _this.courbeFrq);
                        });
                    });
                });
            });
        });
    };
    SigneCourbePage.prototype.doublecourbes = function (courbePouls, courbeTA, courbeTemp, courbeSaturation, courbeFrq) {
        var labelcourbePouls = [];
        var labelcourbeTA = [];
        var labelcourbeTemp = [];
        var labelcourbeSaturation = [];
        var labelcourbeFrq = [];
        var dataPouls = [];
        var dataTA1 = [];
        var dataTA2 = [];
        var dataTemp = [];
        var dataSaturation = [];
        var dataFrq = [];
        for (var i = 0; i < courbePouls.length; i++) {
            labelcourbePouls.push((courbePouls[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbePouls[i].getdateHeurePrise()).substr(5, 2) + "-" + courbePouls[i].getheurePrise());
            dataPouls.push(courbePouls[i].getquantite());
        }
        for (var i = 0; i < courbeTA.length; i++) {
            labelcourbeTA.push((courbeTA[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbeTA[i].getdateHeurePrise()).substr(5, 2) + "-" + courbeTA[i].getheurePrise());
            dataTA1.push(courbeTA[i].getquantite().split("/")[0]);
            dataTA2.push(courbeTA[i].getquantite().split("/")[1]);
        }
        for (var i = 0; i < courbeTemp.length; i++) {
            labelcourbeTemp.push((courbeTemp[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbeTemp[i].getdateHeurePrise()).substr(5, 2) + "-" + courbeTemp[i].getheurePrise());
            dataTemp.push(courbeTemp[i].getquantite());
        }
        for (var i = 0; i < courbeSaturation.length; i++) {
            labelcourbeSaturation.push((courbeSaturation[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbeSaturation[i].getdateHeurePrise()).substr(5, 2) + "-" + courbeSaturation[i].getheurePrise());
            dataSaturation.push(courbeSaturation[i].getquantite());
        }
        for (var i = 0; i < courbeFrq.length; i++) {
            labelcourbeFrq.push((courbeFrq[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbeFrq[i].getdateHeurePrise()).substr(5, 2) + "-" + courbeFrq[i].getheurePrise());
            dataFrq.push(courbeFrq[i].getquantite());
        }
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                plugins: ["chartjs-plugin-zoom.js"],
                labels: labelcourbePouls,
                datasets: [{
                        label: courbePouls[0].getdesignation(),
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgb(" + courbePouls[0].getcolor() + ")",
                        borderColor: "rgb(" + courbePouls[0].getcolor() + ")",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgb(" + courbePouls[0].getcolor() + ")",
                        pointBackgroundColor: "rgb(" + courbePouls[0].getcolor() + ")",
                        pointBorderWidth: 1,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "rgb(" + courbePouls[0].getcolor() + ")",
                        pointHoverBorderColor: "rgb(" + courbePouls[0].getcolor() + ")",
                        pointHoverBorderWidth: 3,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: dataPouls,
                        spanGaps: true,
                        DatasetStrokeWidth: 10,
                        ScaleShowLabels: true
                    },
                    {
                        label: courbeTA[0].getdesignation() + " max",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        borderColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        pointBackgroundColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        pointBorderWidth: 1,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        pointHoverBorderColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        pointHoverBorderWidth: 3,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: dataTA1,
                        spanGaps: true,
                        DatasetStrokeWidth: 10,
                        ScaleShowLabels: true
                    },
                    {
                        label: courbeTA[0].getdesignation() + " min",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        borderColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        pointBackgroundColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        pointBorderWidth: 1,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        pointHoverBorderColor: "rgb(" + courbeTA[0].getcolor() + ")",
                        pointHoverBorderWidth: 3,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: dataTA2,
                        spanGaps: true,
                        DatasetStrokeWidth: 10,
                        ScaleShowLabels: true
                    },
                    {
                        label: courbeTemp[0].getdesignation(),
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgb(" + courbeTemp[0].getcolor() + ")",
                        borderColor: "rgb(" + courbeTemp[0].getcolor() + ")",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgb(" + courbeTemp[0].getcolor() + ")",
                        pointBackgroundColor: "rgb(" + courbeTemp[0].getcolor() + ")",
                        pointBorderWidth: 1,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "rgb(" + courbeTemp[0].getcolor() + ")",
                        pointHoverBorderColor: "rgb(" + courbeTemp[0].getcolor() + ")",
                        pointHoverBorderWidth: 3,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: dataTemp,
                        spanGaps: true,
                        DatasetStrokeWidth: 10,
                        ScaleShowLabels: true
                    },
                    {
                        label: courbeSaturation[0].getdesignation(),
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgb(" + courbeSaturation[0].getcolor() + ")",
                        borderColor: "rgb(" + courbeSaturation[0].getcolor() + ")",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgb(" + courbeSaturation[0].getcolor() + ")",
                        pointBackgroundColor: "rgb(" + courbeSaturation[0].getcolor() + ")",
                        pointBorderWidth: 1,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "rgb(" + courbeSaturation[0].getcolor() + ")",
                        pointHoverBorderColor: "rgb(" + courbeSaturation[0].getcolor() + ")",
                        pointHoverBorderWidth: 3,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: dataSaturation,
                        spanGaps: true,
                        DatasetStrokeWidth: 10,
                        ScaleShowLabels: true
                    },
                    {
                        label: courbeFrq[0].getdesignation(),
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgb(" + courbeFrq[0].getcolor() + ")",
                        borderColor: "rgb(" + courbeFrq[0].getcolor() + ")",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgb(" + courbeFrq[0].getcolor() + ")",
                        pointBackgroundColor: "rgb(" + courbeFrq[0].getcolor() + ")",
                        pointBorderWidth: 1,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "rgb(" + courbeFrq[0].getcolor() + ")",
                        pointHoverBorderColor: "rgb(" + courbeFrq[0].getcolor() + ")",
                        pointHoverBorderWidth: 3,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: dataFrq,
                        spanGaps: true,
                        DatasetStrokeWidth: 10,
                        ScaleShowLabels: true,
                        zoom: {
                            enabled: true
                        }
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                            ticks: {
                                //      min: Number(courbePouls[0].getseuilMin()), max: Number(courbePouls[0].getseuilMax()),
                                beginAtZero: true
                            }
                        }]
                },
                pan: {
                    enabled: true,
                    mode: 'y'
                },
                zoom: {
                    enabled: true,
                    mode: 'y',
                    limits: {
                        max: 10,
                        min: 0.5
                    }
                },
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