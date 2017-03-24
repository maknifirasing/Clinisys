import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {NativeStorage} from "ionic-native";
import {ListeCliniquePage} from "../liste-clinique/liste-clinique";
import {Langue} from "../../models/Langue";
import {LangueService} from "../../services/LangueService";
import {UserService} from "../../services/UserService";
import {ListePage} from "../liste/liste";
import {Users} from "../../models/Users";

@Component({
  selector: 'page-langues',
  templateUrl: 'langues.html'
})
export class LanguesPage {
  la: string;
  tabLangue: any;
  langserv: any;
  langes: Array<Langue> = [];
  users: Array<Users> = [];
  private codeClinique: string;
  langue: string;
  private userserv: UserService;


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

    this.userserv = new UserService();
    this.userserv.verifUser().then(res => {
      if (res === true) {
        this.userserv.getUser(this.users).then(user => {
          this.codeClinique = user.getcodeClinique();
          this.navCtrl.push(ListePage, {
            tabLangue: this.tabLangue,
            langue: lang,
            codeClinique: this.codeClinique
          });
        });
      } else {
        this.navCtrl.push(ListeCliniquePage, {tabLangue: this.tabLangue, langue: lang});
      }
    });

  }
}
