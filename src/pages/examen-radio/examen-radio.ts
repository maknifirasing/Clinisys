import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {ExamenRadio} from "../../models/ExamenRadio";
import {Document} from "../../models/Document";
@Component({
  selector: 'page-examen-radio',
  templateUrl: 'examen-radio.html',
  providers: [Variables]
})
<<<<<<< HEAD
<<<<<<< HEAD
export class ExamenRadioPage{
=======
export class ExamenRadioPage {
>>>>>>> 7b0e36a43bd86a82dd9b92f7098ceefdb82ff7ef
=======
export class ExamenRadioPage {
>>>>>>> b38b774492a3df3058b3fa755fe8150945041014
  GetExamenRadioByNumDossResponseTest: boolean = false;
  examenRT: Array<ExamenRadio> = [];
  examenRF: Array<ExamenRadio> = [];
  document: Array<Document> = [];
  url: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
this.examenRF=this.navParams.data.examenRF;
this.examenRT=this.navParams.data.examenRT;
  }

  ionViewDidLoad() {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(this.numDoss);
    this.GetExamenRadioByNumDossResponse(this.numDoss);
=======
    this.GetExamenRadioByNumDossResponse(this.navParams.data.pass.getdossier());
>>>>>>> 7b0e36a43bd86a82dd9b92f7098ceefdb82ff7ef
=======
  //  this.GetExamenRadioByNumDossResponse(this.navParams.data.pass.getdossier());
>>>>>>> b38b774492a3df3058b3fa755fe8150945041014
  }

  getdocumentById(observ) {
    this.url = this.Url.url + "dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=" + observ;

  }




}
