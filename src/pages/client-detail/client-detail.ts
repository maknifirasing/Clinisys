import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Client} from "../../models/Client";
import {Variables} from "../../providers/variables";
import {DetailPerPagePage} from "../detail-per-page/detail-per-page";
import {SigneCourbe} from "../../models/SigneCourbe";

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
  test:string;
  courbePouls: Array<SigneCourbe> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
this.getChartSurveillance("16002649");
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
