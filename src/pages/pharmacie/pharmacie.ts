import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Pharmacie} from "../../models/Pharmacie";
import {TraitementArticlePharmacie} from "../../models/TraitementArticlePharmacie";
import {Article} from "../../models/Article";
import {TraitementMedecinPharmacie} from "../../models/TraitementMedecinPharmacie";
import {CommandePharmacie} from "../../models/CommandePharmacie";
import {Client} from "../../models/Client";
import {TabsPage} from "../tabs/tabs";
import {Variables} from "../../providers/variables";
import {SQLite} from "@ionic-native/sqlite";
import {ClientDetailPage} from "../client-detail/client-detail";
import {DossierPage} from "../dossier/dossier";
import {LangueService} from "../../services/LangueService";
import {Langue} from "../../models/Langue";

/**
 * Generated class for the Pharmacie page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pharmacie',
  templateUrl: 'pharmacie.html',
})
export class PharmaciePage {
  connection: boolean;
  tabLangue: any;
  pass: any;
  codeClinique: any;
  langue: any;
  histd: any;
  xml: any;
  dateFeuille: any;
  listePharmacie: Array<Pharmacie> = [];
  articleListe: Array<TraitementArticlePharmacie> = [];
  articleComande: Array<Article> = [];
  medecinListe: Array<TraitementMedecinPharmacie> = [];
  commandeListe: Array<CommandePharmacie> = [];
  client = new Client();
  pharmacieSelected = new Pharmacie();
  medecinSelected = new TraitementMedecinPharmacie();
  menu_is_open: boolean;
  art: boolean;
  med: boolean;
  user: any;
  private langserv: any;
  langes: Array<Langue> = [];
  pathimage = Variables.path;
  device = Variables.device;
  artic: any;
  mede: any;
  artics: any;
  medes: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private sqlite: SQLite, private toastCtrl: ToastController) {
    this.codeClinique = TabsPage.tabLangue.codeClinique;
    this.tabLangue = TabsPage.tabLangue.tabLangue;
    this.pass = TabsPage.tabLangue.pass;
    this.dateFeuille = TabsPage.tabLangue.dateFeuille;
    this.langue = TabsPage.tabLangue.langue;
    this.client = TabsPage.tabLangue.client;
    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;

      } else {
        this.connection = true;
        this.langserv = new LangueService(this.sqlite);
        this.langserv.getLangues(this.langes).then(lg => {
          this.user = lg.getnom();
        });
        this.PharmacieDispo();
        this.ListeCommandePharmaciePrescrit(this.pass.getdossier(), this.dateFeuille);
        this.art = false;
        this.med = false;
      }
    });
    this.histd = DossierPage.hist;

    if (this.langue === 'arabe') {
      this.artic = "articlear";
      this.mede = "medecinar";
      this.artics = "articlesar";
      this.medes = "medecinsar";
    } else {
      this.artic = "article";
      this.mede = "medecin";
     this.artics = "articles";
      this.medes = "medecins";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pharmacie');
  }

  goToInfPage() {
    this.navCtrl.push(ClientDetailPage);
  }

  PharmacieDispo() {
    this.listePharmacie = [];
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

  togglePopupMenu(pharmacie) {
    if (pharmacie !== 'false') {
      if (this.articleComande.length > 0) {
        this.articleConfirm(pharmacie);
      } else {
        this.pharmacieSelected = pharmacie;
      }
    }
    return this.menu_is_open = !this.menu_is_open;
  }

  articleConfirm(pharmacie) {

    let alert = this.alertCtrl.create({
      title: this.tabLangue.titreconfirmation,
      message: this.tabLangue.titremessConf,
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
            this.articleComande = [];
            this.pharmacieSelected = pharmacie;
            (<HTMLInputElement>document.getElementById(this.mede)).value = "";
            this.med = false;
            this.art = false;

          }
        }
      ]
    });
    alert.present();
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
            article.setqtestk(Number(x[i].children[22].textContent));
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
            article.setqtestk(Number(x[i].children[16].textContent));
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
            article.setqtestk(Number(x[i].children[16].textContent));
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
    this.medecinListe = [];

    var shearch = (<HTMLInputElement>document.getElementById(this.artic)).value;
    if (shearch.length === 0) {
      this.articleListe = [];
      this.medecinListe = [];
    }

    if (this.pharmacieSelected.getCodeDep() === "EX") {
      this.getTraitementExterne(shearch);
    }
    else if (this.pharmacieSelected.getCodeDep() === "Stup") {
      this.getStupifiant(shearch, this.client.getetage());
    } else {
      this.getTraitementInterne(shearch, this.pharmacieSelected.getCodeDep(), true);
    }
  }

  exist(article, t): number {
    for (var i = 0; i < t.length; i++) {
      if (article.getcodart() === t[i].getarticle().getcodart()) {
        return i;
      }
    }
    return -1;
  }


  onInputArticle() {
    var val = (<HTMLInputElement>document.getElementById(this.artic)).value;
    var opts = (<HTMLInputElement>document.getElementById(this.artics)).childNodes;
    for (var i = 0; i < opts.length; i++) {
      if ((<HTMLInputElement>opts[i]).value === val) {
        for (var j = 0; j < this.articleListe.length; j++) {
          if (this.articleListe[j].getdesart() === val) {
            this.selectArticle(this.articleListe[j]);
            break;
          }
        }

        break;
      }
    }
  }


  selectArticle(x) {
    (<HTMLInputElement>document.getElementById(this.artic)).value = "";

    if (x.getqtestk() > 0) {
      if (this.exist(x, this.articleComande) < 0) {
        var article = new Article();
        article.setarticle(x);
        article.setqte(1);
        article.setrang(this.articleComande.length);
        this.articleComande.push(article);
        this.art = true;


        setTimeout(() => {
          document.getElementById(this.articleComande[this.articleComande.length - 1].getrang() + this.artic).focus();
        }, 10);
      } else {
        this.presentToast(this.tabLangue.titreProduitexiste);
      }
    } else {
      this.presentToast(this.tabLangue.titreStockindisponible);
    }

    this.articleListe = [];
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      //  cssClass:'toasterr'
    });

    toast.onDidDismiss(() => {
      //     console.log('Dismissed toast');
    });

    toast.present();
  }


  updateQteArticle(rang) {
    var qte = Number((<HTMLInputElement>document.getElementById(this.articleComande[rang].getrang() + this.artic)).value);
    if (qte > this.articleComande[rang].getarticle().getqtestk()) {
      this.presentToast(this.tabLangue.titreStockindisponible);
      (<HTMLInputElement>document.getElementById(this.articleComande[rang] + this.artic)).value = "1";
      this.articleComande[rang].setqte(1);
      setTimeout(() => {
        document.getElementById(this.articleComande[rang] + this.artic).focus();
      }, 10);

    } else {
      this.articleComande[rang].setqte(qte);
    }
  }


  filtreMedecin() {
    this.articleListe = [];
    this.medecinListe = [];
    var shearch = (<HTMLInputElement>document.getElementById(this.mede)).value;
    if (shearch.length === 0) {
      this.articleListe = [];
      this.medecinListe = [];
    }
    this.getListMedecinLikeNomMed(shearch);
  }


  onInputMedecin() {
    var val = (<HTMLInputElement>document.getElementById(this.mede)).value;
    var opts = (<HTMLInputElement>document.getElementById(this.medes)).childNodes;
    for (var i = 0; i < opts.length; i++) {
      if ((<HTMLInputElement>opts[i]).value === val) {
        for (var j = 0; j < this.medecinListe.length; j++) {
          if (this.medecinListe[j].getnomMed() === val) {
            this.selectMedecin(this.medecinListe[j]);
            break;
          }
        }

        break;
      }
    }
  }

  selectMedecin(x) {
    (<HTMLInputElement>document.getElementById(this.mede)).value = "";
    (<HTMLInputElement>document.getElementById(this.mede)).value = x.getnomMed();
    this.medecinSelected = x;
    this.medecinListe = [];
    this.med = true;
  }

  addComande() {
    switch (this.pharmacieSelected.getCodePhar()) {
      case "C":// PharmacieCentrale
        if (this.pharmacieSelected.getisNuit() === false) {
          for (var i = 0; i < this.articleComande.length; i++) {
            this.ajoutCommandePharmacieCentrale(this.client.getnumdoss(), this.articleComande[i], this.pharmacieSelected.getCodeDep(), this.user,
              this.dateFeuille, this.medecinSelected.getcodMed());
          }
        } else {
          for (var i = 0; i < this.articleComande.length; i++) {
            this.ajoutCommandePharmacieNuit(this.client.getnumdoss(), this.articleComande[i], this.pharmacieSelected.getCodeDep(), this.user,
              this.dateFeuille, this.medecinSelected.getcodMed());
          }
        }
        break;
      case "PEX":// Pharmacie Externe
        for (var i = 0; i < this.articleComande.length; i++) {
          this.ajoutCommandePharmacieExterne(this.client.getnumdoss(), this.articleComande[i], this.pharmacieSelected.getCodeDep(), this.user,
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
          this.ajoutCommandePharmacieReserve(this.client.getnumdoss(), this.articleComande[i], this.pharmacieSelected.getCodeDep(), this.user,
            this.dateFeuille, this.medecinSelected.getcodMed());
        }
        break;
      case "APE":// Autre Pharmacie Etage
        for (var i = 0; i < this.articleComande.length; i++) {
          this.ajoutCommandePharmacieReserve(this.client.getnumdoss(), this.articleComande[i], this.pharmacieSelected.getCodeDep(), this.user,
            this.dateFeuille, this.medecinSelected.getcodMed());
        }
        break;
    }

  }


  ajoutCommandePharmacieCentrale(numdoss, article, etage, user, dateFeuille, codMed) {
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
      '<etage>' + etage + '</etage>' +
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
          var x;
          x = this.xml.getElementsByTagName("return");
          this.presentToast(x[0].textContent);
          this.commandeListe = [];
          this.articleComande = [];
          (<HTMLInputElement>document.getElementById(this.artic)).value = "";
          (<HTMLInputElement>document.getElementById(this.mede)).value = "";

          this.art = false;
          this.med = false;
          this.ListeCommandePharmaciePrescrit(numdoss, dateFeuille);
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
      '<etage>' + etage + '</etage>' +
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
          var x;
          x = this.xml.getElementsByTagName("return");
          this.presentToast(x[0].textContent);
          this.commandeListe = [];
          this.articleComande = [];
          (<HTMLInputElement>document.getElementById(this.artic)).value = "";
          (<HTMLInputElement>document.getElementById(this.mede)).value = "";
          this.art = false;
          this.med = false;
          this.ListeCommandePharmaciePrescrit(numdoss, dateFeuille);
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  ajoutCommandePharmacieExterne(numdoss, article, etage, user, dateFeuille, codMed, isNuit) {
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
      '<etage>' + etage + '</etage>' +
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
          var x;
          x = this.xml.getElementsByTagName("return");
          this.presentToast(x[0].textContent);
          this.commandeListe = [];
          this.articleComande = [];
          (<HTMLInputElement>document.getElementById(this.artic)).value = "";
          (<HTMLInputElement>document.getElementById(this.mede)).value = "";
          this.art = false;
          this.med = false;
          this.ListeCommandePharmaciePrescrit(numdoss, dateFeuille);
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
      '<etage>' + etage + '</etage>' +
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
          var x;
          x = this.xml.getElementsByTagName("return");
          this.presentToast(x[0].textContent);
          this.commandeListe = [];
          this.articleComande = [];
          (<HTMLInputElement>document.getElementById(this.artic)).value = "";
          (<HTMLInputElement>document.getElementById(this.mede)).value = "";
          this.art = false;
          this.med = false;
          this.ListeCommandePharmaciePrescrit(numdoss, dateFeuille);
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
      '<etage>' + etage + '</etage>' +
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
          var x;
          x = this.xml.getElementsByTagName("return");
          this.presentToast(x[0].textContent);
          this.commandeListe = [];
          this.articleComande = [];
          (<HTMLInputElement>document.getElementById(this.artic)).value = "";
          (<HTMLInputElement>document.getElementById(this.mede)).value = "";
          this.art = false;
          this.med = false;
          this.ListeCommandePharmaciePrescrit(numdoss, dateFeuille);
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  ListeCommandePharmaciePrescrit(numdoss, dateFeuille) {
    this.commandeListe = [];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:ListeCommandePharmaciePrescrit>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '<datefeuille>' + dateFeuille + '</datefeuille>' +
      '</ser:ListeCommandePharmaciePrescrit>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.xml = xmlhttp.responseXML;
          var x, i, commande, d, day, month, year;
          x = this.xml.getElementsByTagName("return");
          for (i = 0; i < x.length; i++) {
            commande = new CommandePharmacie();
            d = new Date(x[i].children[2].textContent);
            day = d.getDate();
            month = d.getMonth() + 1;
            year = d.getFullYear();
            commande.setdateCommande(day + "/" + month + "/" + year);
            commande.setdesart(x[i].children[3].textContent);
            commande.setnomMed(x[i].children[5].textContent);
            commande.setnumbon(x[i].children[7].textContent);
            commande.setqte(Number(x[i].children[9].textContent));
            this.commandeListe.push(commande);
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }


  navShow: any;
  navShowar: any;


  showMenu(pharmacie) {
    if (pharmacie !== 'false') {
      if (this.articleComande.length > 0) {
        this.articleConfirm(pharmacie);
      } else {
        this.pharmacieSelected = pharmacie;
      }
    }
    this.navShow = "navShow";
    this.navShowar = "navShowar";
  }

  hideMenu() {
    this.navShow = "";
  }

  goBack() {
    this.navCtrl.parent.viewCtrl.dismiss();
  }
}
