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

export class ExamenRadioPage{
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

  }

  getdocumentById(observ) {
    this.url = this.Url.url + "dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=" + observ;

  }




}
