import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RealisationPage} from "../realisation/realisation";
import {Variables} from "../../providers/variables";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  connection: boolean;
  tabLangue: any;
  pass: any;
  codeClinique: any;
  langue: any;
  dateFeuille: any;
  heureActuelle: any;
  pathimage=Variables.path;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabLangue = navParams.get("tabLangue");
    this.codeClinique = navParams.get("codeClinique");
    this.pass = navParams.get("pass");
    this.langue = navParams.get("langue");
    this.dateFeuille = navParams.get("dateFeuille");
    this.heureActuelle = navParams.get("heureActuelle");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }
realisation(){
this.navCtrl.push(RealisationPage,{pass:this.pass,langue:this.langue,tabLangue:this.tabLangue,dateFeuille:this.dateFeuille
    ,heureActuelle:this.heureActuelle,codeClinique:this.codeClinique})
}
}
