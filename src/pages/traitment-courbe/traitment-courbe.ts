import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
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
  chartData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    var data: Array<Number> = [];
    var nomcourbe: Array<string> = [];
    var labels: Array<object> = [];
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
            data.push(null);
            c--;
          }
          data.push(j + 1);

        }
      }

      labels.push({
        from: j + 1,
        to: j + 1.1,
        color: "#f0f0f0",
        label: {
          text: nomcourbe[j]
          , style: {
            color: '#94bef0'
          }
        }
      });

      dataset.push({
        name: nomcourbe[j],
        data: data
      });
    }
    this.chartData = {
      chart: {
        type: 'line',
        zoomType: 'y'
      },
      xAxis: {
        categories: labelcourbe,
        title: {
          text: null
        }
      },
      yAxis: {


        plotBands: labels,
      }
      , legend: {
        enabled: false
      },
      series: dataset
    };

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
