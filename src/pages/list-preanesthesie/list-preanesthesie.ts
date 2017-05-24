import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {ListPreanesthesie} from "../../models/ListPreanesthesie";
import {ListPreanesthesieService} from "../../services/ListPreanesthesieService";
import {ClientDetailPage} from "../client-detail/client-detail";
import {DossierPage} from "../dossier/dossier";
import {SQLite} from "@ionic-native/sqlite";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-list-preanesthesie',
  templateUrl: 'list-preanesthesie.html',
  providers: [Variables]
})
export class ListPreanesthesiePage {
  ListPreanesthesieByNumeroDossierTest: boolean = false;
  ListeP: Array<ListPreanesthesie> = [];
  histd :any;
  connection: boolean;
  pass: any;
  codeClinique: any;
  langue: any;
  tabLangue: any;
  ListePserv: any;
  pathimage=Variables.path;
  device=Variables.device;

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,private sqlite: SQLite) {
    this.codeClinique = TabsPage.tabLangue.codeClinique;
    this.tabLangue = TabsPage.tabLangue.tabLangue;
    this.pass = TabsPage.tabLangue.pass;
    this.langue = TabsPage.tabLangue.langue;
    this.ListeP = TabsPage.tabLangue.ListeP;
      Variables.checconnection().then(connexion => {
        if (connexion === false) {
          this.connection = false;
          this.findListPreanesthesieByNumeroDossierResponseOff(this.pass.getdossier(), this.codeClinique);
        } else {
          this.connection = true;
        }
      });
    this.histd = DossierPage.hist;

  }

  ionViewDidLoad() {

  }

  findListPreanesthesieByNumeroDossierResponseOff(numDoss, codeClinique) {
    this.ListePserv = new ListPreanesthesieService(this.sqlite);
    this.ListeP = this.ListePserv.getListPreanesthesies(this.ListeP, numDoss, codeClinique);
  }

  goToInfPage() {
    this.navCtrl.push(ClientDetailPage);
  }
  goBack(){
    this.navCtrl.parent.viewCtrl.dismiss();
  }
}
