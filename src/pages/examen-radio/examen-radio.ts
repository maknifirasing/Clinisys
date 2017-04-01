import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, Platform} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {ExamenRadio} from "../../models/ExamenRadio";
import {Document} from "../../models/Document";
import {HistDossier} from "../../models/HistDossier";
import {HistDossierService} from "../../services/HistDossierService";
import {File, Transfer} from 'ionic-native';
import {
  ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject,
  ThemeableBrowserButton
} from '@ionic-native/themeable-browser';
import {DocumentService} from "../../services/DocumentService";
import {DocViewPage} from "../doc-view/doc-view";
import {ExamenRadioTService} from "../../services/ExamenRadioTService";
import {ExamenRadioFService} from "../../services/ExamenRadioFService";
import {ClientDetailPage} from "../client-detail/client-detail";
import {DossierPage} from "../dossier/dossier";
import {HistDoc} from "../../models/HistDoc";
import {HistDocService} from "../../services/HistDocService";

declare var cordova: any;
@Component({
  selector: 'page-examen-radio',
  templateUrl: 'examen-radio.html',
  providers: [Variables, ThemeableBrowser]
})

export class ExamenRadioPage {
  GetExamenRadioByNumDossResponseTest: boolean = false;
  examenRT: Array<ExamenRadio> = [];
  examenRF: Array<ExamenRadio> = [];
  document: Array<Document> = [];
  url: string;
  histD: Array<HistDossier> = [];
  histd = new HistDossier();
  histserv: any;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, public platform: Platform, private themeableBrowser: ThemeableBrowser, public alertCtrl: AlertController) {
    this.tabLangue = navParams.get("tabLangue");
    this.pass = navParams.get("pass");
    this.examenRF = navParams.get("examenRF");
    this.examenRT = navParams.get("examenRT");
    this.codeClinique = navParams.get("codeClinique");
    this.langue = navParams.get("langue");

    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;
        this.GetExamenRadioByNumDossResponseOff(this.pass.getdossier(), this.codeClinique)
      } else {
        this.connection = true;
      }
    });
    this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique);
  }

  ionViewDidLoad() {

  }

  getdocumentById(observ) {
    observ += ".html";
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
          this.historiqueDocOff(this.histDoc, this.pass.getdossier(), observ, this.codeClinique);
          this.docserv = new DocumentService();
          this.docserv.getDocuments(this.document, observ, this.codeClinique).then(res => {
            this.retrieveImageOff(res);
          });
        }
        else {
          this.connection = true;
          var d = new Document();
          d.seturl(this.storageDirectory + observ);
          d.setobserv(observ);
          d.setcodeClinique(this.codeClinique);
          this.document.push(d);
          this.historiqueDoc(this.pass.getdossier(), observ, this.codeClinique);
          this.docserv = new DocumentService();
          this.docserv.verifDocument(this.document, observ, this.codeClinique).then(res => {
            if (res === false) {
              this.docserv.getDocuments(this.document, observ, this.codeClinique);
            }
          });

          this.url = "http://192.168.0.5:8084/dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=" + observ;
          this.open(this.url);

          this.retrieveImage(this.url, d);
        }
      });
    });

  }

  historiqueOff(hist, numDoss, codeClinique) {
    this.histserv = new HistDossierService();
    this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(res => {
      this.histd = res.getdate();
    });
  }

  open(url) {
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
          wwwImage:'/android_asset/www/assets/img/green.png',
          align: 'left'
        }
      };
      const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
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
          wwwImage: '/android_asset/www/assets/img/red.png',
          align: 'left'
        }
      };
      const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
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
          wwwImage: '/android_asset/www/assets/img/green.png',
          align: 'left'
        }
      };

      const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
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
          wwwImage: '/android_asset/www/assets/img/red.png',
          align: 'left'
        }
      };
      const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    }
  }

  downloadImage(url, doc) {

    this.platform.ready().then(() => {
      const fileTransfer = new Transfer();

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
    File.checkFile(this.storageDirectory, file)
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
    File.checkFile(this.storageDirectory, file)
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
    this.RadiosTs = new ExamenRadioTService();
    this.examenRT = this.RadiosTs.getExamenRadios(this.examenRT, numDoss, codeClinique);

    this.RadiosFs = new ExamenRadioFService();
    this.examenRF = this.RadiosFs.getExamenRadios(this.examenRF, numDoss, codeClinique);
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

  historiqueDoc(numDoss, file, codeClinique) {
    this.histdocserv = new HistDocService();
    var hi = new HistDoc();
    var d = new Date();
    hi.setnumDoss(numDoss);
    hi.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    hi.setcodeClinique(codeClinique);
    hi.setnom(file);
    this.histDoc.push(hi);
    try {
      this.histdocserv.deleteHistDocs(numDoss, codeClinique, file);
      this.histdocserv.getHistDocs(this.histDoc, numDoss, codeClinique, file).then(result => {
        this.histdoc = result.getdate();
      });
    }
    catch (Error) {
      this.histdocserv.getHistDocs(this.histDoc, numDoss, codeClinique, file).then(result => {
        this.histdoc = result.getdate();
      });
    }

  }

  historiqueDocOff(hist, numDoss, file, codeClinique) {
    this.histdocserv = new HistDocService();
    this.histdocserv.getHistDocs(hist, numDoss, codeClinique, file).then(result => {
      this.histdoc = result.getdate();
    });
  }
}
