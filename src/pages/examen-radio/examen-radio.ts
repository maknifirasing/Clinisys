import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, Platform} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {ExamenRadio} from "../../models/ExamenRadio";
import {Document} from "../../models/Document";
import {File} from '@ionic-native/file';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject} from '@ionic-native/themeable-browser';
import {DocumentService} from "../../services/DocumentService";
import {ExamenRadioTService} from "../../services/ExamenRadioTService";
import {ExamenRadioFService} from "../../services/ExamenRadioFService";
import {ClientDetailPage} from "../client-detail/client-detail";
import {DossierPage} from "../dossier/dossier";
import {HistDoc} from "../../models/HistDoc";
import {HistDocService} from "../../services/HistDocService";
import {SQLite} from "@ionic-native/sqlite";
import {TabsPage} from "../tabs/tabs";

declare var cordova: any;
@Component({
  selector: 'page-examen-radio',
  templateUrl: 'examen-radio.html',
  providers: [Variables, ThemeableBrowser, File, Transfer]
})

export class ExamenRadioPage {
  GetExamenRadioByNumDossResponseTest: boolean = false;
  examenRT: Array<ExamenRadio> = [];
  examenRF: Array<ExamenRadio> = [];
  document: Array<Document> = [];
  url: string;
  histd: any;
  connection: boolean;
  pass: any;
  codeClinique: any;
  langue: any;
  tabLangue: any;
  docserv: any;
  storageDirectory: string = '';
  RadiosTs: any;
  RadiosFs: any;
  private histDoc: Array<HistDoc> = [];
  private histdoc = new HistDoc();
  private histdocserv: any;
  pathimage = Variables.path;
  device = Variables.device;

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform, private themeableBrowser: ThemeableBrowser, public alertCtrl: AlertController
    , private transfer: Transfer, private file: File, private sqlite: SQLite) {
    this.codeClinique = TabsPage.tabLangue.codeClinique;
    this.tabLangue = TabsPage.tabLangue.tabLangue;
    this.pass = TabsPage.tabLangue.pass;
    this.langue = TabsPage.tabLangue.langue;
    this.examenRF = TabsPage.tabLangue.examenRF;
    this.examenRT = TabsPage.tabLangue.examenRT;


    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;
        this.GetExamenRadioByNumDossResponseOff(this.pass.getdossier(), this.codeClinique)
      } else {
        this.connection = true;
      }
    });
    this.histd = DossierPage.hist;
  }

  ionViewDidLoad() {

  }

  getdocumentById(observ) {
    observ += ".html";
    //     observ += "a2a01d9b-684b-478f-824e-5ae8a95bcc0b";
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if (!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if (this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
      Variables.checconnection().then(connexion => {
        if (connexion === false) {
          this.connection = false;

          this.histdocserv = new HistDocService(this.sqlite);
          this.histdocserv.getHistDocs(this.histDoc, this.pass.getdossier(), observ, this.codeClinique).then(result => {
            this.histdoc = result.getdate();
            this.docserv = new DocumentService(this.sqlite);
            this.docserv.getDocuments(this.document, observ, this.codeClinique).then(res => {
              this.retrieveImageOff(res);
            });
          });

        }
        else {
          this.connection = true;

          this.histdocserv = new HistDocService(this.sqlite);
          var hi = new HistDoc();
          var d = new Date();
          hi.setnumDoss(this.pass.getdossier());
          hi.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
          hi.setcodeClinique(this.codeClinique);
          hi.setnom(observ);
          this.histDoc.push(hi);

          var doc = new Document();
          doc.seturl(this.storageDirectory + observ);
          doc.setobserv(observ);
          doc.setcodeClinique(this.codeClinique);

          this.url = Variables.uRL + "dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=" + observ;
          var url = Variables.uRL; //    "http://37.59.230.40"

          this.document.push(doc);
          try {
            this.histdocserv.deleteHistDocs(this.pass.getdossier(), this.codeClinique, observ);
            this.histdocserv.getHistDocs(this.histDoc, this.pass.getdossier(), this.codeClinique, observ).then(result => {
              this.histdoc = result.getdate();

              this.docserv = new DocumentService(this.sqlite);
              this.docserv.verifDocument(this.document, observ, this.codeClinique).then(res => {
                if (res === false) {
                  this.docserv.getDocuments(this.document, observ, this.codeClinique);
                }
              });

              Variables.checservice(url).then(res => {
                if (res === true) {
                  this.open(this.url);
                  this.retrieveImage(this.url, doc);
                } else if (res === false) {
                  alert("document introuvable");
                }
              });
            });
          }
          catch (Error) {
            this.histdocserv.getHistDocs(this.histDoc, this.pass.getdossier(), this.codeClinique, observ).then(result => {
              this.histdoc = result.getdate();

              this.docserv = new DocumentService(this.sqlite);
              this.docserv.verifDocument(this.document, observ, this.codeClinique).then(res => {
                if (res === false) {
                  this.docserv.getDocuments(this.document, observ, this.codeClinique);
                }
              });

              Variables.checservice(url).then(res => {
                if (res === true) {
                  this.open(this.url);
                  this.retrieveImage(this.url, doc);
                } else {
                  alert("document introuvable");
                }
              });

            });
          }
        }
      });
    });

  }

  open(url) {
    var option;
    if (((this.langue === "francais") || (this.langue === "anglais")) && (this.connection)) {
      const options: ThemeableBrowserOptions = {
        statusbar: {
          color: '#0277bd',
        },
        toolbar: {
          height: 44,
          color: '#0277bd'
        },
        title: {
          color: '#FFFFFF',
          staticText: this.tabLangue.titreEnligne + " " + this.histdoc,
          showPageTitle: false
        },
        backButton: {
          image: 'arrow-back',
          imagePressed: 'back_pressed',
          align: 'left',
          event: 'backPressed'
        }
        , backButtonCanClose: true
      };
      option = options;
    }

    if (((this.langue === "francais") || (this.langue === "anglais")) && (!this.connection)) {
      const options: ThemeableBrowserOptions = {
        statusbar: {
          color: '#0277bd',
        },
        toolbar: {
          height: 44,
          color: '#0277bd'
        },
        title: {
          color: '#FFFFFF',
          staticText: this.tabLangue.titreHorsLigne + " " + this.histdoc,
          showPageTitle: false
        },
        backButton: {
          image: 'arrow-back',
          imagePressed: 'back_pressed',
          align: 'left',
          event: 'backPressed'
        }, backButtonCanClose: true
      };
      option = options;
    }

    if ((this.langue === "arabe") && (this.connection)) {
      const options: ThemeableBrowserOptions = {
        statusbar: {
          color: '#0277bd',
        },
        toolbar: {
          height: 44,
          color: '#0277bd'
        },
        title: {
          color: '#FFFFFF',
          staticText: this.histdoc + " " + this.tabLangue.titreEnligne,
          showPageTitle: false,
        },
        backButton: {
          image: 'arrow-back',
          imagePressed: 'back_pressed',
          align: 'right',
          event: 'backPressed'
        }, backButtonCanClose: true
      };
      option = options;
    }

    if ((this.langue === "arabe") && (!this.connection)) {
      const options: ThemeableBrowserOptions = {
        statusbar: {
          color: '#0277bd',
        },
        toolbar: {
          height: 44,
          color: '#0277bd'
        },
        title: {
          color: '#FFFFFF',
          staticText: this.histdoc + " " + this.tabLangue.titreHorsLigne,
          showPageTitle: false
        },

        backButton: {
          image: 'arrow-back',
          imagePressed: 'back_pressed',
          align: 'right',
          event: 'backPressed'
        }, backButtonCanClose: true
      };
      option = options;
    }

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', option);
  }

  downloadImage(url, doc) {

    this.platform.ready().then(() => {
      const fileTransfer: TransferObject = this.transfer.create();
      fileTransfer.download(url, this.storageDirectory + doc.getobserv()).then((entry) => {

        /*    const alertSuccess = this.alertCtrl.create({
         title: `Download Succeeded!`,
         subTitle: `${doc.getobserv()} was successfully downloaded to: ${entry.toURL()}`,
         buttons: ['Ok']
         });
         alertSuccess.present();
         */
      }, (error) => {
        /*
         const alertFailure = this.alertCtrl.create({
         title: `Download Failed!`,
         subTitle: `${doc.getobserv()} was not successfully downloaded. Error code: ${error.code}`,
         buttons: ['Ok']
         });
         alertFailure.present();
         */
      });

    });

  }

  retrieveImage(url, doc) {
    const file = doc.getobserv();
    this.file.checkFile(this.storageDirectory, file)
      .then(() => {

        /*    const alertSuccess = this.alertCtrl.create({
         title: `File retrieval Succeeded!`,
         subTitle: `${file} was successfully retrieved from: ${this.storageDirectory}`,
         buttons: ['Ok']
         });
         return alertSuccess.present();
         */
      })
      .catch((err) => {
        /*
         const alertFailure = this.alertCtrl.create({
         title: `File retrieval Failed!`,
         subTitle: `${file} was not successfully retrieved. Error Code: ${err.code}`,
         buttons: ['Ok']
         });
         return alertFailure.present();*/
        this.downloadImage(url, doc);
      });

  }

  retrieveImageOff(doc) {
    const file = doc.getobserv();
    this.file.checkFile(this.storageDirectory, file)
      .then(() => {
        this.url = doc.geturl();
        this.open(this.url);

        /*    const alertSuccess = this.alertCtrl.create({
         title: `File retrieval Succeeded!`,
         subTitle: `${file} was successfully retrieved from: ${this.storageDirectory}`,
         buttons: ['Ok']
         });
         return alertSuccess.present();
         */
      })
      .catch((err) => {
        /*
         const alertFailure = this.alertCtrl.create({
         title: `File retrieval Failed!`,
         subTitle: `${file} was not successfully retrieved. Error Code: ${err.code}`,
         buttons: ['Ok']
         });
         return alertFailure.present();*/
      });

  }


  GetExamenRadioByNumDossResponseOff(numDoss, codeClinique) {
    this.RadiosTs = new ExamenRadioTService(this.sqlite);
    this.examenRT = this.RadiosTs.getExamenRadios(this.examenRT, numDoss, codeClinique);

    this.RadiosFs = new ExamenRadioFService(this.sqlite);
    this.examenRF = this.RadiosFs.getExamenRadios(this.examenRF, numDoss, codeClinique);
  }

  goToInfPage() {
    this.navCtrl.push(ClientDetailPage);
  }

  goBack() {
    this.navCtrl.parent.viewCtrl.dismiss();
  }
}
