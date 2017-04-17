import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {TraitCourbe} from "../../models/TraitCourbe";

@Component({
  selector: 'page-try',
  templateUrl: 'try.html',
  providers: [Variables]
})
export class TryPage {
  chartData: any;
  traitcourbe: Array<TraitCourbe> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.getChartSurveillance("16002649", "111");
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
          this.onecourbes(this.traitcourbe);
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
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
          data.push(j +1);

        }
      }

      labels.push({
        from: j+1,
        to: j+1.1,
        color: "#f0f0f0",
        label: {
          text: nomcourbe[j]
          ,style: {
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
        categories: labelcourbe
      },
      yAxis: {


        plotBands: labels,
      }
      ,legend: {
        enabled: false
      },
      series:dataset
    };

  }


}
