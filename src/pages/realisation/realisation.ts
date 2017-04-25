import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {MdMenuTrigger} from "@angular/material";
import {Planification} from "../../models/Planification";
import {DossierPage} from "../dossier/dossier";
import {ClientDetailPage} from "../client-detail/client-detail";
import {LangueService} from "../../services/LangueService";
import {Langue} from "../../models/Langue";

@Component({
  selector: 'page-realisation',
  templateUrl: 'realisation.html',
  providers: [Variables]

})
export class RealisationPage {
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
  connection: boolean;
  tabLangue: any;
  pass: any;
  codeClinique: any;
  langue: any;
  histd: any;
  xml: any;
  dateFeuille: any;
  heureActuelle: any;
  planification: Array<Planification> = [];
  private langserv: any;
  langes: Array<Langue> = [];
  user: any;
  keyboar = 0;
  planificationvalue: Array<string> = [];
  input = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabLangue = navParams.get("tabLangue");
    this.codeClinique = navParams.get("codeClinique");
    this.pass = navParams.get("pass");
    this.langue = navParams.get("langue");
    this.dateFeuille = navParams.get("dateFeuille");
    this.heureActuelle = navParams.get("heureActuelle");


    this.user = "admin";
    this.dateFeuille = "18/05/2016";
    this.heureActuelle = "16";
    this.getAllPlanification("16002649", this.dateFeuille, "REA", this.heureActuelle);


    /*

     Variables.checconnection().then(connexion => {
     if (connexion === false) {
     this.connection = false;

     } else {
     this.connection = true;
     this.langserv = new LangueService();
     this.langserv.getLangues(this.langes).then(lg => {
     this.getAllPlanification(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.heureActuelle);
     this.user = lg.getnom();
     });
     }
     });
     this.histd = DossierPage.hist;
     */
  }


  getAllPlanification(numDoss, dateFeuille, nature, heure) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:getPlanificationNonRealise>' +
      '<numdoss>' + numDoss + '</numdoss>' +
      '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
      '<nature>' + nature + '</nature>' +
      '<heure>' + heure + '</heure>' +
      '</ser:getPlanificationNonRealise>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, p;
          x = this.xml.getElementsByTagName("return");
          console.log(x);
          for (i = 0; i < x.length; i++) {
            p = new Planification();
            p.setcodeType(x[i].children[0].textContent);
            p.setdesignation(x[i].children[1].textContent);
            p.getdate(x[i].children[2].children[0].textContent);
            p.setheurePrise(x[i].children[2].children[1].textContent);
            p.setnum(x[i].children[2].children[2].textContent);
            p.setseuilMax(x[i].children[3].textContent);
            p.setseuilMin(x[i].children[4].textContent);
            p.settype(x[i].children[5].textContent);
            p.setrang(i);
            this.planification.push(p);
            this.planificationvalue.push("");
            console.log(p);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  CreatePlusieursRealisation(traitsList, qtesList) {
    console.log(traitsList + "  q  " + qtesList);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:CreatePlusieursRealisation>' +
      '<numTr>' + traitsList + '</numTr>' +
      '<date_prise>' + this.dateFeuille + '</date_prise>' +
      '<heure_prise>' + this.heureActuelle + '</heure_prise>' +
      '<qnt>' + qtesList + '</qnt>' +
      '<user>' + this.user + '</user>' +
      '</ser:CreatePlusieursRealisation>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x
          x = this.xml.getElementsByTagName("return");
          console.log(x);
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  goToInfPage(patient) {
    this.navCtrl.push(ClientDetailPage,
      {
        patient: patient,
        motif: DossierPage.motifhh,
        tabLangue: this.tabLangue,
        langue: this.langue,
        codeClinique: this.codeClinique
      });
  }

  keyboardShow(rang, designation) {

    switch (designation) {
      case "T.A":
        this.keyboar = 2;
        break;
      case "Pouls":
        this.keyboar = 3;
        break;
      case "Température":
        this.keyboar = 4;
        break;
      case "ETC02":
        this.keyboar = 5;
        break;
      case "SP02":
        this.keyboar = 6;
        break;
      default:
        this.keyboar = 1;
        break;
    }
    this.input = rang;
  }

  updateInput(value) {
    if (this.keyboar > 2) {
      this.planificationvalue[this.input] = value;
      this.input = -1;
      this.keyboar = 0;
    } else {
      switch (value) {
        case "OK":
          this.keyboar = 0;
          break;
         case "delete":
         if(this.planificationvalue[this.input].length>0){
           this.planificationvalue[this.input]=this.planificationvalue[this.input].substr(0,this.planificationvalue[this.input].length-1);
         }
          break;
        default:
          this.planificationvalue[this.input] += value;
          break;
      }
    }
  }
}
