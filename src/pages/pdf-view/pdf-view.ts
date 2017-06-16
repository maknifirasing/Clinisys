import {Component} from '@angular/core';
import {NavController, NavParams, Platform, AlertController, LoadingController} from 'ionic-angular';
import {PdfViewerComponent} from 'ng2-pdf-viewer';
import { File} from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import {Variables} from "../../providers/variables";
import {HistDossier} from "../../models/HistDossier";
import {HistPdfService} from "../../services/HistPdfService";
import {HistDoc} from "../../models/HistDoc";
import {SQLite} from "@ionic-native/sqlite";
import {TabsPage} from "../tabs/tabs";

declare var cordova: any;

@Component({
  selector: 'page-pdf-view',
  templateUrl: 'pdf-view.html',
  providers: [PdfViewerComponent,File,Transfer]
})

export class PdfViewPage {
  pdfSrc: string;
  page: number = 1;
  storageDirectory: string = '';
  connection: boolean;
  pdf: any;
  histC: Array<HistDoc> = [];
  histp = new HistDossier();
  histserv: any;
  tabBarElement: any;
  codeClinique: any;
  tabLangue: any;
  pass: any;
  langue: any;
  pathimage=Variables.path;
  device=Variables.device;
  zoom:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController
    ,private transfer: Transfer, private file: File,private sqlite: SQLite,public loadingCtrl: LoadingController) {
    this.codeClinique = TabsPage.tabLangue.codeClinique;
    this.tabLangue = TabsPage.tabLangue.tabLangue;
    this.pass = TabsPage.tabLangue.pass;
    this.langue = TabsPage.tabLangue.langue;
    this.pdf = this.navParams.get("pdf");
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.presentLoadingDefault();

    this.zoom=1;

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
      var fields = this.pdf.split('/');
      Variables.checconnection().then(connexion => {
        if (connexion === false) {
          this.connection = false;
          this.pdfSrc = this.storageDirectory + fields[5];
          this.historiqueOff(this.histC, this.pass.getdossier(), fields[5], this.codeClinique);
        }
        else {
          this.connection = true;
          this.pdfSrc = this.pdf;
          this.historique(this.pass.getdossier(), fields[5], this.codeClinique);
          this.retrieveImage(this.pdfSrc);
        }
      });
    });


  }
  zoomreset(){
    this.zoom=1;
}
  zoomplus(){
    this.zoom+=0.5;
  }
  zoommoin(){
    if(this.zoom>0.5){
      this.zoom-=0.5;
    }
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: this.tabLangue.titreLoading,
      spinner: 'bubbles'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  downloadImage(file) {

    this.platform.ready().then(() => {
      const fileTransfer: TransferObject = this.transfer.create();

      fileTransfer.download(this.pdf, this.storageDirectory + file).then((entry) => {
        /*
         const alertSuccess = this.alertCtrl.create({
         title: `Download Succeeded!`,
         subTitle: `${file} was successfully downloaded to: ${entry.toURL()}`,
         buttons: ['Ok']
         });

         alertSuccess.present();
         */
      }, (error) => {
        /*
         const alertFailure = this.alertCtrl.create({
         title: `Download Failed!`,
         subTitle: `${file} was not successfully downloaded. Error code: ${error.code}`,
         buttons: ['Ok']
         });

         alertFailure.present();
         */
      });

    });

  }

  retrieveImage(src) {

    const imageLocation = `${src}`;
    var fields = imageLocation.split('/');
    const file = fields[5];
    this.file.checkFile(this.storageDirectory, file)
      .then(() => {


        /*
         const alertSuccess = this.alertCtrl.create({
         title: `File retrieval Succeeded!`,
         subTitle: `${file} was successfully retrieved from: ${this.storageDirectory}`,
         buttons: ['Ok']
         });

         return alertSuccess.present();
         */
      })
      .catch((err) => {

        /*      const alertFailure = this.alertCtrl.create({
         title: `File retrieval Failed!`,
         subTitle: `${file} was not successfully retrieved. Error Code: ${err.code}`,
         buttons: ['Ok']
         });

         return alertFailure.present(); */
        this.downloadImage(file);
      });

  }

  historique(numDoss, file, codeClinique) {
    this.histserv = new HistPdfService(this.sqlite);
    var h = new HistDoc();
    var d = new Date();
    h.setnumDoss(numDoss);
    h.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    h.setcodeClinique(codeClinique);
    h.setnom(file);
    this.histC.push(h);
    try {
      this.histserv.deleteHistPdfs(numDoss, codeClinique, file);
      this.histserv.getHistPdfs(this.histC, numDoss, codeClinique, file).then(res => {
        this.histp = res.getdate();
      });
    }
    catch (Error) {
      this.histserv.getHistPdfs(this.histC, numDoss, codeClinique, file).then(res => {
        this.histp = res.getdate();
      });
    }

  }


  historiqueOff(hist, numDoss, file, codeClinique) {
    this.histserv = new HistPdfService(this.sqlite);
    this.histserv.getHistPdfs(hist, numDoss, codeClinique, file).then(res => {
      this.histp = res.getdate();
    });
  }
  goBack(){
    this.navCtrl.pop();
  }
}
