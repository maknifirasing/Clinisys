var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { LanguesPage } from '../pages/langues/langues';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';
var MyApp = (function () {
    function MyApp(platform) {
        var _this = this;
        this.users = [];
        this.langes = [];
        this.pages = [
            { title: 'Langues', component: LanguesPage }
        ];
        platform.ready().then(function () {
            SQLite.openDatabase({
                name: 'clinisys.db',
                location: 'default'
            })
                .then(function (db) {
                db.executeSql('CREATE TABLE IF NOT EXISTS Langue (langue VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeListPreanesthesie(codeClinique VARCHAR(32),numDoss VARCHAR(32),ListPreanesthesie VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeLabo(codeClinique VARCHAR(32),numDoss VARCHAR(32),LabosT VARCHAR(32),Labos VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeRadio(codeClinique VARCHAR(32),numDoss VARCHAR(32),RadioT VARCHAR(32),Radio VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeActe(codeClinique VARCHAR(32),numDoss VARCHAR(32),ActeT VARCHAR(32),Acte VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeConsigne(codeClinique VARCHAR(32),numDoss VARCHAR(32),ConsigneT VARCHAR(32),Consigne VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Clinique(code VARCHAR(32),id VARCHAR(32),nom VARCHAR(32),url VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS HistPatient(user VARCHAR(32),searchText VARCHAR(32),etage VARCHAR(32),date VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS HistDossier(numDoss VARCHAR(32),date VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Users(actif NUMERIC(10),chStat NUMERIC(10),codeMedecinInfirmier VARCHAR(32),codePin NUMERIC(10),' +
                    'dateModPwd VARCHAR(32),dernierDateCnx VARCHAR(32),description VARCHAR(32),grp VARCHAR(32),matricule VARCHAR (32),natureUserDS VARCHAR (32),' +
                    'oldGrp VARCHAR(32),passWord VARCHAR(32),userName VARCHAR(32),validCptRend VARCHAR(32),validPHNuit VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Patient(id VARCHAR(32),dossier VARCHAR(32),chambre VARCHAR(32),nom VARCHAR(32),' +
                    'prenom VARCHAR(32),dateNaiss VARCHAR(32),medecin VARCHAR(32),spec VARCHAR(32),etat VARCHAR (32),age NUMERIC(10),' +
                    'img VARCHAR(32),nature VARCHAR(32),user VARCHAR(32),searchText VARCHAR(32),etage VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS DateFeuille(datefeuille VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Traitement(codePosologie VARCHAR(32),date VARCHAR(32),dateFinTrait VARCHAR(32),' +
                    'dci VARCHAR(32),designation VARCHAR(32),dureEnJour NUMERIC(10),heure VARCHAR(32),heureDebut VARCHAR(32),jour NUMERIC(10),nbFois NUMERIC(10),' +
                    'numDoss VARCHAR(32),numTraitement VARCHAR(32),numbon VARCHAR(32),posologie VARCHAR(32),prescripteur VARCHAR(32),quantite VARCHAR(32),' +
                    'unite VARCHAR(32),vitesse VARCHAR(32),voie VARCHAR(32),volume VARCHAR(32),datefeuille VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueAlert(codeType VARCHAR(32),date VARCHAR(32),designation VARCHAR(32),' +
                    'quantite VARCHAR(32),numDoss VARCHAR(32),dateFeuille VARCHAR(32),nature VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueEnt(codeType VARCHAR(32),date VARCHAR(32),designation VARCHAR(32),' +
                    'quantite VARCHAR(32),numDoss VARCHAR(32),dateFeuille VARCHAR(32),nature VARCHAR(32),codetypeof VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueSig(codeType VARCHAR(32),date VARCHAR(32),designation VARCHAR(32),' +
                    'quantite VARCHAR(32),numDoss VARCHAR(32),dateFeuille VARCHAR(32),nature VARCHAR(32),codetypeof VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueSor(codeType VARCHAR(32),date VARCHAR(32),designation VARCHAR(32),' +
                    'quantite VARCHAR(32),numDoss VARCHAR(32),dateFeuille VARCHAR(32),nature VARCHAR(32),codetypeof VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Alegc(idpass VARCHAR(32),ch VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Antech(idpass VARCHAR(32),ch VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Consigne(type VARCHAR(32),datetache VARCHAR(32),date VARCHAR(32),' +
                    'heurtache VARCHAR(32),details VARCHAR(32),userCreate VARCHAR(32),id VARCHAR(32),listCode VARCHAR(32),NumeroDossier VARCHAR(32),codeMedecin VARCHAR(32),etat VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS motifHospitalisation(conclusion VARCHAR(32),dateRdv VARCHAR(32),dateSortie VARCHAR(32)' +
                    ',groupeSang VARCHAR(32),heureRdv VARCHAR(32),heureSortie VARCHAR(32),histoiremaladie VARCHAR(32),motifhospitalisation VARCHAR(32),' +
                    'numdoss VARCHAR(32),observationSejour VARCHAR(32),poid VARCHAR(32),taille VARCHAR(32),traitementHabituelle VARCHAR(32),' +
                    'traitementSejour VARCHAR(32),traitementSortie VARCHAR(32),utilisateurMotif VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS EvenementCon(access NUMERIC(10),code VARCHAR(32),evenements VARCHAR(32)' +
                    ',orderEvenement NUMERIC(10),visible VARCHAR(32),date VARCHAR(32),detail VARCHAR(32),IDEvenement NUMERIC(10),numdoss VARCHAR(32),userCreat VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS EvenementEvo(access NUMERIC(10),code VARCHAR(32),evenements VARCHAR(32)' +
                    ',orderEvenement NUMERIC(10),visible VARCHAR(32),date VARCHAR(32),detail VARCHAR(32),IDEvenement NUMERIC(10),numdoss VARCHAR(32),userCreat VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS EvenementExa(access NUMERIC(10),code VARCHAR(32),evenements VARCHAR(32)' +
                    ',orderEvenement NUMERIC(10),visible VARCHAR(32),date VARCHAR(32),detail VARCHAR(32),IDEvenement NUMERIC(10),numdoss VARCHAR(32),userCreat VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS EvenementHis(access NUMERIC(10),code VARCHAR(32),evenements VARCHAR(32)' +
                    ',orderEvenement NUMERIC(10),visible VARCHAR(32),date VARCHAR(32),detail VARCHAR(32),IDEvenement NUMERIC(10),numdoss VARCHAR(32),userCreat VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Rigime(codeRegime NUMERIC(10),designation VARCHAR(32),numdoss VARCHAR(32)' +
                    ',datefeuille NUMERIC(10),nature VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS ExamenRadioT(codeExamen VARCHAR(32),compterendu VARCHAR(32),dateExamen VARCHAR(32)' +
                    ',datePrevu VARCHAR(32),date_RDV VARCHAR(32),designationExamen VARCHAR(32),heurePrevu VARCHAR(32),idres VARCHAR(32),' +
                    'medecin VARCHAR(32),nature VARCHAR(32),numeroDossier VARCHAR(32),numeroExamen VARCHAR(32),observ VARCHAR(32),resultat VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS ExamenRadioF(codeExamen VARCHAR(32),compterendu VARCHAR(32),dateExamen VARCHAR(32)' +
                    ',datePrevu VARCHAR(32),date_RDV VARCHAR(32),designationExamen VARCHAR(32),heurePrevu VARCHAR(32),idres VARCHAR(32),' +
                    'medecin VARCHAR(32),nature VARCHAR(32),numeroDossier VARCHAR(32),numeroExamen VARCHAR(32),observ VARCHAR(32),resultat VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS LaboT(codeDemande VARCHAR(32),contenuePDF VARCHAR(32),dateDemande VARCHAR(32)' +
                    ',dateRealisation VARCHAR(32), designation VARCHAR(32),etatExamen NUMERIC(10),id NUMERIC(10),medecinTraitant VARCHAR(32),' +
                    'nomLabo VARCHAR(32),numAdmission VARCHAR(32),numDossier VARCHAR(32),patient VARCHAR(32),state VARCHAR(32),userName VARCHAR(32),' +
                    'validation VARCHAR(32),pdf VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS LaboF(codeDemande VARCHAR(32),contenuePDF VARCHAR(32),dateDemande VARCHAR(32)' +
                    ',dateRealisation VARCHAR(32), designation VARCHAR(32),etatExamen NUMERIC(10),id NUMERIC(10),medecinTraitant VARCHAR(32),' +
                    'nomLabo VARCHAR(32),numAdmission VARCHAR(32),numDossier VARCHAR(32),patient VARCHAR(32),state VARCHAR(32),userName VARCHAR(32),' +
                    'validation VARCHAR(32),pdf VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS ListPreanesthesie (acte VARCHAR(32),chirurgien VARCHAR(32),codeActe VARCHAR(32),codeExamen VARCHAR(32),codeMedecinReanimateur VARCHAR(32),' +
                    'codeMedecinchirurgi VARCHAR(32),codeMedecinchirurgien VARCHAR(32),codePostop VARCHAR(32),dateacte VARCHAR(32),datedemande VARCHAR(32),etatReservationBloc VARCHAR(32),' +
                    'hasAnesth VARCHAR(32),hasPost VARCHAR(32),hasPre VARCHAR(32),heureDebut VARCHAR(32),heureFin VARCHAR(32),id VARCHAR(32),identifiant VARCHAR(32),kc VARCHAR(32),nom VARCHAR(32),nomReanimateur VARCHAR(32)' +
                    ',prenom VARCHAR(32),numeroDossier VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Document (url VARCHAR(32),observ VARCHAR(32),codeClinique VARCHAR(32))', {});
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error opening database  ' + error);
            });
            /*
                this.userserv = new UserService();
                  this.userserv.verifUser().then(res => {
                    if (res === true) {
                      this.userserv.getUser(this.users).then(user => {
                        this.codeClinique = user.getcodeClinique();
            
            
                      this.langserv = new LangueService();
                      this.langserv.getLangues(this.langes).then(lang => {
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
                          codeClinique: this.codeClinique
                        });
                      });
                      });
                    }else {
                      this.nav.setRoot(LanguesPage);
                    }
                  });
            */
            _this.nav.setRoot(LanguesPage);
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map