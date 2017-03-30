import {Component} from '@angular/core';
import {NavController, NavParams, Platform, AlertController} from 'ionic-angular';
import {PdfViewerComponent} from 'ng2-pdf-viewer';
import {File, Transfer} from 'ionic-native';
import {Variables} from "../../providers/variables";

declare var cordova: any;

@Component({
  selector: 'page-pdf-view',
  templateUrl: 'pdf-view.html',
  providers: [PdfViewerComponent]
})
export class PdfViewPage {
  pdfSrc: string;
  page: number = 1;
  storageDirectory: string = '';
  connection: boolean;
  pdf: any;
  tabBarElement: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private PdfViewerComponent: PdfViewerComponent, public platform: Platform, public alertCtrl: AlertController) {
    this.pdf =  this.navParams.get("pdf");
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
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
      Variables.checconnection().then(connexion=> {
        if (connexion === false) {
          this.connection = false;
          var fields = this.pdf.split('/');
          this.pdfSrc = this.storageDirectory + fields[5];
        }
        else {
          this.connection = true;
          this.pdfSrc = this.pdf;
          this.retrieveImage(this.pdfSrc);
        }
      });
    });


  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  downloadImage(file) {

    this.platform.ready().then(() => {
      const fileTransfer = new Transfer();

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
    File.checkFile(this.storageDirectory, file)
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

}
