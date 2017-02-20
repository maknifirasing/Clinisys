import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

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
  }

}
