import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {ListPreanesthesie} from "../../models/ListPreanesthesie";
import {HistDossier} from "../../models/HistDossier";
import {HistDossierService} from "../../services/HistDossierService";

/*
 Generated class for the ListPreanesthesie page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-preanesthesie',
  templateUrl: 'list-preanesthesie.html',
  providers: [Variables]
})
export class ListPreanesthesiePage {
  ListPreanesthesieByNumeroDossierTest: boolean = false;
  ListeP: Array<ListPreanesthesie> = [];
  histD: Array<HistDossier> = [];
  histd = new HistDossier();
  histserv: any;
  connection: boolean;
  pass:any;
  codeClinique:any;
  langue: any;
  tabLangue: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {
    this.ListeP = navParams.get("ListeP");
    this.pass = navParams.get("pass");
    this.tabLangue = navParams.get("tabLangue");
    this.codeClinique = navParams.get("codeClinique");
    this.langue = navParams.get("langue");
    Variables.checconnection().then(connexion=> {
      if (connexion === false) {
        this.connection = false;
      } else {
        this.connection = true;
      }
    });
    this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique);

  }

  ionViewDidLoad() {

  }

  historiqueOff(hist, numDoss, codeClinique) {
    this.histserv = new HistDossierService();
    this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(res => {
      this.histd = res.getdate();
    });
  }
}
