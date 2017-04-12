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
import { Variables } from "../../providers/variables";
import { TraitCourbe } from "../../models/TraitCourbe";
import { HistTraitCourbeService } from "../../services/HistTraitCourbeService";
import { HistDossier } from "../../models/HistDossier";
import { TraitCourbeService } from "../../services/TraitCourbeService";
var TraitmentCourbe = (function () {
    function TraitmentCourbe(navCtrl, navParams, Url, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.traitcourbe = [];
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
                _this.getChartSurveillanceOff(_this.traitcourbe, _this.pass.getdossier(), _this.codeClinique);
                _this.historiqueOff(_this.histC, _this.pass.getdossier(), _this.codeClinique);
            }
            else {
                _this.connection = true;
                _this.update();
            }
        });
    }
    TraitmentCourbe.prototype.ionViewDidLoad = function () {
        this.tabBarElement.style.display = 'none';
    };
    TraitmentCourbe.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
    };
    TraitmentCourbe.prototype.getChartSurveillance = function (numdoss, codeClinique) {
        var _this = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', this.Url.url + 'dmi-core/ReaWSService?wsdl', true);
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<ser:getListeTraitementSureveillanceRegimePancarte>' +
            '<numdoss>' + numdoss + '</numdoss>' +
            '</ser:getListeTraitementSureveillanceRegimePancarte>' +
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
                        courbe = new TraitCourbe();
                        courbe.setcodePosologie(x[i].children[0].textContent);
                        courbe.setcodeType(x[i].children[1].textContent);
                        courbe.setdate(x[i].children[2].textContent);
                        courbe.setdesignation(x[i].children[3].textContent);
                        courbe.setheurePrise(x[i].children[4].textContent);
                        courbe.setheureRealisation(x[i].children[5].textContent);
                        courbe.setnumTraitement(x[i].children[6].textContent);
                        courbe.setordre(x[i].children[7].textContent);
                        courbe.setquantite(x[i].children[8].textContent);
                        courbe.setretourn(x[i].children[9].textContent);
                        courbe.setrow(x[i].children[10].textContent);
                        courbe.setnumDoss(numdoss);
                        courbe.setcodeClinique(codeClinique);
                        _this.traitcourbe.push(courbe);
                    }
                    _this.traitserv = new TraitCourbeService();
                    _this.traitserv.verifTraitCourbe(_this.traitcourbe, numdoss, codeClinique).then(function (res) {
                        if (res === false) {
                            _this.traitserv.getTraitCourbes(_this.traitcourbe, numdoss, codeClinique);
                        }
                    });
                    _this.onecourbes(_this.traitcourbe);
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    TraitmentCourbe.prototype.getChartSurveillanceOff = function (traitcourbe, numdoss, codeClinique) {
        var _this = this;
        this.traitserv = new TraitCourbeService();
        this.traitserv.getTraitCourbes(traitcourbe, numdoss, codeClinique).then(function (res) {
            _this.onecourbes(res);
        });
    };
    TraitmentCourbe.prototype.DeletegetChartSurveillance = function (numdoss, codeClinique) {
        this.traitserv = new TraitCourbeService();
        this.traitserv.deleteTraitCourbes(numdoss, codeClinique);
    };
    TraitmentCourbe.prototype.exist = function (t, ch) {
        for (var i = 0; i < t.length; i++) {
            if (t[i] === ch) {
                return i;
            }
        }
        return -1;
    };
    TraitmentCourbe.prototype.onecourbes = function (courbe) {
        var labelcourbe = [];
        var designation = [];
        var data = [];
        var nomcourbe = [];
        var dataset = [];
        var x;
        for (var i = 0; i < courbe.length; i++) {
            x = (courbe[i].getrow()).substr(0, 2) + "/" + (courbe[i].getrow()).substr(3, 2);
            if (this.exist(labelcourbe, x) === -1) {
                labelcourbe.push(x);
            }
            if (this.exist(nomcourbe, courbe[i].getcodePosologie()) === -1) {
                nomcourbe.push(courbe[i].getcodePosologie());
                designation.push(courbe[i].getdesignation());
            }
        }
        var c;
        var b;
        for (var j = 0; j < nomcourbe.length; j++) {
            data = [];
            b = false;
            c = 0;
            for (var i = 0; i < courbe.length; i++) {
                if (courbe[i].getcodePosologie() === nomcourbe[j]) {
                    x = (courbe[i].getrow()).substr(0, 2) + "/" + (courbe[i].getrow()).substr(3, 2);
                    if (b === false) {
                        c = this.exist(labelcourbe, x);
                        b = true;
                    }
                    while (c > 0) {
                        data.push({
                            x: null,
                            y: null,
                            titre: null
                        });
                        c--;
                    }
                    data.push({
                        x: x,
                        y: j + 1,
                        titre: designation[j]
                    });
                }
            }
            while (data.length < labelcourbe.length + 1) {
                data.push({
                    x: null,
                    y: null,
                    titre: null
                });
            }
            dataset.push({
                label: nomcourbe[j],
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
                pointHoverRadius: 1,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data,
                spanGaps: true,
                radius: 3,
                DatasetStrokeWidth: 20,
                ScaleShowLabels: true,
            });
        }
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: labelcourbe,
                datasets: dataset
            },
            options: {
                responsive: true,
                /*  title: {
                 display: true,
                 text: 'Custom Chart Title'
                 },
                 */
                elements: {
                    rectangle: {
                        borderWidth: 0,
                        borderColor: 'rgb(0, 255, 0)',
                        borderSkipped: 'bottom'
                    }
                },
                zoom: {
                    enabled: true,
                    mode: 'x'
                },
                scaleOverride: true,
                scaleSteps: 10,
                scaleStepWidth: 20,
                scales: {
                    yAxes: [{
                            ticks: { min: 0, max: nomcourbe.length + 1 },
                            barPercentage: 9.0,
                            height: 10
                        }
                    ],
                    xAxes: [{
                            xValueType: "dateTime",
                            title: "timeline",
                            gridThickness: 5
                        }]
                },
                legend: {
                    display: false
                },
                curveType: 'function',
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            //   console.log(tooltipItem)
                            return tooltipItem.yLabel;
                        }
                    }
                },
                animation: {
                    onComplete: function () {
                        var ctx = this.chart.ctx;
                        //         ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.font = "6px Arial gras";
                        ctx.fillStyle = "black";
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.frontz = 'bottom';
                        this.data.datasets.forEach(function (dataset) {
                            for (var i = 0; i < dataset.data.length; i++) {
                                for (var key in dataset._meta) {
                                    var model = dataset._meta[key].data[i]._model;
                                    try {
                                        if (dataset.data[i + 1].titre === null) {
                                            ctx.fillText(dataset.data[i].titre, model.x - ((dataset.data[i].titre).length), model.y);
                                        }
                                        else {
                                            ctx.fillText("", model.x, model.y - 5);
                                        }
                                    }
                                    catch (Err) {
                                        ctx.fillText("", model.x, model.y - 5);
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
    };
    TraitmentCourbe.prototype.historique = function (numDoss, codeClinique) {
        var _this = this;
        this.histserv = new HistTraitCourbeService();
        var h = new HistDossier();
        var d = new Date();
        h.setnumDoss(numDoss);
        h.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
        h.setcodeClinique(codeClinique);
        this.histC.push(h);
        try {
            this.histserv.deleteHistTraitCourbes(numDoss, codeClinique);
            this.histserv.getHistTraitCourbes(this.histC, numDoss, codeClinique).then(function (res) {
                _this.histc = res.getdate();
            });
        }
        catch (Error) {
            this.histserv.getHistTraitCourbes(this.histC, numDoss, codeClinique).then(function (res) {
                _this.histc = res.getdate();
            });
        }
    };
    TraitmentCourbe.prototype.historiqueOff = function (hist, numDoss, codeClinique) {
        var _this = this;
        this.histserv = new HistTraitCourbeService();
        this.histserv.getHistTraitCourbes(hist, numDoss, codeClinique).then(function (res) {
            _this.histc = res.getdate();
        });
    };
    TraitmentCourbe.prototype.update = function () {
        this.DeletegetChartSurveillance(this.pass.getdossier(), this.codeClinique);
        this.getChartSurveillance(this.pass.getdossier(), this.codeClinique);
        this.historique(this.pass.getdossier(), this.codeClinique);
    };
    return TraitmentCourbe;
}());
__decorate([
    ViewChild('lineCanvas'),
    __metadata("design:type", Object)
], TraitmentCourbe.prototype, "lineCanvas", void 0);
TraitmentCourbe = __decorate([
    Component({
        selector: 'page-traitment-courbe',
        templateUrl: 'traitment-courbe.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables, Platform])
], TraitmentCourbe);
export { TraitmentCourbe };
//# sourceMappingURL=traitment-courbe.js.map