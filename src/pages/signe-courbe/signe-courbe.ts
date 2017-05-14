import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {SigneCourbe} from "../../models/SigneCourbe";
import {Variables} from "../../providers/variables";
import {SigneCourbePoulsService} from "../../services/SigneCourbePoulsService";
import {HistDossier} from "../../models/HistDossier";
import {SigneCourbeFrqService} from "../../services/SigneCourbeFrqService";
import {SigneCourbeSaturationService} from "../../services/SigneCourbeSaturationService";
import {SigneCourbeTAService} from "../../services/SigneCourbeTAService";
import {SigneCourbeTempService} from "../../services/SigneCourbeTempService";
import {HistSigneCourbeService} from "../../services/HistSigneCourbeService";
import {SQLite} from "@ionic-native/sqlite";
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-signe-courbe',
  templateUrl: 'signe-courbe.html',
  providers: [ScreenOrientation, Variables]
})

export class SigneCourbePage {
  codeClinique: any;
  tabLangue: any;
  pass: any;
  connection: boolean;
  courbePouls: Array<SigneCourbe> = [];
  courbeTA: Array<SigneCourbe> = [];
  courbeTemp: Array<SigneCourbe> = [];
  courbeSaturation: Array<SigneCourbe> = [];
  courbeFrq: Array<SigneCourbe> = [];
  private sgcPserv: any;
  histC: Array<HistDossier> = [];
  histc = new HistDossier();
  histserv: any;
  private sgcTAserv: any;
  private sgcTserv: any;
  private sgcSserv: any;
  private sgcFserv: any;
  langue: any;
  tabBarElement: any;
  chartData: any;
  pathimage = Variables.path;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private screenOrientation: ScreenOrientation, public loadingCtrl: LoadingController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.codeClinique = TabsPage.tabLangue.codeClinique;
    this.tabLangue = TabsPage.tabLangue.tabLangue;
    this.pass = TabsPage.tabLangue.pass;
    this.langue = TabsPage.tabLangue.langue;
    this.presentLoadingDefault();
    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;
        this.historiqueOff(this.histC, this.pass.getdossier(), this.codeClinique);
        this.getChartSurveillanceOff(this.pass.getdossier(), this.codeClinique);
      }
      else {
        this.connection = true;
        this.historique(this.pass.getdossier(), this.codeClinique);
        this.update();
      }
    });
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'bubbles'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.screenOrientation.unlock();
  }

  getChartSurveillance(numdoss, codeClinique) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:getChartSurveillanceAndroid>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '</ser:getChartSurveillanceAndroid>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
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
              this.courbePouls.push(courbe);
            }
            if (courbe.getdesignation() === "T.A") {
              this.courbeTA.push(courbe);
            }
            if (courbe.getdesignation() === "Température") {
              this.courbeTemp.push(courbe);
            }
            if (courbe.getdesignation() === "Saturation en O2") {
              this.courbeSaturation.push(courbe);
            }
            if (courbe.getdesignation() === "Frequence respiratoire") {
              this.courbeFrq.push(courbe);
            }
          }

          this.sgcPserv = new SigneCourbePoulsService(this.sqlite);
          this.sgcPserv.verifSigneCourbe(this.courbePouls, numdoss, codeClinique).then(res => {
            if (res === false) {
              this.sgcPserv.getSigneCourbes(this.courbePouls, numdoss, codeClinique);
            }
          });

          this.sgcTAserv = new SigneCourbeTAService(this.sqlite);
          this.sgcTAserv.verifSigneCourbe(this.courbeTA, numdoss, codeClinique).then(res => {
            if (res === false) {
              this.sgcTAserv.getSigneCourbes(this.courbeTA, numdoss, codeClinique);
            }
          });

          this.sgcTserv = new SigneCourbeTempService(this.sqlite);
          this.sgcTserv.verifSigneCourbe(this.courbeTemp, numdoss, codeClinique).then(res => {
            if (res === false) {
              this.sgcTserv.getSigneCourbes(this.courbeTemp, numdoss, codeClinique);
            }
          });

          this.sgcSserv = new SigneCourbeSaturationService(this.sqlite);
          this.sgcSserv.verifSigneCourbe(this.courbeSaturation, numdoss, codeClinique).then(res => {
            if (res === false) {
              this.sgcSserv.getSigneCourbes(this.courbeSaturation, numdoss, codeClinique);
            }
          });

          this.sgcFserv = new SigneCourbeFrqService(this.sqlite);
          this.sgcFserv.verifSigneCourbe(this.courbeFrq, numdoss, codeClinique).then(res => {
            if (res === false) {
              this.sgcFserv.getSigneCourbes(this.courbeFrq, numdoss, codeClinique);
            }
          });
          this.doublecourbes(this.courbePouls, this.courbeTA, this.courbeTemp, this.courbeSaturation, this.courbeFrq);
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  DeletegetChartSurveillance(numdoss, codeClinique) {
    this.sgcPserv = new SigneCourbePoulsService(this.sqlite);
    this.sgcPserv.deleteSigneCourbes(numdoss, codeClinique);

    this.sgcTAserv = new SigneCourbeTAService(this.sqlite);
    this.sgcTAserv.deleteSigneCourbes(numdoss, codeClinique);


    this.sgcTserv = new SigneCourbeTempService(this.sqlite);
    this.sgcTserv.deleteSigneCourbes(numdoss, codeClinique);


    this.sgcSserv = new SigneCourbeSaturationService(this.sqlite);
    this.sgcSserv.deleteSigneCourbes(numdoss, codeClinique);


    this.sgcFserv = new SigneCourbeFrqService(this.sqlite);
    this.sgcFserv.deleteSigneCourbes(numdoss, codeClinique);
  }

  getChartSurveillanceOff(numdoss, codeClinique) {
    this.sgcPserv = new SigneCourbePoulsService(this.sqlite);
    this.sgcPserv.getSigneCourbes(this.courbePouls, numdoss, codeClinique).then(resp => {
      this.courbePouls = resp;

      this.sgcTAserv = new SigneCourbeTAService(this.sqlite);
      this.sgcTAserv.getSigneCourbes(this.courbeTA, numdoss, codeClinique).then(resta => {
        this.courbeTA = resta;

        this.sgcTserv = new SigneCourbeTempService(this.sqlite);
        this.sgcTserv.getSigneCourbes(this.courbeTemp, numdoss, codeClinique).then(rest => {
          this.courbeTemp = rest;

          this.sgcSserv = new SigneCourbeSaturationService(this.sqlite);
          this.sgcSserv.getSigneCourbes(this.courbeSaturation, numdoss, codeClinique).then(ress => {
            this.courbeSaturation = ress;

            this.sgcFserv = new SigneCourbeFrqService(this.sqlite);
            this.sgcFserv.getSigneCourbes(this.courbeFrq, numdoss, codeClinique).then(resf => {
              this.courbeFrq = resf;

              this.doublecourbes(this.courbePouls, this.courbeTA, this.courbeTemp, this.courbeSaturation, this.courbeFrq);
            });
          });
        });
      });
    });
  }

  doublecourbes(courbePouls, courbeTA, courbeTemp, courbeSaturation, courbeFrq) {
    var labelcourbePouls: Array<string> = [];
    var labelcourbeTA: Array<string> = [];
    var labelcourbeTemp: Array<string> = [];
    var labelcourbeSaturation: Array<string> = [];
    var labelcourbeFrq: Array<string> = [];
    var dataPouls: Array<Number> = [];
    var dataTA1: Array<Number> = [];
    var dataTA2: Array<Number> = [];
    var dataTemp: Array<Number> = [];
    var dataSaturation: Array<Number> = [];
    var dataFrq: Array<Number> = [];

    for (var i = 0; i < courbePouls.length; i++) {
      labelcourbePouls.push((courbePouls[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbePouls[i].getdateHeurePrise()).substr(5, 2) + "-" + courbePouls[i].getheurePrise());
      dataPouls.push(Number(courbePouls[i].getquantite()));
    }
    var x, y;
    for (var i = 0; i < courbeTA.length; i++) {
      labelcourbeTA.push((courbeTA[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbeTA[i].getdateHeurePrise()).substr(5, 2) + "-" + courbeTA[i].getheurePrise());
      x = Number(courbeTA[i].getquantite().split("/")[0]);
      y = Number(courbeTA[i].getquantite().split("/")[1]);
      if (x < 45) {
        x *= 10;
      }
      if (y < 45) {
        y *= 10;
      }
      dataTA1.push(x);
      dataTA2.push(y);
    }

    for (var i = 0; i < courbeTemp.length; i++) {
      labelcourbeTemp.push((courbeTemp[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbeTemp[i].getdateHeurePrise()).substr(5, 2) + "-" + courbeTemp[i].getheurePrise());
      dataTemp.push(Number(courbeTemp[i].getquantite()));
    }

    for (var i = 0; i < courbeSaturation.length; i++) {
      labelcourbeSaturation.push((courbeSaturation[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbeSaturation[i].getdateHeurePrise()).substr(5, 2) + "-" + courbeSaturation[i].getheurePrise());
      dataSaturation.push(Number(courbeSaturation[i].getquantite()));
    }

    for (var i = 0; i < courbeFrq.length; i++) {
      labelcourbeFrq.push((courbeFrq[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbeFrq[i].getdateHeurePrise()).substr(5, 2) + "-" + courbeFrq[i].getheurePrise());
      dataFrq.push(Number(courbeFrq[i].getquantite()));
    }

    this.chartData = {
      chart: {
        type: 'line',
        zoomType: 'x',
        marginTop: 50,
        backgroundColor: 'transparent'
      },
      title: {
        text: ''
      },
      rangeSelector: {
        enabled: false,

      },
      legend: {
        layout: 'horizontal',
        align: 'top',
        verticalAlign: 'top',

      },
      xAxis: {
        categories: labelcourbePouls,
        min: labelcourbePouls.length - 3,
        scrollbar: {
          enabled: true,
          barBorderRadius: 2,
          barBorderWidth: 0,
          buttonBorderWidth: 0,
          buttonBorderRadius: 2,
          trackBackgroundColor: 'none',
          trackBorderWidth: 0,
          trackBorderRadius: 2,
          trackBorderColor: 'rgba(0,0,0,-1)'
        },
        title: {
          text: '',

        }

      },
      yAxis: {
        title: {
          text: ''
        }

      },
      tooltip: {enabled: false},

      navigator: {
        enabled: false
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [
        {
          name: courbePouls[0].getdesignation(),
          data: dataPouls,
          color: "rgb(" + courbePouls[0].getcolor() + ")"
        }, {
          name: courbeTA[0].getdesignation() + " max",
          data: dataTA1,
          color: "rgb(" + courbeTA[0].getcolor() + ")"
        }, {
          name: courbeTA[0].getdesignation() + " min",
          data: dataTA2,
          color: "rgba(75,192,192,0.4)"
        },
        {
          name: courbeTemp[0].getdesignation(),
          data: dataTemp,
          color: "rgb(" + courbeTemp[0].getcolor() + ")"
        }, {
          name: courbeSaturation[0].getdesignation(),
          data: dataSaturation,
          color: "rgb(" + courbeSaturation[0].getcolor() + ")"
        }, {
          name: courbeFrq[0].getdesignation(),
          data: dataFrq,
          color: "rgb(" + courbeFrq[0].getcolor() + ")"
        }
      ]
    }
  }

  historique(numDoss, codeClinique) {
    this.histserv = new HistSigneCourbeService(this.sqlite);
    var h = new HistDossier();
    var d = new Date();
    h.setnumDoss(numDoss);
    h.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    h.setcodeClinique(codeClinique);
    this.histC.push(h);
    try {
      this.histserv.deleteHistSigneCourbes(numDoss, codeClinique);
      this.histserv.getHistSigneCourbes(this.histC, numDoss, codeClinique).then(res => {
        this.histc = res.getdate();
      });
    }
    catch (Error) {
      this.histserv.getHistSigneCourbes(this.histC, numDoss, codeClinique).then(res => {
        this.histc = res.getdate();
      });
    }

  }

  historiqueOff(hist, numDoss, codeClinique) {
    this.histserv = new HistSigneCourbeService(this.sqlite);
    this.histserv.getHistSigneCourbes(hist, numDoss, codeClinique).then(res => {
      this.histc = res.getdate();
    });
  }

  update() {
    this.DeletegetChartSurveillance(this.pass.getdossier(), this.codeClinique);
    this.getChartSurveillance(this.pass.getdossier(), this.codeClinique);
  }
}
