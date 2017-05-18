import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {RealisationTest} from "../../models/RealisationTest";
import {Langue} from "../../models/Langue";
import {Planification} from "../../models/Planification";
import {Variables} from "../../providers/variables";
import {TabsPage} from "../tabs/tabs";
import {SQLite} from "@ionic-native/sqlite";
import {ClientDetailPage} from "../client-detail/client-detail";
import {LangueService} from "../../services/LangueService";
import {DossierPage} from "../dossier/dossier";

@Component({
  selector: 'page-realisation',
  templateUrl: 'realisation.html',
})
export class RealisationPage {
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
  planificationvalue: Array<RealisationTest> = [];
  inputrange: number;
  plus = true;
  moins = true;
  heure: any;
  clavier: boolean;
  pathimage = Variables.path;
  p: number;
  m: number;
  listerealisation: any;
  device=Variables.device;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private sqlite: SQLite) {
    this.codeClinique = TabsPage.tabLangue.codeClinique;
    this.tabLangue = TabsPage.tabLangue.tabLangue;
    this.pass = TabsPage.tabLangue.pass;
    this.dateFeuille = TabsPage.tabLangue.dateFeuille;
    this.langue = TabsPage.tabLangue.langue;
    this.heureActuelle = new Date(TabsPage.heureActuelle);
    if (isNaN(this.heureActuelle.getTime())) {
      this.heureActuelle = new Date();
    }
    this.heure = this.heureActuelle;
    this.p = Number(this.heureActuelle.getHours() + 1);
    this.m = Number(this.heureActuelle.getHours() - 6);

    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;

      } else {
        this.connection = true;
        this.langserv = new LangueService(this.sqlite);
        this.langserv.getLangues(this.langes).then(lg => {
          this.getAllPlanification(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.heureActuelle);
          this.user = lg.getnom();
        });
      }
    });
    this.histd = DossierPage.hist;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Realisation');
  }
  getAllPlanification(numDoss, dateFeuille, nature, heure) {
    this.clavier = true;
    this.keyboar = 0;
    this.inputrange = 0;

    if (this.keyboar !== 0) {
      this.listerealisation = 'liste-show';
    } else {
      this.listerealisation = '';
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:getAllPlanification>' +
      '<numdoss>' + numDoss + '</numdoss>' +
      '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
      '<nature>' + nature + '</nature>' +
      '<heure>' + heure + '</heure>' +
      '</ser:getAllPlanification>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, p, r;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            p = new Planification();
            p.setcodeType(x[i].children[0].textContent);
            p.setdesignation(x[i].children[1].textContent);
            p.setheureRealisation(x[i].children[2].textContent);
            p.getdate(x[i].children[3].children[0].textContent);
            p.setheurePrise(x[i].children[3].children[1].textContent);
            p.setnum(x[i].children[3].children[2].textContent);
            p.setposologie(x[i].children[4].textContent);
            p.setquantite(x[i].children[5].textContent);
            p.setseuilMax(x[i].children[6].textContent);
            p.setseuilMin(x[i].children[7].textContent);
            p.settype(x[i].children[8].textContent);
            p.setrang(i);
            if (p.getdesignation().indexOf('@') > -1) {
              p.setposologie(p.getdesignation().split('@')[1]);
              p.setdesignation(p.getdesignation().split('@')[0]);
            }
            if (p.getdesignation() === 'OXYGENE' || p.getdesignation() === 'Insuline') {
              p.setpave('text');
            } else {
              p.setpave('text');
            }
            this.planification.push(p);
            r = new RealisationTest();
            r.setclavier("false");
            if (p.getquantite() !== "") {
              r.setvaleur(p.getquantite());
              r.setdisabled("true");
            } else {
              r.setvaleur("");
              r.setdisabled("false");
            }
            switch (p.getdesignation()) {
              case "T.A":
                r.setkeyboard(2);
                break;
              case "Pouls":
                r.setkeyboard(3);
                break;
              case "Température":
                r.setkeyboard(4);
                break;
              case "ETC02":
                r.setkeyboard(5);
                break;
              case "SP02":
                r.setkeyboard(6);
                break;
              default:
                r.setkeyboard(1);
                break;
            }
            this.planificationvalue.push(r);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  CreatePlusieursRealisation(traitsList, qtesList) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:CreatePlusieursRealisation>' +
      '<numTr>' + traitsList + '</numTr>' +
      '<date_prise>' + this.dateFeuille + '</date_prise>' +
      '<heure_prise>' + this.heure.getHours() + '</heure_prise>' +
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
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  presentConfirm(designation, numTr, rang) {
    let alert = this.alertCtrl.create({
      title: this.tabLangue.titreconfirmation,
      message: this.tabLangue.titremessConf + designation + " ?",
      buttons: [
        {
          text: this.tabLangue.titreNon,
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: this.tabLangue.titreoui,
          handler: () => {
            this.AnnulerRealisation(numTr, rang);
          }
        }
      ]
    });
    alert.present();
  }

  AnnulerRealisation(numTr, rang) {
    this.clavier = true;
    this.keyboar = 0;
    this.inputrange = 0;
    if (this.keyboar !== 0) {
      this.listerealisation = 'liste-show';
    } else {
      this.listerealisation = '';
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:AnnulerRealisation>' +
      '<numTr>' + numTr + '</numTr>' +
      '<date>' + this.dateFeuille + '</date>' +
      '<heure>' + this.heure.getHours() + '</heure>' +
      '<user>' + this.user + '</user>' +
      '<numDoss>' + this.pass.getdossier() + '</numDoss>' +
      '<codePosologie></codePosologie>' +
      '</ser:AnnulerRealisation>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x
          x = this.xml.getElementsByTagName("return");
          this.planificationvalue[rang].setdisabled('false');
          this.planificationvalue[rang].setvaleur('');
          this.selectInput();
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  goToInfPage() {
    this.navCtrl.push(ClientDetailPage);
  }

  selectInput() {
    var b = false;
    var i = 0;
    while (b === false || i < this.planificationvalue.length) {
      if (this.planificationvalue[i].getdisabled() === 'false') {
        b = true;
        this.inputrange = i;
        this.keyboar = this.planificationvalue[i].getkeyboard();
      }
      i++;
    }
    if (this.keyboar !== 0) {
      this.listerealisation = 'liste-show';
    } else {
      this.listerealisation = '';
    }
  }

  keyboardShow(rang) {
    this.inputrange = rang;
    if (this.planificationvalue[rang].getdisabled() === 'false') {
      this.keyboar = this.planificationvalue[rang].getkeyboard();
      if (this.planificationvalue[rang].getclavier() === 'true') {
        this.clavier = false;
      }
      else {
        this.clavier = true;
      }
    } else {
      this.keyboar = 0;
      this.clavier = false;
    }
    if (this.keyboar !== 0) {
      this.listerealisation = 'liste-show';
    } else {
      this.listerealisation = '';
    }
  }

  luck() {
    var val;
    if (this.langue === 'arabe') {
      val = (<HTMLInputElement>document.getElementById(this.inputrange + "inputt")).value + "";
    } else {
      val = (<HTMLInputElement>document.getElementById(this.inputrange + "input")).value + "";
    }

    if (val.length > 0 && val !== " ") {
      this.planificationvalue[this.inputrange].setvaleur(val);
      this.CreatePlusieursRealisation(this.planification[this.inputrange].getnum(), this.planificationvalue[this.inputrange].getvaleur());
      this.planificationvalue[this.inputrange].setdisabled('true');
      this.selectInput();
    }
    this.planificationvalue[this.inputrange].setclavier('false');
    this.inputrange = -1;
    this.keyboar = 0;
    if (this.keyboar !== 0) {
      this.listerealisation = 'liste-show';
    } else {
      this.listerealisation = '';
    }
  }

  updateInput(value) {
    this.clavier = true;
    if (this.keyboar !== 0) {
      this.listerealisation = 'liste-show';
    } else {
      this.listerealisation = '';
    }
    if (this.planificationvalue[this.inputrange].getdisabled() === 'false') {
      if (value === 'clavier') {
        this.clavier = false;
        this.keyboar = 0;
        this.planificationvalue[this.inputrange].setclavier("true");
        setTimeout(() => {
          document.getElementById(this.inputrange + "input").focus();
        }, 10);
      }
      else if (value !== 'clavier') {
        this.clavier = true;
        this.planificationvalue[this.inputrange].setclavier("false");
        if (this.keyboar > 0 && this.keyboar < 3) {
          switch (value) {
            case "X":
              this.keyboar = 0;
              this.planificationvalue[this.inputrange].setvaleur(value);
              this.CreatePlusieursRealisation(this.planification[this.inputrange].getnum(), this.planificationvalue[this.inputrange].getvaleur());
              this.planificationvalue[this.inputrange].setdisabled('true');
              this.planificationvalue[this.inputrange].setclavier('false');
              this.clavier = false;
              this.inputrange = -1;
              this.selectInput();
              break;
            case "R":
              this.keyboar = 0;
              this.planificationvalue[this.inputrange].setvaleur(value);
              this.CreatePlusieursRealisation(this.planification[this.inputrange].getnum(), this.planificationvalue[this.inputrange].getvaleur());
              this.planificationvalue[this.inputrange].setdisabled('true');
              this.planificationvalue[this.inputrange].setclavier('false');
              this.clavier = false;
              this.selectInput();
              break;
            case "//":
              this.keyboar = 0;
              this.planificationvalue[this.inputrange].setvaleur(value);
              this.CreatePlusieursRealisation(this.planification[this.inputrange].getnum(), this.planificationvalue[this.inputrange].getvaleur());
              this.planificationvalue[this.inputrange].setdisabled('true');
              this.planificationvalue[this.inputrange].setclavier('false');
              this.clavier = false;
              this.selectInput();
              break;
            case "OK":
              this.keyboar = 0;
              this.CreatePlusieursRealisation(this.planification[this.inputrange].getnum(), this.planificationvalue[this.inputrange].getvaleur());
              this.planificationvalue[this.inputrange].setdisabled('true');
              this.planificationvalue[this.inputrange].setclavier('false');
              this.clavier = false;
              this.selectInput();
              break;
            case "delete":
              if (this.planificationvalue[this.inputrange].getvaleur().length > 0) {
                this.planificationvalue[this.inputrange].setvaleur(this.planificationvalue[this.inputrange].getvaleur().substr(0, this.planificationvalue[this.inputrange].getvaleur().length - 1));
              }
              break;
            default:
              this.planificationvalue[this.inputrange].setvaleur(this.planificationvalue[this.inputrange].getvaleur() + value);
              break;
          }
        } else if (this.keyboar > 2) {
          this.planificationvalue[this.inputrange].setvaleur(value);
          this.keyboar = 0;
          this.clavier = false;
          this.CreatePlusieursRealisation(this.planification[this.inputrange].getnum(), this.planificationvalue[this.inputrange].getvaleur());
          this.planificationvalue[this.inputrange].setdisabled('true');
          this.planificationvalue[this.inputrange].setclavier('false');
          this.selectInput();
        }
      }
    }
    if (this.keyboar !== 0) {
      this.listerealisation = 'liste-show';
    } else {
      this.listerealisation = '';
    }
  }

  addHeure() {
    var x = this.heure.getHours();
    this.heure.setHours(x + 1);
    if (Number(this.heure.getHours()) === this.p) {
      this.plus = false;
    }
    if (Number(this.heure.getHours()) !== this.m) {
      this.moins = true;
    }
    this.update();
  }

  removeHeure() {
    var x = this.heure.getHours();
    this.heure.setHours(x - 1);
    if (Number(this.heure.getHours()) === this.m) {
      this.moins = false;
    }
    if (Number(this.heure.getHours()) !== this.p) {
      this.plus = true;
    }
    this.update();
  }

  update() {
    this.planification.length = 0;
    this.planification = [];
    this.planificationvalue.length = 0;
    this.planificationvalue = [];
    this.getAllPlanification(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.heure.getHours());
  }
  goBack(){
    this.navCtrl.parent.viewCtrl.dismiss();
  }
}
