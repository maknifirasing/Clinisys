import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Client} from "../../models/Client";
import {Variables} from "../../providers/variables";
import {DetailPerPagePage} from "../detail-per-page/detail-per-page";
import {SigneCourbe} from "../../models/SigneCourbe";
import { Chart } from 'chart.js';
import  {} from 'chartjs-plugin-zoom';
/*
  Generated class for the ClientDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html',
  providers: [Variables]
})
export class ClientDetailPage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  test:string;
  courbePouls: Array<SigneCourbe> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
this.getChartSurveillance("16002649");
  }

  ionViewDidLoad() {
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
          ],
        },
      options:{  pan: {
        // Boolean to enable panning
        enabled: true,

        // Panning directions. Remove the appropriate direction to disable
        // Eg. 'y' would only allow panning in the y direction
        mode: 'xy'
      },

        // Container for zoom options
        zoom: {
          // Boolean to enable zooming
          enabled: true,

          // Zooming directions. Remove the appropriate direction to disable
          // Eg. 'y' would only allow zooming in the y direction
          mode: 'xy',
        }}


      });
   /* this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
    "scale-x": {
    "zooming":true,
    "zoom-to":[0,50],
    "item":{
    "font-size":10
    },
    "scale-y": {
    "zooming":true,
    "zoom-to":[100,200],
    "values": "50:350:50",
    "guide":{
    "line-style":"dotted"
    },
    "item":{
    "font-size":10
    }
    },
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
        ],
        options:{
          scales: {
            xAxes:[{
              "zooming":true
            }]
          }
        }
      }

    });*/

  }















  goToHomePage(){

    this.navCtrl.push(DetailPerPagePage);
  }
  getChartSurveillance(numDoss){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:getChartSurveillanceAndroid>' +
      '<numdoss>' + numDoss + '</numdoss>' +
      '</ser:getChartSurveillanceAndroid>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {

            var xml = xmlhttp.responseXML;
            var x;
            x = xml.getElementsByTagName("return");
          //  console.log(x);
            var courbe,i;
            for (i = 0; i < x.length; i++) {
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
              if((x[i].children[1].textContent)==="Pouls"){
                this.courbePouls.push(courbe);

              }

            }

        /*    var d=new Date((this.courbePouls[0].getdateHeurePrise()).substr(0,10));
          console.log("date "+d);
          console.log("day "+d.getDay());
          console.log("month "+d.getMonth());*/
        this.cPouls(this.courbePouls);
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
  cPouls(courbes) {

    var d=new Date((courbes[0].getdateHeurePrise()).substr(0,10));
    console.log("date "+d);
    console.log("day "+d.getDay());
    console.log("month "+d.getMonth());
    var label: Array<string> = [];
    var dat;
    var lb = "";
 /*   for (var i = 0; courbes.length; i++) {
     // dat = new Date((courbes[i].getdateHeurePrise()).substr(0, 10));
      lb = dat.getDay() + "/" + dat.getMonth() + "-" + courbes[i].getheurePrise();
      label.push(lb);
    }*/
  //  alert(label[0]);
   //  console.log(lb);


  }
}
