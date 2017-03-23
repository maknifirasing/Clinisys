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

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, public platform: Platform, private themeableBrowser: ThemeableBrowser, public alertCtrl: AlertController) {
    this.examenRF = navParams.get("examenRF");
    this.examenRT = navParams.get("examenRT");
    this.tabLangue = navParams.get("tabLangue");
    this.pass = navParams.get("pass");
    this.codeClinique = navParams.get("codeClinique");
    this.langue = navParams.get("langue");
    this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique);
    if (Variables.checconnection() === "No network connection") {
      this.connection = false;
    } else {
      this.connection = true;
    }

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
      if (this.connection === false) {

        this.docserv = new DocumentService();
        this.docserv.getDocuments(this.document, observ, this.codeClinique).then(res => {
          this.retrieveImageOff(res);
        });
      }
      else {
        var d = new Document();
        d.seturl(this.storageDirectory + observ);
        d.setobserv(observ);
        d.setcodeClinique(this.codeClinique);
        this.document.push(d);
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

  }

  historiqueOff(hist, numDoss, codeClinique) {
    this.histserv = new HistDossierService();
    this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(res => {
      this.histd = res.getdate();
    });
  }

  open(url) {
    const options: ThemeableBrowserOptions = {
      statusbar: {
        color: '#ffffffff'
      },
      toolbar: {
        height: 44,
        color: '#f0f0f0ff'
      },
      title: {
        color: '#003264ff',
        staticText: "Doc",
        showPageTitle: false
      },
      backButton: {
        image: 'back',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        image: 'forward',
        imagePressed: 'forward_pressed',
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        image: 'close',
        imagePressed: 'close_pressed',
        align: 'left',
        event: 'closePressed'
      },
      customButtons: [
        {
          image: 'share',
          imagePressed: 'share_pressed',
          align: 'right',
          event: 'sharePressed'
        }
      ],

      backButtonCanClose: true
    };
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
  }

  downloadImage(url, doc) {

    this.platform.ready().then(() => {
      const fileTransfer = new Transfer();

      fileTransfer.download(url, this.storageDirectory + doc.getobserv()).then((entry) => {

        const alertSuccess = this.alertCtrl.create({
          title: `Download Succeeded!`,
          subTitle: `${doc.getobserv()} was successfully downloaded to: ${entry.toURL()}`,
          buttons: ['Ok']
        });

        alertSuccess.present();
      }, (error) => {

        const alertFailure = this.alertCtrl.create({
          title: `Download Failed!`,
          subTitle: `${doc.getobserv()} was not successfully downloaded. Error code: ${error.code}`,
          buttons: ['Ok']
        });

        alertFailure.present();

      });

    });

  }

  retrieveImage(url, doc) {
    const file = doc.getobserv();
    File.checkFile(this.storageDirectory, file)
      .then(() => {

        const alertSuccess = this.alertCtrl.create({
          title: `File retrieval Succeeded!`,
          subTitle: `${file} was successfully retrieved from: ${this.storageDirectory}`,
          buttons: ['Ok']
        });

        return alertSuccess.present();

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

        const alertSuccess = this.alertCtrl.create({
          title: `File retrieval Succeeded!`,
          subTitle: `${file} was successfully retrieved from: ${this.storageDirectory}`,
          buttons: ['Ok']
        });

        return alertSuccess.present();

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
}
