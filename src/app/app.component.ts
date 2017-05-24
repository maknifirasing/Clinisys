import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {UserService} from "../services/UserService";
import {Langue} from "../models/Langue";
import {LanguesPage} from "../pages/langues/langues";
import {ListePage} from "../pages/liste/liste";
import {Variables} from "../providers/variables";
import {LangueService} from "../services/LangueService";
import {ListeCliniquePage} from "../pages/liste-clinique/liste-clinique";
import {ModifPassPage} from "../pages/modif-pass/modif-pass";

@Component({
  selector: 'page-app',
  templateUrl: 'app.html',
  providers: [Variables]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  private codeClinique: string;
  private langserv: any;
  langes: Array<Langue> = [];
  public langue: any;
  tabLangue: any;
  nomClinique: any;
  private userserv: any;
  pathimage: any;
  menu: any = "left";


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public sqlite: SQLite) {
    this.pages = [
      {title: 'Langues', component: LanguesPage}
    ];
    this.initializeApp();

  }

  menuOpened() {
    this.langue = Variables.langue;
    if (this.langue === 'arabe') {
      this.menu = "right";
    } else {
      this.menu = "left";
    }
    this.tabLangue = Variables.tab;
    this.nomClinique = Variables.nomClinique;
  }


  initializeApp() {
    // Variables.uRL = "http://192.168.0.63:8084/";
    Variables.uRL = "http://adminWS:pom@37.59.230.40:8084/";
//    Variables.uRL = "http://adminWS:pom@192.168.0.172:8084/";

    this.platform.ready().then(() => {
      this.saveDB();

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
                  this.menu = "right";
                }
                else if (this.langue === "francais") {
                  this.tabLangue = Variables.francais;
                  this.menu = "left";
                }
                else if (this.langue === "anglais") {
                  this.tabLangue = Variables.anglais;
                  this.menu = "left";
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
      Variables.padingtop = 50;
      if (this.platform.is('ios')) {
        Variables.device = 63;
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#0277bd');
      } else {
        Variables.device = 73;
        this.statusBar.styleDefault();
      }

      if ((!this.platform.is('cordova')) || (this.platform.is('ios')) || (this.platform.is('android'))) {
        Variables.path = './assets/img';
        this.pathimage = './assets/img';
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        Variables.path = '../../assets/img';
        this.pathimage = '../../assets/img';
      }

      setTimeout(() => {
        this.splashScreen.hide();
      }, 10);
    });
  }

  saveDB() {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('CREATE TABLE IF NOT EXISTS Langue(langue ,nom ,codePin ,codeClinique ,nomClinique ,url )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeListPreanesthesie(codeClinique ,numDoss ,ListPreanesthesie )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeConsigne(codeClinique ,numDoss ,consigneT ,consignes )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeLabo(codeClinique ,numDoss ,LabosT ,Labos )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeRadio(codeClinique ,numDoss ,RadioT ,Radio )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeActe(codeClinique ,numDoss ,ActeT ,Acte )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS Clinique(code ,nom ,url )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS HistPatient(user ,searchText ,etage ,date ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS HistDossier(numDoss ,date ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS HistSigneCourbe(numDoss ,date ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS HistTraitCourbe(numDoss ,date ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS HistPdf(numDoss ,date ,codeClinique ,nom )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS HistDoc(numDoss ,date ,codeClinique ,nom )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS Users(codePin ,passWord ,userName ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS Patient(id ,dossier ,chambre ,nom ,' +
          'prenom ,dateNaiss ,medecin ,spec ,etat ,age ,' +
          'img ,nature ,user ,searchText ,etage ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS DateFeuille(datefeuille ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS Traitement(numDoss ,designation ,jour ,posologie ,datefeuille ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueAlert(codeType ,date ,designation ,' +
          'quantite ,numDoss ,dateFeuille ,nature ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueEnt(codeType ,date ,designation ,' +
          'quantite ,numDoss ,dateFeuille ,nature ,codetypeof ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueSig(codeType ,date ,designation ,' +
          'quantite ,numDoss ,dateFeuille ,nature ,codetypeof ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueSor(codeType ,date ,designation ,' +
          'quantite ,numDoss ,dateFeuille ,nature ,codetypeof ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS Alegc(idpass ,ch ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS Antech(idpass ,ch ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS motifHospitalisation(groupeSang ,motifhospitalisation ,' +
          'numdoss ,poid ,taille ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS EvenementCon(evenements ' +
          ',date ,detail ,numdoss ,userCreat ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS EvenementEvo(evenements ' +
          ',date ,detail ,numdoss ,userCreat ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS EvenementExa(evenements ' +
          ',date ,detail ,numdoss ,userCreat ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS EvenementHis(evenements ' +
          ',date ,detail ,numdoss ,userCreat ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS Rigime(designation ,numdoss ' +
          ',datefeuille ,nature ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS ExamenRadioT(compterendu ,dateExamen ,designationExamen ,numeroDossier ,observ ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS ExamenRadioF(compterendu ,dateExamen ,designationExamen ,numeroDossier ,observ ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS LaboT(codeDemande ,contenuePDF ,dateDemande ' +
          ',medecinTraitant ,numAdmission ,numDossier ,pdf ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS LaboF(codeDemande ,contenuePDF ,dateDemande ' +
          ',medecinTraitant ,numAdmission ,numDossier ,pdf ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS ListPreanesthesie (acte ,chirurgien ,dateacte ,heureDebut ,heureFin ,kc ,numeroDossier ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS Document (url ,observ ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS Client (adrCli ,datNai ,libNat ' +
          ',numTel ,etage ,numCha ,numdoss ,identifiant ,codeClinique ,dateArr )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS Medecin (codMed ,nomMed ,designationSpecialite ' +
          ',codeClinique ,numdoss )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS SigneCourbePouls (codePosologie ,designation ' +
          ',seuilMin ,seuilMax ,color ,unite ,quantite ,heurePrise ,dateHeurePrise ,codeClinique ,numdoss )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS SigneCourbeFrq (codePosologie ,designation ' +
          ',seuilMin ,seuilMax ,color ,unite ,quantite ,heurePrise ,dateHeurePrise ,codeClinique ,numdoss )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS SigneCourbeSaturation (codePosologie ,designation ' +
          ',seuilMin ,seuilMax ,color ,unite ,quantite ,heurePrise ,dateHeurePrise ,codeClinique ,numdoss )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS SigneCourbeTA (codePosologie ,designation ' +
          ',seuilMin ,seuilMax ,color ,unite ,quantite ,heurePrise ,dateHeurePrise ,codeClinique ,numdoss )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS SigneCourbeTemp (codePosologie ,designation ' +
          ',seuilMin ,seuilMax ,color ,unite ,quantite ,heurePrise ,dateHeurePrise ,codeClinique ,numdoss )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS TraitCourbe (codePosologie ,codeType ,date ,designation ' +
          ',heurePrise ,heureRealisation ,' +
          'numTraitement ,ordre ,quantite ,retourn ,row ,numDoss ,codeClinique )', {});

        db.executeSql('CREATE TABLE IF NOT EXISTS Consigne (datetache ,details ,etat ,heurtache ' +
          ',numeroDossier ,codeMedecin ,type ,userCreate ,codeClinique ,typeget ,etatget )', {});
      })
      .catch(e => alert(JSON.stringify(e)));


  }


  deconnexion() {
    this.userserv = new UserService(this.sqlite);
    this.userserv.deleteUsers(this.codeClinique).then(res => {
      if (res === true) {
        this.nav.setRoot(ListeCliniquePage, {tabLangue: Variables.tab, langue: Variables.langue});
      }
    });

  }

  changerlangue() {
    this.nav.setRoot(LanguesPage);
  }

  changerPassword() {
    this.langserv = new LangueService(this.sqlite);
    this.langserv.getLangues(this.langes).then(lg => {
      this.nav.push(ModifPassPage, {
        tabLangue: Variables.tab,
        langue: Variables.langue,
        codeClinique: lg.getcodeClinique(),
        nomClinique: lg.getnomClinique()
      });
    });
  }

  openListeCliniquePage() {
    this.nav.setRoot(ListeCliniquePage, {tabLangue: Variables.tab, langue: Variables.langue});
  }
}
