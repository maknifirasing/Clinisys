import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {NativeStorage} from "ionic-native";
import {ListeCliniquePage} from "../liste-clinique/liste-clinique";
import {Langue} from "../../models/Langue";
import {LangueService} from "../../services/LangueService";
import {UserService} from "../../services/UserService";
import {Users} from "../../models/Users";
import {ListePage} from "../liste/liste";

@Component({
  selector: 'page-langues',
  templateUrl: 'langues.html'
})
export class LanguesPage {
  la: string;
  tabLangue: any;
  langserv: any;
  langes: Array<Langue> = [];

  langue: string;


  constructor(public navCtrl: NavController) {
    NativeStorage.setItem("name", "basma");
  }

  ionViewDidLoad() {
  }

  choixLang(lang) {

    if (lang === "arabe") {
      this.tabLangue = Variables.arabe;
    }
    else if (lang === "francais") {
      this.tabLangue = Variables.francais;
    }
    else if (lang === "anglais") {
      this.tabLangue = Variables.anglais;
    }
    var l = new Langue();
    l.setlangue(lang);
    this.langes.push(l);
    this.langserv = new LangueService();
    try {
      this.langserv.deleteLangues();
      this.langserv.getLangues(this.langes);
    }
    catch (Error) {
      this.langserv.getLangues(this.langes);
    }
    this.langserv.getLangues(this.langes);
    this.navCtrl.push(ListeCliniquePage, {tabLangue: this.tabLangue, langue: lang});
  }

}
