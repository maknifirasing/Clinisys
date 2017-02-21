import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import {DossierPage} from "../dossier/dossier";
import {NavParams} from 'ionic-angular';
import {ExamenRadioPage} from "../examen-radio/examen-radio";
import {ListPreanesthesiePage} from "../list-preanesthesie/list-preanesthesie";
import {ExamenLaboPage} from "../examen-labo/examen-labo";
import {MyApp} from "../../app/app.component";
import {Patient} from "../../models/Patient";

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tab1Root: any = DossierPage;
  tab2Root: any = ExamenRadioPage;
  tab3Root: any = ListPreanesthesiePage;
  tab4Root: any = ExamenLaboPage;
  pas:Patient;
  dateFeuille: string;
  chatParams: any;
  dat: string;
  app: MyApp;
  nbr:number;

  constructor(public navParams: NavParams,) {
    this.pas = navParams.get("mypatient");
    this.dateFeuille = navParams.get("dateFeuille");
    var d = new Date();
    this.dat = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    this.chatParams = {
      pas: this.pas,
      dateFeuille: this.dateFeuille,
      dat: this.dat
    };
  }
}
