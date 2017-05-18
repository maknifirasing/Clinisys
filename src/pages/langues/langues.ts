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
  pathimage = Variables.path;

  lan: any;
  fr: any;
  ang: any;
  ar: any;

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.updatelangue();
  }

  updatelangue() {
    var lang;
    this.userserv = new UserService(this.sqlite);
    this.userserv.getAllUser().then(user => {
      if (user.length !== 0) {
        this.langserv = new LangueService(this.sqlite);
        this.langserv.verifLangue().then(res => {
          if (res === true) {
            this.langserv.getLangues(this.langes).then(lg => {
              lang = lg.getlangue();
              if (lang === "arabe") {
                this.tabLangue = Variables.arabe;
              }
              else if (lang === "francais") {
                this.tabLangue = Variables.francais;
              }
              else if (lang === "anglais") {
                this.tabLangue = Variables.anglais;
              }
              this.lan = this.tabLangue.titreLangue;
              this.fr = this.tabLangue.francais;
              this.ang = this.tabLangue.anglais;
              this.ar = this.tabLangue.arabe;

            });
          }
        });
      } else {
        this.lan = "Langues";
        this.fr = "francais";
        this.ang = "anglais";
        this.ar = "arabe";
      }
    });
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
              l.setcodePin(lg.getcodePin());
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
