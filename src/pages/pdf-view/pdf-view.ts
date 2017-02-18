import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

/*
  Generated class for the PdfView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pdf-view',
  templateUrl: 'pdf-view.html',
  providers:[PdfViewerComponent]
})
export class PdfViewPage {
  pdfSrc: string ;
  page: number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams,private PdfViewerComponent:PdfViewerComponent) {
    this.pdfSrc=this.navParams.get("pdf");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfViewPage');
  }

}
