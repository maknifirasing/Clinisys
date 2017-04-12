import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Chart} from 'chart.js';
import {Variables} from "../../providers/variables";
import {TraitCourbe} from "../../models/TraitCourbe";
import {HistTraitCourbeService} from "../../services/HistTraitCourbeService";
import {HistDossier} from "../../models/HistDossier";
import {TraitCourbeService} from "../../services/TraitCourbeService";

@Component({
  selector: 'page-traitment-courbe',
  templateUrl: 'traitment-courbe.html',
  providers: [Variables]
})
export class TraitmentCourbe {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  codeClinique: any;
  tabLangue: any;
  pass: any;
  connection: boolean;
  traitcourbe: Array<TraitCourbe> = [];
  langue: any;
  tabBarElement: any;
  histC: Array<HistDossier> = [];
  histc = new HistDossier();
  histserv: any;
  private traitserv: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, platform: Platform) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.codeClinique = navParams.get("codeClinique");
    this.tabLangue = navParams.get("tabLangue");
    this.pass = navParams.get("pass");
    this.langue = navParams.get("langue");
    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;
        this.getChartSurveillanceOff(this.traitcourbe, this.pass.getdossier(), this.codeClinique);
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
      '<ser:getListeTraitementSureveillanceRegimePancarte>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '</ser:getListeTraitementSureveillanceRegimePancarte>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
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
            this.traitcourbe.push(courbe);
          }
          this.traitserv = new TraitCourbeService();
          this.traitserv.verifTraitCourbe(this.traitcourbe, numdoss, codeClinique).then(res => {
            if (res === false) {
              this.traitserv.getTraitCourbes(this.traitcourbe, numdoss, codeClinique);
            }
          });
          this.onecourbes(this.traitcourbe);
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  getChartSurveillanceOff(traitcourbe, numdoss, codeClinique) {
    this.traitserv = new TraitCourbeService();
    this.traitserv.getTraitCourbes(traitcourbe, numdoss, codeClinique).then(res => {
      this.onecourbes(res);
    });
  }

  DeletegetChartSurveillance(numdoss, codeClinique) {
    this.traitserv = new TraitCourbeService();
    this.traitserv.deleteTraitCourbes(numdoss, codeClinique);
  }

  exist(t, ch): number {
    for (var i = 0; i < t.length; i++) {
      if (t[i] === ch) {
        return i;
      }
    }
    return -1;
  }

  onecourbes(courbe) {
    var labelcourbe: Array<string> = [];
    var designation: Array<string> = [];
    var data: Array<object> = [];
    var nomcourbe: Array<string> = [];
    var dataset: Array<object> = [];

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
            data.push(
              {
                x: null,
                y: null,
                titre: null
              });
            c--;
          }
          data.push(
            {
              x: x,
              y: j + 1,
              titre: designation[j]
            }
          );

        }
      }
      while (data.length < labelcourbe.length + 1) {
        data.push(
          {
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
            ticks: {min: 0, max: nomcourbe.length + 1},
            barPercentage: 9.0,
            height:10

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
                    } else {
                      ctx.fillText("", model.x, model.y - 5);
                    }
                  } catch (Err) {
                    ctx.fillText("", model.x, model.y - 5);
                  }
                }
              }
            });
          }
        }
      }

    });

  }

  historique(numDoss, codeClinique) {
    this.histserv = new HistTraitCourbeService();
    var h = new HistDossier();
    var d = new Date();
    h.setnumDoss(numDoss);
    h.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    h.setcodeClinique(codeClinique);
    this.histC.push(h);
    try {
      this.histserv.deleteHistTraitCourbes(numDoss, codeClinique);
      this.histserv.getHistTraitCourbes(this.histC, numDoss, codeClinique).then(res => {
        this.histc = res.getdate();
      });
    }
    catch (Error) {
      this.histserv.getHistTraitCourbes(this.histC, numDoss, codeClinique).then(res => {
        this.histc = res.getdate();
      });
    }
  }

  historiqueOff(hist, numDoss, codeClinique) {
    this.histserv = new HistTraitCourbeService();
    this.histserv.getHistTraitCourbes(hist, numDoss, codeClinique).then(res => {
      this.histc = res.getdate();
    });
  }

  update() {
    this.DeletegetChartSurveillance(this.pass.getdossier(), this.codeClinique);
    this.getChartSurveillance(this.pass.getdossier(), this.codeClinique);
    this.historique(this.pass.getdossier(), this.codeClinique);
  }

}
