import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SQLite} from '@ionic-native/sqlite';
import {UserService} from "../services/UserService";
import {Langue} from "../models/Langue";
import {LanguesPage} from "../pages/langues/langues";
import {ListePage} from "../pages/liste/liste";
import {Variables} from "../providers/variables";
import {LangueService} from "../services/LangueService";
import {Database} from "../providers/database";

@Component({
  templateUrl: 'app.html',
  providers: [Database]
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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sqlite: SQLite, private database: Database) {
    this.pages = [
      {title: 'Langues', component: LanguesPage}
    ];
   Variables.uRL = "http://adminWS:pom@37.59.230.40:8084/";
  //  Variables.uRL = "http://adminWS:pom@192.168.0.172:8084/";

    platform.ready().then(() => {

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
                Variables.updateUrl(lang.geturl());
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

      if ((!platform.is('cordova')) || (platform.is('ios')) || (platform.is('android'))) {
        Variables.path = './assets/img';
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        Variables.path = '../../assets/img';
      }


      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 10);
    });
  }
}
