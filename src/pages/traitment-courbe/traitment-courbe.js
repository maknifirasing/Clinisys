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
import { TraitCourbe } from "../../models/TraitCourbe";
import { HistTraitCourbeService } from "../../services/HistTraitCourbeService";
import { HistDossier } from "../../models/HistDossier";
import { TraitCourbeService } from "../../services/TraitCourbeService";
var TraitmentCourbe = (function () {
    function TraitmentCourbe(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
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
        xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
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
                if (courbe[i].getdesignation() === '') {
                    designation.push(" ");
                }
                else {
                    designation.push(courbe[i].getdesignation());
                }
            }
        }
        var c;
        var b, e;
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
                        data.push(null);
                        c--;
                    }
                    data.push([j + 1]);
                }
            }
            e = data[data.length - 1];
            data[data.length] = {
                y: e[0],
                dataLabels: {
                    format: designation[j],
                    enabled: true,
                    style: {
                        fontWeight: 'bold'
                    }
                }
            };
            dataset.push({
                name: nomcourbe[j],
                data: data,
                color: "#1E88E5"
            });
        }
        this.chartData = {
            chart: {
                type: 'line',
                zoomType: 'y',
                backgroundColor: 'transparent'
            },
            title: {
                text: ''
            },
            tooltip: { enabled: false },
            xAxis: {
                categories: labelcourbe,
                title: {
                    text: null
                },
            },
            navigator: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: ''
                },
                min: 15,
                max: nomcourbe.length + 2,
                scrollbar: {
                    enabled: true,
                    barBorderRadius: 7,
                    barBorderWidth: 0,
                    buttonBorderWidth: 0,
                    buttonBorderRadius: 7,
                    trackBackgroundColor: 'none',
                    trackBorderWidth: 0,
                    trackBorderRadius: 8,
                    trackBorderColor: 'rgba(0,0,0,-1)'
                }
            },
            legend: {
                enabled: false
            },
            series: dataset
        };
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
TraitmentCourbe = __decorate([
    Component({
        selector: 'page-traitment-courbe',
        templateUrl: 'traitment-courbe.html',
        providers: [Variables]
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], TraitmentCourbe);
export { TraitmentCourbe };
//# sourceMappingURL=traitment-courbe.js.map