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
    xmlhttp.open('POST', this.Url.url + 'dmi-core/ReaWSService?wsdl', true);
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

  onecourbes(courbe) {
    var labelcourbe: Array<string> = [];

    var data: Array<string> = [];

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
            ticks: {min: Number(courbe[0].getseuilMin()), max: Number(courbe[0].getseuilMax())}
          }
          ],
          /*  xAxes: [{
           showXLabels: 1,
           interval: 1,
           scrollX: true
           }]*/
        }
      }

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
            ScaleShowLabels: true
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          /*        yAxes: [{
           ticks: {min: Number(courbePouls[0].getseuilMin()), max: Number(courbePouls[0].getseuilMax())}
           },
           {
           ticks: {min: Number(courbeTA[0].getseuilMin()), max: Number(courbeTA[0].getseuilMax())}
           },
           {
           ticks: {min: Number(courbeTA[0].getseuilMin()), max: Number(courbeTA[0].getseuilMax())}
           },
           {
           ticks: {min: Number(courbeTemp[0].getseuilMin()), max: Number(courbeTemp[0].getseuilMax())}
           },
           {
           ticks: {min: Number(courbeSaturation[0].getseuilMin()), max: Number(courbeSaturation[0].getseuilMax())}
           },
           {
           ticks: {min: Number(courbeFrq[0].getseuilMin()), max: Number(courbeFrq[0].getseuilMax())}
           }

           ]*/
        }
      }

    });
  }


  exmp() {
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

  /*
   ,
   deferred: {           // enabled by default
   xOffset: 150,     // defer until 150px of the canvas width are inside the viewport
   yOffset: '50%',   // defer until 50% of the canvas height are inside the viewport
   delay: 500        // delay of 500 ms after the canvas is considered inside the viewport
   },
   */
}
