import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Chart} from 'chart.js';
import {SigneCourbe} from "../../models/SigneCourbe";
import {Variables} from "../../providers/variables";
import {max} from "rxjs/operator/max";
import {min} from "rxjs/operator/min";
import {SigneCourbePoulsService} from "../../services/SigneCourbePoulsService";
import {HistDossierService} from "../../services/HistDossierService";
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
  private langue: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, public platform: Platform) {
    this.codeClinique = navParams.get("codeClinique");
    this.tabLangue = navParams.get("tabLangue");
    this.pass = navParams.get("pass");
    this.langue = navParams.get("langue");
    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;
        this.getChartSurveillanceOff(this.pass.getdossier(), this.codeClinique);
        this.historiqueOff(this.histC, this.pass.getdossier(), this.codeClinique)
      }
      else {
        this.connection = true;

        this.update();
      }
    });

  }

  ionViewDidLoad() {
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
    this.courbePouls = this.sgcPserv.getSigneCourbes(this.courbePouls, numdoss, codeClinique);

    this.sgcTAserv = new SigneCourbeTAService();
    this.courbeTA = this.sgcTAserv.getSigneCourbes(this.courbeTA, numdoss, codeClinique);


    this.sgcTserv = new SigneCourbeTempService();
    this.courbeTemp = this.sgcTserv.getSigneCourbes(this.courbeTemp, numdoss, codeClinique);


    this.sgcSserv = new SigneCourbeSaturationService();
    this.courbeSaturation = this.sgcSserv.getSigneCourbes(this.courbeSaturation, numdoss, codeClinique);


    this.sgcFserv = new SigneCourbeFrqService();
    this.courbeFrq = this.sgcFserv.getSigneCourbes(this.courbeFrq, numdoss, codeClinique);

  }

  cPouls(courbe) {
    var labelcourbe: Array<string> = [];

    var data: Array<string> = [];

    for (var i = 0; i < courbe.length; i++) {
      labelcourbe.push((courbe[i].getdateHeurePrise()).substr(8, 2) + "/" + (courbe[i].getdateHeurePrise()).substr(5, 2) + "-" + courbe[i].getheurePrise());
      data.push(courbe[i].getquantite())
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
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data,
          spanGaps: true
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {min: Number(courbe[0].getseuilMin()), max: Number(courbe[0].getseuilMax())},
          }
          ],
          xAxes: [{
            scaleOverride: true,
            scaleSteps: 3,
            //     scaleStepWidth: Math.ceil(max / steps),
            scaleStartValue: data[data.length - 3]
          }]
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


}
