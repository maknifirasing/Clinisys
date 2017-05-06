import {Component} from '@angular/core';
import {AlertController, FabContainer, NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {RealisationTest} from "../../models/RealisationTest";
import {Langue} from "../../models/Langue";
import {Planification} from "../../models/Planification";
import {ClientDetailPage} from "../client-detail/client-detail";
import {TabsPage} from "../tabs/tabs";
import {SQLite} from "@ionic-native/sqlite";
import {LangueService} from "../../services/LangueService";
import {DossierPage} from "../dossier/dossier";
import {Client} from "../../models/Client";
import {Pharmacie} from "../../models/Pharmacie";
import {TraitementArticlePharmacie} from "../../models/TraitementArticlePharmacie";
import {TraitementMedecinPharmacie} from "../../models/TraitementMedecinPharmacie";
import {Article} from "../../models/Article";

/**
 * Generated class for the Menu page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  pet: string = "realisation";

  // ************** Realisation **************

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

  // ************* Fin Realisation ***************

  // *********** Pharmacie ***********************

  listePharmacie: Array<Pharmacie> = [];
  articleListe: Array<TraitementArticlePharmacie> = [];
  articleComande: Array<Article> = [];
  medecinListe: Array<TraitementMedecinPharmacie> = [];
  client = new Client();
  pharmacieSelected = new Pharmacie();
  medecinSelected = new TraitementMedecinPharmacie();

  // *********** Fin Pharmacie ***********************

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private sqlite: SQLite) {
    this.codeClinique = TabsPage.tabLangue.codeClinique;
    this.tabLangue = TabsPage.tabLangue.tabLangue;
    this.pass = TabsPage.tabLangue.pass;
    this.dateFeuille = TabsPage.tabLangue.dateFeuille;
    this.langue = TabsPage.tabLangue.langue;

    // ************* Realisation ***************

    this.heureActuelle = new Date(TabsPage.heureActuelle);
    this.p = Number(this.heureActuelle.getHours() + 1);
    this.m = Number(this.heureActuelle.getHours() - 6);
    this.heure = new Date(TabsPage.heureActuelle);

    // ************* Fin Realisation ***************
    this.client = TabsPage.tabLangue.client;
    // *********** Fin Pharmacie ***********************
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

  //   ***********************  Realisation *************************

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
            console.log('Cancel clicked');
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


  //   *********************** fin Realisation *************************


  //   ******************* Pharmacie  ************************

  luckFooter() {
    this.clavier = false;
    this.PharmacieDispo();
  }

  PharmacieDispo() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:PharmacieDispo>' +
      '<etage>' + this.client.getetage() + '</etage>' +
      '</ser:PharmacieDispo>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, j, pharmacie;
          x = this.xml.getElementsByTagName("return");
          j = 0;
          for (i = 0; i < x.length; i++) {
            if (j === 0) {
              pharmacie = new Pharmacie();
              pharmacie.setCodeDep(x[i].textContent);
            }
            if (j === 1) {
              pharmacie.setLibelle(x[i].textContent);
            }
            if (j === 2) {
              pharmacie.setCodePhar(x[i].textContent);
              pharmacie.setCoDep(pharmacie.getCodeDep());
              if (pharmacie.getCodeDep() === "99") {
                pharmacie.setisNuit(false);
              }
              else {
                pharmacie.setisNuit(true);
              }
              this.listePharmacie.push(pharmacie);
              j = 0;
            }
            j++;
          }

          pharmacie = new Pharmacie();
          pharmacie.setCodeDep("EX");
          pharmacie.setLibelle("Externe");
          pharmacie.setCoDep("EX");
          pharmacie.setCodePhar("PEX");
          pharmacie.setisNuit(true);
          this.listePharmacie.push(pharmacie);

          pharmacie = new Pharmacie();
          pharmacie.setCodeDep("Stup");
          pharmacie.setLibelle("Stupéfiant");
          pharmacie.setCoDep("Stup");
          pharmacie.setCodePhar("PS");
          pharmacie.setisNuit(true);
          this.listePharmacie.push(pharmacie);

          pharmacie = new Pharmacie();
          pharmacie.setCodeDep(this.client.getetage());
          pharmacie.setLibelle(this.client.getlibelle());
          pharmacie.setCoDep(this.client.getetage());
          pharmacie.setCodePhar("PET");
          pharmacie.setisNuit(true);
          this.listePharmacie.push(pharmacie);

          this.AutrePharmacieEtage();
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  AutrePharmacieEtage() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:AutrePharmacieEtage/>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, pharmacie;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {

            pharmacie = new Pharmacie();

            pharmacie.setCodeDep(x[i].children[0].textContent);
            pharmacie.setLibelle(x[i].children[1].textContent);
            pharmacie.setCodePhar(x[i].children[0].textContent);
            pharmacie.setCoDep(x[i].children[2].textContent);
            pharmacie.setisNuit(true);
            this.listePharmacie.push(pharmacie);
          }
          this.pharmacieSelected = this.listePharmacie[0];
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  changeFiltre(pharmacie, fab: FabContainer) {
    this.pharmacieSelected = pharmacie;
    fab.close();
  }


  getTraitementExterne(shearch) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetTraitementExterne>' +
      '<arg0>' + shearch + '</arg0>' +
      '</ser:GetTraitementExterne>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, article;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            article = new TraitementArticlePharmacie();
            article.setactif(x[i].children[0].textContent);
            article.setcodart(x[i].children[2].textContent);
            article.setdesart(x[i].children[6].textContent);
            article.setqtestk(x[i].children[22].textContent);
            this.articleListe.push(article);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }


  getStupifiant(shearch, etage) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetStupifiant>' +
      '<arg0>' + shearch + '</arg0>' +
      '<arg1>' + etage + '</arg1>' +
      '</ser:GetStupifiant>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, article;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            article = new TraitementArticlePharmacie();
            article.setactif(true);
            article.setcodart(x[i].children[0].textContent);
            article.setdesart(x[i].children[4].textContent);
            article.setqtestk(x[i].children[16].textContent);
            this.articleListe.push(article);
          }

        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  getTraitementInterne(shearch, CodeDep, isEtage) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetTraitementInterne>' +
      '<arg0>' + shearch + '</arg0>' +
      '<arg1>' + CodeDep + '</arg1>' +
      '<arg2>' + isEtage + '</arg2>' +
      '</ser:GetTraitementInterne>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, article;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            article = new TraitementArticlePharmacie();
            article.setactif('true');
            article.setcodart(x[i].children[0].textContent);
            article.setdesart(x[i].children[4].textContent);
            article.setqtestk(x[i].children[16].textContent);
            this.articleListe.push(article);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }


  getListMedecinLikeNomMed(shearch) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:getListMedecinLikeNomMed>' +
      '<param>' + shearch + '</param>' +
      '</ser:getListMedecinLikeNomMed>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, medecin;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            medecin = new TraitementMedecinPharmacie();
            medecin.setactif(x[i].children[0].textContent);
            medecin.setcodMed(x[i].children[3].textContent);
            medecin.setnomMed(x[i].children[4].textContent);
            this.medecinListe.push(medecin);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }


  filtreArticle() {
    this.articleListe = [];
    var shearch = (<HTMLInputElement>document.getElementById("article")).value;

    if (this.pharmacieSelected.getCodeDep() === "EX") {
      this.getTraitementExterne(shearch);
    }
    else if (this.pharmacieSelected.getCodeDep() === "Stup") {
      this.getStupifiant(shearch, '01');//this.client.getetage());
    } else {
      this.getTraitementInterne(shearch, this.pharmacieSelected.getCodeDep(), true);
    }
  }


  selectArticle(x) {
    (<HTMLInputElement>document.getElementById("article")).value = "";
    var article = new Article();
    article.setarticle(x);
    article.setqte(1);
    article.setrang(this.articleComande.length);
    this.articleComande.push(article);
    setTimeout(() => {
      document.getElementById(this.articleComande[this.articleComande.length - 1].getrang() + "article").focus();
    }, 10);
    this.articleListe = [];
  }

  updateQteArticle(x) {
    this.articleComande[x].setqte(Number((<HTMLInputElement>document.getElementById(this.articleComande[x].getrang() + "article")).value));
  }


  filtreMedecin() {
    this.medecinListe = [];
    var shearch = (<HTMLInputElement>document.getElementById("medecin")).value;
    this.getListMedecinLikeNomMed(shearch);
  }

  selectMedecin(x) {
    (<HTMLInputElement>document.getElementById("medecin")).value = "";
    (<HTMLInputElement>document.getElementById("medecin")).value = x.getnomMed();
    this.medecinSelected = x;
    this.medecinListe = [];
  }

  addComande() {
    switch (this.pharmacieSelected.getCodePhar()) {
      case "PC":// PharmacieCentrale
        if (this.pharmacieSelected.getisNuit() === false) {
          for (var i = 0; i < this.articleComande.length; i++) {
            this.ajoutCommandePharmacieCentrale(this.client.getnumdoss(), this.articleComande[i],this.client.getetage() ,this.user,
              this.dateFeuille, this.medecinSelected.getcodMed());
          }
        } else {
          for (var i = 0; i < this.articleComande.length; i++) {
            this.ajoutCommandePharmacieNuit(this.client.getnumdoss(), this.articleComande[i],this.client.getetage(), this.user,
              this.dateFeuille, this.medecinSelected.getcodMed());
          }
        }
        break;
      case "PEX":// Pharmacie Externe
        for (var i = 0; i < this.articleComande.length; i++) {
          this.ajoutCommandePharmacieExterne(this.client.getnumdoss(), this.articleComande[i], this.client.getetage(), this.user,
            this.dateFeuille, this.medecinSelected.getcodMed(), this.pharmacieSelected.getisNuit());
        }
        break;
      case "PS":// Pharmacie Stupéfiant
        for (var i = 0; i < this.articleComande.length; i++) {
          this.ajoutCommandePharmacieStupefiant(this.client.getnumdoss(), this.articleComande[i], this.client.getetage(), this.user,
            this.dateFeuille, this.medecinSelected.getcodMed());
        }
        break;
      case "PET":// Pharmacie Etage
        for (var i = 0; i < this.articleComande.length; i++) {
          this.ajoutCommandePharmacieReserve(this.client.getnumdoss(), this.articleComande[i], this.client.getetage(), this.user,
            this.dateFeuille, this.medecinSelected.getcodMed());
        }
        break;
      case "APE":// Autre Pharmacie Etage
        for (var i = 0; i < this.articleComande.length; i++) {
          this.ajoutCommandePharmacieReserve(this.client.getnumdoss(), this.articleComande[i], this.client.getetage(), this.user,
            this.dateFeuille, this.medecinSelected.getcodMed());
        }
        break;
    }

  }


  ajoutCommandePharmacieCentrale(numdoss, article, etage,user, dateFeuille, codMed) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:ajoutCommandePharmacieCentrale>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '<mvtst>' +
      '<cod>' + article.getarticle().getcodart() + '</cod>' +
      '<codeTva></codeTva>' +
      '<datPer></datPer>' +
      '<fodec></fodec>' +
      '<homologue></homologue>' +
      '<identifiant></identifiant>' +
      '<libelle>' + article.getarticle().getdesart() + '</libelle>' +
      '<lot></lot>' +
      '<marge></marge>' +
      '<nbrePce></nbrePce>' +
      '<numBonDepot></numBonDepot>' +
      '<numTr></numTr>' +
      '<prixAcht></prixAcht>' +
      '<prixUni></prixUni>' +
      '<qte>' + article.getqte() + '</qte>' +
      '<qteAnesth></qteAnesth>' +
      '<qtePans></qtePans>' +
      '<referenceDepot></referenceDepot>' +
      '</mvtst>' +
      '<etage>'+etage+'</etage>' +
      '<user>' + user + '</user>' +
      '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
      '<codMed>' + codMed + '</codMed>' +
      '</ser:ajoutCommandePharmacieCentrale>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, medecin;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            medecin = new TraitementMedecinPharmacie();
            medecin.setactif(x[i].children[0].textContent);
            medecin.setcodMed(x[i].children[3].textContent);
            medecin.setnomMed(x[i].children[4].textContent);
            this.medecinListe.push(medecin);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  ajoutCommandePharmacieNuit(numdoss, article, etage, user, dateFeuille, codMed) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:ajoutCommandePharmacieNuit>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '<mvtst>' +
      '<cod>' + article.getarticle().getcodart() + '</cod>' +
      '<codeTva></codeTva>' +
      '<datPer></datPer>' +
      '<fodec></fodec>' +
      '<homologue></homologue>' +
      '<identifiant></identifiant>' +
      '<libelle>' + article.getarticle().getdesart() + '</libelle>' +
      '<lot></lot>' +
      '<marge></marge>' +
      '<nbrePce></nbrePce>' +
      '<numBonDepot></numBonDepot>' +
      '<numTr></numTr>' +
      '<prixAcht></prixAcht>' +
      '<prixUni></prixUni>' +
      '<qte>' + article.getqte() + '</qte>' +
      '<qteAnesth></qteAnesth>' +
      '<qtePans></qtePans>' +
      '<referenceDepot></referenceDepot>' +
      '</mvtst>' +
      '<etage>'+etage+'</etage>' +
      '<user>' + user + '</user>' +
      '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
      '<codMed>' + codMed + '</codMed>' +
      '</ser:ajoutCommandePharmacieNuit>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, medecin;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            medecin = new TraitementMedecinPharmacie();
            medecin.setactif(x[i].children[0].textContent);
            medecin.setcodMed(x[i].children[3].textContent);
            medecin.setnomMed(x[i].children[4].textContent);
            this.medecinListe.push(medecin);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  ajoutCommandePharmacieExterne(numdoss, article, etage, user, dateFeuille, codMed,isNuit) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:ajoutCommandePharmacieExterne>' +
      '<c>' + numdoss + '</c>' +
      '<mvtst>' +
      '<cod>' + article.getarticle().getcodart() + '</cod>' +
      '<codeTva></codeTva>' +
      '<datPer></datPer>' +
      '<fodec></fodec>' +
      '<homologue></homologue>' +
      '<identifiant></identifiant>' +
      '<libelle>' + article.getarticle().getdesart() + '</libelle>' +
      '<lot></lot>' +
      '<marge></marge>' +
      '<nbrePce></nbrePce>' +
      '<numBonDepot></numBonDepot>' +
      '<numTr></numTr>' +
      '<prixAcht></prixAcht>' +
      '<prixUni></prixUni>' +
      '<qte>' + article.getqte() + '</qte>' +
      '<qteAnesth></qteAnesth>' +
      '<qtePans></qtePans>' +
      '<referenceDepot></referenceDepot>' +
      '</mvtst>' +
      '<etage>'+etage+'</etage>' +
      '<user>' + user + '</user>' +
      '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
      '<codMed>' + codMed + '</codMed>' +
      '<nuit>' + isNuit + '</nuit>' +
      '</ser:ajoutCommandePharmacieExterne>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, medecin;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            medecin = new TraitementMedecinPharmacie();
            medecin.setactif(x[i].children[0].textContent);
            medecin.setcodMed(x[i].children[3].textContent);
            medecin.setnomMed(x[i].children[4].textContent);
            this.medecinListe.push(medecin);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  ajoutCommandePharmacieStupefiant(numdoss, article, etage, user, dateFeuille, codMed) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:ajoutCommandePharmacieStupefiant>' +
      '<c>' + numdoss + '</c>' +
      '<mvtst>' +
      '<cod>' + article.getarticle().getcodart() + '</cod>' +
      '<codeTva></codeTva>' +
      '<datPer></datPer>' +
      '<fodec></fodec>' +
      '<homologue></homologue>' +
      '<identifiant></identifiant>' +
      '<libelle>' + article.getarticle().getdesart() + '</libelle>' +
      '<lot></lot>' +
      '<marge></marge>' +
      '<nbrePce></nbrePce>' +
      '<numBonDepot></numBonDepot>' +
      '<numTr></numTr>' +
      '<prixAcht></prixAcht>' +
      '<prixUni></prixUni>' +
      '<qte>' + article.getqte() + '</qte>' +
      '<qteAnesth></qteAnesth>' +
      '<qtePans></qtePans>' +
      '<referenceDepot></referenceDepot>' +
      '</mvtst>' +
      '<etage>'+etage+'</etage>' +
      '<user>' + user + '</user>' +
      '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
      '<codMed>' + codMed + '</codMed>' +
      '</ser:ajoutCommandePharmacieStupefiant>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, medecin;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            medecin = new TraitementMedecinPharmacie();
            medecin.setactif(x[i].children[0].textContent);
            medecin.setcodMed(x[i].children[3].textContent);
            medecin.setnomMed(x[i].children[4].textContent);
            this.medecinListe.push(medecin);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  ajoutCommandePharmacieReserve(numdoss, article, etage, user, dateFeuille, codMed) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:ajoutCommandePharmacieReserve>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '<mvtst>' +
      '<cod>' + article.getarticle().getcodart() + '</cod>' +
      '<codeTva></codeTva>' +
      '<datPer></datPer>' +
      '<fodec></fodec>' +
      '<homologue></homologue>' +
      '<identifiant></identifiant>' +
      '<libelle>' + article.getarticle().getdesart() + '</libelle>' +
      '<lot></lot>' +
      '<marge></marge>' +
      '<nbrePce></nbrePce>' +
      '<numBonDepot></numBonDepot>' +
      '<numTr></numTr>' +
      '<prixAcht></prixAcht>' +
      '<prixUni></prixUni>' +
      '<qte>' + article.getqte() + '</qte>' +
      '<qteAnesth></qteAnesth>' +
      '<qtePans></qtePans>' +
      '<referenceDepot></referenceDepot>' +
      '</mvtst>' +
      '<etage>'+etage+'</etage>' +
      '<user>' + user + '</user>' +
      '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
      '<codMed>' + codMed + '</codMed>' +
      '</ser:ajoutCommandePharmacieReserve>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, medecin;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            medecin = new TraitementMedecinPharmacie();
            medecin.setactif(x[i].children[0].textContent);
            medecin.setcodMed(x[i].children[3].textContent);
            medecin.setnomMed(x[i].children[4].textContent);
            this.medecinListe.push(medecin);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
}
