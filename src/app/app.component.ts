import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {UserService} from "../services/UserService";
import {TryPage} from "../pages/try/try";
import {Langue} from "../models/Langue";
import {LanguesPage} from "../pages/langues/langues";
import {ListePage} from "../pages/liste/liste";
import {Variables} from "../providers/variables";
import {LangueService} from "../services/LangueService";
import {Database} from "../providers/database";

@Component({
  templateUrl: 'app.html',
  providers:[Database]
})
export class MyApp {
  rootPage: any;
  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any }>;
  private codeClinique: string;
  private langserv: any;
  langes: Array<Langue> = [];
  private langue: any;
  tabLangue: any;
  nomClinique: any;
  private userserv: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sqlite: SQLite,private database: Database) {
    this.pages = [
      {title: 'Langues', component: LanguesPage}
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.



      this.userserv = new UserService(this.sqlite);
      this.userserv.getAllUser().then(user => {
        if (user.length === 0) {
          this.nav.setRoot(LanguesPage);
        } else {
          this.langserv = new LangueService(this.sqlite);
          this.langserv.verifLangue().then(res => {
            if (res === true) {
              this.langserv.getLangues(this.langes).then(lang => {
                this.codeClinique = lang.getcodeClinique();
                this.nomClinique = lang.getnomClinique();
                this.langue = lang.getlangue();
                if (this.langue === "arabe") {
                  this.tabLangue = Variables.arabe;
                }
                else if (this.langue === "francais") {
                  this.tabLangue = Variables.francais;
                }
                else if (this.langue === "anglais") {
                  this.tabLangue = Variables.anglais;
                }

                this.nav.setRoot(ListePage, {
                  tabLangue: this.tabLangue,
                  langue: this.langue,
                  codeClinique: this.codeClinique,
                  nomClinique: this.nomClinique
                });
              });
            } else {
              this.nav.setRoot(LanguesPage);
            }
          });
        }
      });

  //    this.nav.setRoot(TryPage);
      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 10);
    });
  }
}
