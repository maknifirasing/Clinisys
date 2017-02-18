import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import {DossierPage} from "../dossier/dossier";
import {NavParams} from 'ionic-angular';
import {ExamenRadioPage} from "../examen-radio/examen-radio";
import {ListPreanesthesiePage} from "../list-preanesthesie/list-preanesthesie";


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tab1Root: any = DossierPage;
  tab2Root: any = ExamenRadioPage;
  tab3Root: any = ListPreanesthesiePage;
  id: string;
  numDoss: string;
  img: string;
  nom: string;
  age: string;
  ch: string;
  nature: string;
  dateFeuille: string;
  chatParams: any;
  dat: string;

  constructor(public navParams: NavParams,) {
    this.id = navParams.get("identifiant");
    this.numDoss = navParams.get("numeroDossier");
    this.img = navParams.get("image");
    this.nom = navParams.get("nom");
    this.age = navParams.get("age");
    this.ch = navParams.get("chambre");
    this.nature = navParams.get("nature");
    this.dateFeuille = navParams.get("dateFeuille");
    var d = new Date();
    this.dat = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    this.chatParams = {
      nom: this.nom,
      age: this.age,
      id: this.id,
      numDoss: this.numDoss,
      img: this.img,
      ch: this.ch,
      nature: this.nature,
      dateFeuille: this.dateFeuille,
      dat: this.dat
    };
  }
}
