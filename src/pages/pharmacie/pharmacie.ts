import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {ClientDetailPage} from "../client-detail/client-detail";
import {Variables} from "../../providers/variables";
import {DossierPage} from "../dossier/dossier";

@Component({
  selector: 'page-pharmacie',
  templateUrl: 'pharmacie.html',
})
export class PharmaciePage {
  connection: boolean;
  tabLangue: any;
  pass: any;
  codeClinique: any;
  langue: any;
  histd: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.codeClinique = TabsPage.tabLangue.codeClinique;
    this.tabLangue = TabsPage.tabLangue.tabLangue;
    this.pass = TabsPage.tabLangue.pass;
    this.langue = TabsPage.tabLangue.langue;
    Variables.checconnection().then(connexion => {
      if (connexion === false) {
        this.connection = false;

      } else {
        this.connection = true;
      }
    });
    this.histd = DossierPage.hist;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pharmacie');
  }

  goToInfPage() {
    this.navCtrl.push(ClientDetailPage);
  }
}
