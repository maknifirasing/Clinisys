import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {ExamenRadio} from "../../models/ExamenRadio";
import {Document} from "../../models/Document";
import {HistDossier} from "../../models/HistDossier";
import {HistDossierService} from "../../services/HistDossierService";
@Component({
  selector: 'page-examen-radio',
  templateUrl: 'examen-radio.html',
  providers: [Variables]
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.examenRF = navParams.get("examenRF");
    this.examenRT = navParams.get("examenRT");
    this.tabLangue = navParams.get("tabLangue");
    this.pass = navParams.get("pass");
    this.codeClinique = navParams.get("codeClinique");
    this.langue = navParams.get("langue");
    if (Variables.checconnection() === "No network connection") {
      this.connection = false;
    } else {
      this.connection = true;
    }
    this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique);
  }

  ionViewDidLoad() {

  }

  getdocumentById(observ) {
    this.url = this.Url.url + "dmi-web/DemandeRadio?type=consult&function=getdocumentById&idDoc=" + observ;

  }

  historiqueOff(hist, numDoss, codeClinique) {
    this.histserv = new HistDossierService();
    this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(res => {
      this.histd = res.getdate();
    });
  }

}
