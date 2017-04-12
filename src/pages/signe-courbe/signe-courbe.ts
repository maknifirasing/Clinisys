import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Chart} from 'chart.js';
import {SigneCourbe} from "../../models/SigneCourbe";
import {Variables} from "../../providers/variables";
import {SigneCourbePoulsService} from "../../services/SigneCourbePoulsService";
import {HistDossier} from "../../models/HistDossier";
import {SigneCourbeFrqService} from "../../services/SigneCourbeFrqService";
import {SigneCourbeSaturationService} from "../../services/SigneCourbeSaturationService";
import {SigneCourbeTAService} from "../../services/SigneCourbeTAService";
import {SigneCourbeTempService} from "../../services/SigneCourbeTempService";
import {HistSigneCourbeService} from "../../services/HistSigneCourbeService";

@Component({
  selector: 'page-signe-courbe',
  templateUrl: 'signe-courbe.html',
  providers: [Variables]
})
export class SigneCourbePage {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, platform: Platform) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    this.codeClinique = navParams.get("codeClinique");
    this.tabLangue = navParams.get("tabLangue");
    this.pass = navParams.get("pass");
    this.langue = navParams.get("langue");
    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;
        this.getChartSurveillanceOff(this.pass.getdossier(), this.codeClinique);
        this.historiqueOff(this.histC, this.pass.getdossier(), this.codeClinique);
      }
      else {
        this.connection = true;
        this.update();
      }
    });
  }


  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
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

          this.sgcPserv = new SigneCourbePoulsService();
          this.sgcPserv.verifSigneCourbe(this.courbePouls, numdoss, codeClinique).then(res => {
            if (res === false) {
              this.sgcPserv.getSigneCourbes(this.courbePouls, numdoss, codeClinique);
            }
          });

          this.sgcTAserv = new SigneCourbeTAService();
          this.sgcTAserv.verifSigneCourbe(this.courbeTA, numdoss, codeClinique).then(res => {
            if (res === false) {
              this.sgcTAserv.getSigneCourbes(this.courbeTA, numdoss, codeClinique);
            }
          });

          this.sgcTserv = new SigneCourbeTempService();
          this.sgcTserv.verifSigneCourbe(this.courbeTemp, numdoss, codeClinique).then(res => {
            if (res === false) {
              this.sgcTserv.getSigneCourbes(this.courbeTemp, numdoss, codeClinique);
            }
          });

          this.sgcSserv = new SigneCourbeSaturationService();
          this.sgcSserv.verifSigneCourbe(this.courbeSaturation, numdoss, codeClinique).then(res => {
            if (res === false) {
              this.sgcSserv.getSigneCourbes(this.courbeSaturation, numdoss, codeClinique);
            }
          });

          this.sgcFserv = new SigneCourbeFrqService();
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
  }

  getChartSurveillanceOff(numdoss, codeClinique) {
    this.sgcPserv = new SigneCourbePoulsService();
    this.sgcPserv.getSigneCourbes(this.courbePouls, numdoss, codeClinique).then(resp => {
      this.courbePouls = resp;

      this.sgcTAserv = new SigneCourbeTAService();
      this.sgcTAserv.getSigneCourbes(this.courbeTA, numdoss, codeClinique).then(resta => {
        this.courbeTA = resta;

        this.sgcTserv = new SigneCourbeTempService();
        this.sgcTserv.getSigneCourbes(this.courbeTemp, numdoss, codeClinique).then(rest => {
          this.courbeTemp = rest;

          this.sgcSserv = new SigneCourbeSaturationService();
          this.sgcSserv.getSigneCourbes(this.courbeSaturation, numdoss, codeClinique).then(ress => {
            this.courbeSaturation = ress;

            this.sgcFserv = new SigneCourbeFrqService();
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
    var dataPouls: Array<string> = [];
    var dataTA1: Array<string> = [];
    var dataTA2: Array<string> = [];
    var dataTemp: Array<string> = [];
    var dataSaturation: Array<string> = [];
    var dataFrq: Array<string> = [];

    for (var i = 0; i < courbePouls.length; i++) {
      labelcourbePouls.push((courbePouls[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbePouls[i].getdateHeurePrise()).substr(5, 2) + "-" + courbePouls[i].getheurePrise());
      dataPouls.push(courbePouls[i].getquantite());
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
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,0.4)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,0.4)",
            pointBackgroundColor: "rgba(75,192,192,0.4)",
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgba(75,192,192,0.4)",
            pointHoverBorderColor: "rgba(75,192,192,0.4)",
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
        /*     animation: {
         onComplete: function () {
         var ctx = this.chart.ctx;
         ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
         ctx.fillStyle = "black";
         ctx.textAlign = 'center';
         ctx.textBaseline = 'bottom';

         this.data.datasets.forEach(function (dataset) {
         for (var i = 0; i < dataset.data.length; i++) {
         for (var key in dataset._meta) {
         var model = dataset._meta[key].data[i]._model;
         ctx.fillText(dataset.data[i], model.x, model.y - 5);
         }
         }
         });
         }
         }
         */
      }

    });
  }

  historique(numDoss, codeClinique) {
    this.histserv = new HistSigneCourbeService();
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
    this.histserv = new HistSigneCourbeService();
    this.histserv.getHistSigneCourbes(hist, numDoss, codeClinique).then(res => {
      this.histc = res.getdate();
    });
  }

  update() {
    this.DeletegetChartSurveillance(this.pass.getdossier(), this.codeClinique);
    this.getChartSurveillance(this.pass.getdossier(), this.codeClinique);
    this.historique(this.pass.getdossier(), this.codeClinique);
  }
}
