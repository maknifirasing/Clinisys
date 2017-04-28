import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {MdMenuTrigger} from "@angular/material";
import {Planification} from "../../models/Planification";
import {DossierPage} from "../dossier/dossier";
import {ClientDetailPage} from "../client-detail/client-detail";
import {LangueService} from "../../services/LangueService";
import {Langue} from "../../models/Langue";
import {SQLite} from "@ionic-native/sqlite";
import {RealisationTest} from "../../models/RealisationTest";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-realisation',
  templateUrl: 'realisation.html',
  providers: [Variables]

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
  heure: number;
  clavier: boolean;
  pathimage = Variables.path;


  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private sqlite: SQLite) {
    this.tabLangue = navParams.get("tabLangue");
    this.codeClinique = navParams.get("codeClinique");
    this.pass = navParams.get("pass");
    this.langue = navParams.get("langue");
    this.dateFeuille = navParams.get("dateFeuille");
    this.heureActuelle = TabsPage.heureActuelle;
    /*
     this.user = "admin";
     this.dateFeuille = "18/05/2016";
     this.heureActuelle = "16";
     this.getAllPlanification("16002649", this.dateFeuille, "REA", this.heureActuelle);
     */
    this.heure = Number(this.heureActuelle);

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


  getAllPlanification(numDoss, dateFeuille, nature, heure) {
    this.clavier = true;
    this.keyboar = 0;
    this.inputrange = 0;
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
          var x, i, p, r;
          x = this.xml.getElementsByTagName("return");

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
            if (p.getdesignation() === 'OXYGENE' || p.getdesignation() === 'Insuline') {
              p.setpave('text');
            } else {
              //       p.setpave('number');
              p.setpave('text');
            }
            this.planification.push(p);
            r = new RealisationTest();
            r.setclavier("false");
            r.setdisabled("false");
            r.setvaleur("");
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
      '<heure_prise>' + this.heure + '</heure_prise>' +
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

  presentConfirm(designation, numTr, rang) {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to cancel this ' + designation,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
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
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:AnnulerRealisation>' +
      '<numTr>' + numTr + '</numTr>' +
      '<date>' + this.dateFeuille + '</date>' +
      '<heure>' + this.heure + '</heure>' +
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
          console.log(x);
          this.planificationvalue[rang].setdisabled('false');
          this.planificationvalue[rang].setvaleur('');
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


  keyboardShow(rang) {

    this.inputrange = rang;
    if (this.planificationvalue[rang].getdisabled() === 'false') {
      this.keyboar = this.planificationvalue[rang].getkeyboard();
    } else {
      this.keyboar = 0;
    }


  }

  luck() {
    this.clavier = true;
    var val ;
    if(this.langue==='arabe'){
      val= (<HTMLInputElement>document.getElementById(this.inputrange + "inputt")).value + "";
    }else {
      val= (<HTMLInputElement>document.getElementById(this.inputrange + "input")).value + "";
    }

    if (val.length > 0 && val!==" ") {
      this.planificationvalue[this.inputrange].setvaleur(val);
      this.CreatePlusieursRealisation(this.planification[this.inputrange].getnum(), this.planificationvalue[this.inputrange].getvaleur());
      this.planificationvalue[this.inputrange].setdisabled('true');
    }
    this.planificationvalue[this.inputrange].setclavier('false');
    this.inputrange = -1;
    this.keyboar = 0;
  }

  updateInput(value) {
    this.clavier = true;
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
              break;
            case "R":
              this.keyboar = 0;
              this.planificationvalue[this.inputrange].setvaleur(value);
              this.CreatePlusieursRealisation(this.planification[this.inputrange].getnum(), this.planificationvalue[this.inputrange].getvaleur());
              this.planificationvalue[this.inputrange].setdisabled('true');
              this.planificationvalue[this.inputrange].setclavier('false');
              this.clavier = false;
              this.inputrange = -1;
              break;
            case "//":
              this.keyboar = 0;
              this.planificationvalue[this.inputrange].setvaleur(value);
              this.CreatePlusieursRealisation(this.planification[this.inputrange].getnum(), this.planificationvalue[this.inputrange].getvaleur());
              this.planificationvalue[this.inputrange].setdisabled('true');
              this.planificationvalue[this.inputrange].setclavier('false');
              this.clavier = false;
              this.inputrange = -1;
              break;
            case "OK":
              this.keyboar = 0;
              this.CreatePlusieursRealisation(this.planification[this.inputrange].getnum(), this.planificationvalue[this.inputrange].getvaleur());
              this.planificationvalue[this.inputrange].setdisabled('true');
              this.planificationvalue[this.inputrange].setclavier('false');
              this.clavier = false;
              this.inputrange = -1;
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
          this.inputrange = -1;
          this.keyboar = 0;
          this.clavier = false;
          this.CreatePlusieursRealisation(this.planification[this.inputrange].getnum(), this.planificationvalue[this.inputrange].getvaleur());
          this.planificationvalue[this.inputrange].setdisabled('true');
          this.planificationvalue[this.inputrange].setclavier('false');
        }
      }
    }
  }

  addHeure() {
    this.heure++;
    if (this.heure === Number(this.heureActuelle) + 1) {
      this.plus = false;
    }
    if (this.heure > Number(this.heureActuelle) - 6) {
      this.moins = true;
    }
    this.update();
  }

  removeHeure() {
    this.heure--;
    if (this.heure === Number(this.heureActuelle) - 6) {
      this.moins = false;
    }
    if (this.heure < Number(this.heureActuelle) + 1) {
      this.plus = true;
    }
    this.update();
  }

  update() {
    this.planification.length = 0;
    this.planification = [];
    this.planificationvalue.length = 0;
    this.planificationvalue = [];
    this.getAllPlanification(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.heure);
  }
}
