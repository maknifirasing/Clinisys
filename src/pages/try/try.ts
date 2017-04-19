import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {TraitCourbe} from "../../models/TraitCourbe";
import {SigneCourbe} from "../../models/SigneCourbe";
import {LanguesPage} from "../langues/langues";

@Component({
  selector: 'page-try',
  templateUrl: 'try.html',
  providers: [Variables]
})
export class TryPage {
  chartData: any;
  traitcourbe: Array<TraitCourbe> = [];
  courbePouls: Array<SigneCourbe> = [];
  courbeTA: Array<SigneCourbe> = [];
  courbeTemp: Array<SigneCourbe> = [];
  courbeSaturation: Array<SigneCourbe> = [];
  courbeFrq: Array<SigneCourbe> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables) {

  }

  tab1Root = LanguesPage;
  tab2Root = LanguesPage;
  tab3Root = LanguesPage;
}
