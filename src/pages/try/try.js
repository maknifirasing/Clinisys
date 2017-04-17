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
import { Ng2Highcharts } from 'ng2-highcharts';
var TryPage = (function () {
    function TryPage(navCtrl, navParams, Url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Url = Url;
        this.clientList = [];
        this.chartData = {
            chart: {
                type: 'column'
            },
            xAxis: {
                categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            },
            series: [
                {
                    name: 'NC',
                    data: [7057, 6858, 6643, 6570, 6115, 107, 31, 635, 203, 2, 2]
                }, {
                    name: 'OK',
                    data: [54047, 52484, 50591, 49479, 46677, 33, 156, 947, 408, 6, 2]
                }, {
                    name: 'KO',
                    data: [11388, 11115, 10742, 10757, 10290, 973, 914, 4054, 732, 34, 2]
                }, {
                    name: 'VALID',
                    data: [8836, 8509, 8255, 7760, 7621, 973, 914, 4054, 732, 34, 2]
                }, {
                    name: 'CHECK',
                    data: [115, 162, 150, 187, 172, 973, 914, 4054, 732, 34, 2]
                }, {
                    name: 'COR',
                    data: [12566, 12116, 11446, 10749, 10439, 973, 914, 4054, 732, 34, 2]
                }
            ]
        };
    }
    TryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ClientDetailPage');
    };
    return TryPage;
}());
TryPage = __decorate([
    Component({
        selector: 'page-try',
        templateUrl: 'try.html',
        providers: [Variables, Ng2Highcharts]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Variables])
], TryPage);
export { TryPage };
//# sourceMappingURL=try.js.map