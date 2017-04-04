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
                //    this.getChartSurveillanceOff(this.pass.getdossier(), this.codeClinique);
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
                    _this.onecourbes(_this.traitcourbe);
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
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
        var data = [];
        var nomcourbe = [];
        var dataset = [];
        var x;
        for (var i = 0; i < courbe.length; i++) {
            x = (courbe[i].getrow()).substr(0, 2) + "/" + (courbe[i].getrow()).substr(3, 2);
            //x = new Date((courbe[i].getrow()).substr(6, 4), (courbe[i].getrow()).substr(3, 2), (courbe[i].getrow()).substr(0, 2));
            if (this.exist(labelcourbe, x) === -1) {
                labelcourbe.push(x);
            }
            if (this.exist(nomcourbe, courbe[i].getcodePosologie()) === -1) {
                nomcourbe.push(courbe[i].getcodePosologie());
            }
        }
        for (var j = 0; j < nomcourbe.length; j++) {
            data = [];
            for (var i = 0; i < courbe.length; i++) {
                if (courbe[i].getcodePosologie() === nomcourbe[j]) {
                    data.push({
                        x: new Date((courbe[i].getrow()).substr(6, 4), (courbe[i].getrow()).substr(3, 2), (courbe[i].getrow()).substr(0, 2)),
                        y: j + 1
                    });
                }
            }
            console.log("data");
            console.log(data);
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
                spanGaps: false,
                DatasetStrokeWidth: 10,
                ScaleShowLabels: true
            });
        }
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: labelcourbe,
                datasets: dataset
            },
            options: {
                //  scaleShowVerticalLines: true,
                responsive: true,
                //  maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                            ticks: { min: 0, max: nomcourbe.length }
                        }
                    ],
                    xAxes: [{
                            xValueType: "dateTime",
                            title: "timeline",
                            gridThickness: 2
                        }]
                },
                legend: {
                    display: false
                },
                curveType: 'function',
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            console.log(tooltipItem);
                            return tooltipItem.yLabel;
                        }
                    }
                },
                zoom: true
            }
        });
    };
    TraitmentCourbe.prototype.exmp = function () {
        var myConfig = { "type": "line", "series": [{ "values": [20, 40, null, 50, 15, null, 33, 34] }] };
        this.lineChart.render({
            id: this.lineCanvas.nativeElement,
            data: myConfig,
            height: "100%",
            width: "100%"
        });
        var c = [
            ['Year', 'Sales', 'Expenses'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ];
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            //    labels: ["January", "February", "March", "April", "May", "June", "July"],
            "type": "line",
            "series": [
                { "values": [20, 40, null, 50, 15, null, 33, 34] } /* Plot indices 2 and 5 are unavailable */
            ]
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
    TraitmentCourbe.prototype.historiqueOff = function (hist, numDoss, codeClinique) {
        var _this = this;
        this.histserv = new HistTraitCourbeService();
        this.histserv.getHistSigneCourbes(hist, numDoss, codeClinique).then(function (res) {
            _this.histc = res.getdate();
        });
    };
    TraitmentCourbe.prototype.update = function () {
        // this.DeletegetChartSurveillance(this.pass.getdossier(), this.codeClinique);
        this.getChartSurveillance(this.pass.getdossier(), this.codeClinique);
        //   this.historique(this.pass.getdossier(), this.codeClinique);
        //  this.exmp();
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