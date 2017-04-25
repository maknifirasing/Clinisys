import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {ListeCliniquePage} from "../liste-clinique/liste-clinique";
import {Langue} from "../../models/Langue";
import {LangueService} from "../../services/LangueService";
import {ListePage} from "../liste/liste";
import {UserService} from "../../services/UserService";
import {SQLite} from "@ionic-native/sqlite";


@Component({
  selector: 'page-langues',
  templateUrl: 'langues.html',
  providers: [Variables]
})
export class LanguesPage {
  la: string;
  tabLangue: any;
  langserv: any;
  langes: Array<Langue> = [];
  codeClinique: string;
  langue: string;
  private userserv: any;
  pathimage=Variables.path;

  constructor(public navCtrl: NavController,private sqlite: SQLite) {
    //  Variables.auth();
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

    this.userserv = new UserService(this.sqlite);
    this.userserv.getAllUser().then(user => {
      if (user.length === 0) {
        this.navCtrl.push(ListeCliniquePage, {tabLangue: this.tabLangue, langue: lang});
      } else {
        this.langserv = new LangueService(this.sqlite);
        this.langserv.verifLangue().then(res => {
          if (res === true) {
            this.langserv.getLangues(this.langes).then(lg => {
              var l = new Langue();
              l.setlangue(lang);
              l.setnom(lg.getnom());
              l.setmatricule(lg.getmatricule());
              l.setcodeClinique(lg.getcodeClinique());
              l.setnomClinique(lg.getnomClinique());
              l.seturl(lg.geturl());
              this.langes.push(l);
              this.langserv.deleteLangues().then(delet => {
                if (delet === true) {
                  this.langserv.getLangues(this.langes);
                  this.navCtrl.setRoot(ListePage, {
                    tabLangue: this.tabLangue,
                    langue: lang,
                    codeClinique: lg.getcodeClinique(),
                    nomClinique: lg.getnomClinique()
                  });
                }
              });
            });

          } else {
            this.navCtrl.push(ListeCliniquePage, {tabLangue: this.tabLangue, langue: lang});
          }
        });
      }
    });
  }
}
