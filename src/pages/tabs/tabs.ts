import {Component} from '@angular/core';
import {DossierPage} from "../dossier/dossier";
import {NavParams, NavController} from 'ionic-angular';
import {ExamenRadioPage} from "../examen-radio/examen-radio";
import {ListPreanesthesiePage} from "../list-preanesthesie/list-preanesthesie";
import {ExamenLaboPage} from "../examen-labo/examen-labo";
<<<<<<< HEAD
import {MyApp} from "../../app/app.component";
=======
import {Variables} from "../../providers/variables";
>>>>>>> 7b0e36a43bd86a82dd9b92f7098ceefdb82ff7ef
import {Patient} from "../../models/Patient";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [Variables]
})

export class TabsPage {
  tab1Root: any = DossierPage;
  tab2Root: any = ExamenRadioPage;
  tab3Root: any = ListPreanesthesiePage;
  tab4Root: any = ExamenLaboPage;
<<<<<<< HEAD
  pas:Patient;
  dateFeuille: string;
  chatParams: any;
  dat: string;
  app: MyApp;
  nbr:number;

  constructor(public navParams: NavParams,) {
    this.pas = navParams.get("mypatient");
=======
  pass: Patient;
  dateFeuille: string;
  chatParams: any;
  dat: string;
  nbr: number;
  public navCtrl: NavController;

  constructor(public navParams: NavParams, private Url: Variables) {
    this.pass = navParams.get("mypatient");
>>>>>>> 7b0e36a43bd86a82dd9b92f7098ceefdb82ff7ef
    this.dateFeuille = navParams.get("dateFeuille");
    var d = new Date();
    this.dat = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    this.chatParams = {
<<<<<<< HEAD
      pas: this.pas,
=======
      pass: this.pass,
>>>>>>> 7b0e36a43bd86a82dd9b92f7098ceefdb82ff7ef
      dateFeuille: this.dateFeuille,
      dat: this.dat,
    };
  }
}
