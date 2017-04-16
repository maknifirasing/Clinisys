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
import { LangueService } from "../services/LangueService";
import { Variables } from "../providers/variables";
import { ListePage } from "../pages/liste/liste";
import { UserService } from "../services/UserService";
var MyApp = (function () {
    function MyApp(platform) {
        var _this = this;
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
                db.executeSql('CREATE TABLE IF NOT EXISTS Langue (langue VARCHAR(32),matricule VARCHAR (32),codeClinique VARCHAR(32),nomClinique VARCHAR(32),url VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeListPreanesthesie(codeClinique VARCHAR(32),numDoss VARCHAR(32),ListPreanesthesie VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeConsigne(codeClinique VARCHAR(32),numDoss VARCHAR(32),consigneT VARCHAR(32),consignes VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeLabo(codeClinique VARCHAR(32),numDoss VARCHAR(32),LabosT VARCHAR(32),Labos VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeRadio(codeClinique VARCHAR(32),numDoss VARCHAR(32),RadioT VARCHAR(32),Radio VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS tabBadgeActe(codeClinique VARCHAR(32),numDoss VARCHAR(32),ActeT VARCHAR(32),Acte VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Clinique(code VARCHAR(32),nom VARCHAR(32),url VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS HistPatient(user VARCHAR(32),searchText VARCHAR(32),etage VARCHAR(32),date VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS HistDossier(numDoss VARCHAR(32),date VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS HistSigneCourbe(numDoss VARCHAR(32),date VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS HistTraitCourbe(numDoss VARCHAR(32),date VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS HistPdf(numDoss VARCHAR(32),date VARCHAR(32),codeClinique VARCHAR(32),nom VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS HistDoc(numDoss VARCHAR(32),date VARCHAR(32),codeClinique VARCHAR(32),nom VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Users(matricule VARCHAR (32),passWord VARCHAR(32),userName VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Patient(id VARCHAR(32),dossier VARCHAR(32),chambre VARCHAR(32),nom VARCHAR(32),' +
                    'prenom VARCHAR(32),dateNaiss VARCHAR(32),medecin VARCHAR(32),spec VARCHAR(32),etat VARCHAR (32),age NUMERIC(10),' +
                    'img VARCHAR(32),nature VARCHAR(32),user VARCHAR(32),searchText VARCHAR(32),etage VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS DateFeuille(datefeuille VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Traitement(numDoss VARCHAR(32),designation VARCHAR(32),jour NUMERIC(10),posologie VARCHAR(32),datefeuille VARCHAR(32),codeClinique VARCHAR(32))', {});
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
                db.executeSql('CREATE TABLE IF NOT EXISTS motifHospitalisation(groupeSang VARCHAR(32),motifhospitalisation VARCHAR(32),' +
                    'numdoss VARCHAR(32),poid VARCHAR(32),taille VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS EvenementCon(evenements VARCHAR(32)' +
                    ',date VARCHAR(32),detail VARCHAR(32),numdoss VARCHAR(32),userCreat VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS EvenementEvo(evenements VARCHAR(32)' +
                    ',date VARCHAR(32),detail VARCHAR(32),numdoss VARCHAR(32),userCreat VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS EvenementExa(evenements VARCHAR(32)' +
                    ',date VARCHAR(32),detail VARCHAR(32),numdoss VARCHAR(32),userCreat VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS EvenementHis(evenements VARCHAR(32)' +
                    ',date VARCHAR(32),detail VARCHAR(32),numdoss VARCHAR(32),userCreat VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Rigime(designation VARCHAR(32),numdoss VARCHAR(32)' +
                    ',datefeuille NUMERIC(10),nature VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS ExamenRadioT(compterendu VARCHAR(32),dateExamen VARCHAR(32),designationExamen VARCHAR(32),numeroDossier VARCHAR(32),observ VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS ExamenRadioF(compterendu VARCHAR(32),dateExamen VARCHAR(32),designationExamen VARCHAR(32),numeroDossier VARCHAR(32),observ VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS LaboT(codeDemande VARCHAR(32),contenuePDF VARCHAR(32),dateDemande VARCHAR(32)' +
                    ',medecinTraitant VARCHAR(32),numAdmission VARCHAR(32),numDossier VARCHAR(32),pdf VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS LaboF(codeDemande VARCHAR(32),contenuePDF VARCHAR(32),dateDemande VARCHAR(32)' +
                    ',medecinTraitant VARCHAR(32),numAdmission VARCHAR(32),numDossier VARCHAR(32),pdf VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS ListPreanesthesie (acte VARCHAR(32),chirurgien VARCHAR(32),dateacte VARCHAR(32),heureDebut VARCHAR(32),heureFin VARCHAR(32),kc VARCHAR(32),numeroDossier VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Document (url VARCHAR(32),observ VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Client (adrCli VARCHAR(32),datNai VARCHAR(32),libNat VARCHAR(32)' +
                    ',numTel VARCHAR(32),etage VARCHAR(32),numCha VARCHAR(32),numdoss VARCHAR(32),identifiant VARCHAR(32),codeClinique VARCHAR(32),dateArr VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Medecin (codMed VARCHAR(32),nomMed VARCHAR(32),designationSpecialite VARCHAR(32)' +
                    ',codeClinique VARCHAR(32),numdoss VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS SigneCourbePouls (codePosologie VARCHAR(32),designation VARCHAR(32)' +
                    ',seuilMin VARCHAR(32),seuilMax VARCHAR(32),color VARCHAR(32),unite VARCHAR(32),quantite VARCHAR(32),heurePrise VARCHAR(32),dateHeurePrise VARCHAR(32),codeClinique VARCHAR(32),numdoss VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS SigneCourbeFrq (codePosologie VARCHAR(32),designation VARCHAR(32)' +
                    ',seuilMin VARCHAR(32),seuilMax VARCHAR(32),color VARCHAR(32),unite VARCHAR(32),quantite VARCHAR(32),heurePrise VARCHAR(32),dateHeurePrise VARCHAR(32),codeClinique VARCHAR(32),numdoss VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS SigneCourbeSaturation (codePosologie VARCHAR(32),designation VARCHAR(32)' +
                    ',seuilMin VARCHAR(32),seuilMax VARCHAR(32),color VARCHAR(32),unite VARCHAR(32),quantite VARCHAR(32),heurePrise VARCHAR(32),dateHeurePrise VARCHAR(32),codeClinique VARCHAR(32),numdoss VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS SigneCourbeTA (codePosologie VARCHAR(32),designation VARCHAR(32)' +
                    ',seuilMin VARCHAR(32),seuilMax VARCHAR(32),color VARCHAR(32),unite VARCHAR(32),quantite VARCHAR(32),heurePrise VARCHAR(32),dateHeurePrise VARCHAR(32),codeClinique VARCHAR(32),numdoss VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS SigneCourbeTemp (codePosologie VARCHAR(32),designation VARCHAR(32)' +
                    ',seuilMin VARCHAR(32),seuilMax VARCHAR(32),color VARCHAR(32),unite VARCHAR(32),quantite VARCHAR(32),heurePrise VARCHAR(32),dateHeurePrise VARCHAR(32),codeClinique VARCHAR(32),numdoss VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS TraitCourbe (codePosologie VARCHAR(32),codeType VARCHAR(32),date VARCHAR(32),designation VARCHAR(32)' +
                    ',heurePrise VARCHAR(32),heureRealisation VARCHAR(32),' +
                    'numTraitement VARCHAR(32),ordre VARCHAR(32),quantite VARCHAR(32),retourn VARCHAR(32),row VARCHAR(32),numDoss VARCHAR(32),codeClinique VARCHAR(32))', {});
                db.executeSql('CREATE TABLE IF NOT EXISTS Consigne (datetache VARCHAR(255),details VARCHAR(255),etat VARCHAR(32),heurtache VARCHAR(32)' +
                    ',numeroDossier VARCHAR(32),codeMedecin VARCHAR(32),type VARCHAR(32),userCreate VARCHAR(32),codeClinique VARCHAR(32),typeget VARCHAR(32),etatget VARCHAR(32))', {});
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error opening database  ' + error);
            });
            _this.userserv = new UserService();
            _this.userserv.getAllUser().then(function (user) {
                if (user.length === 0) {
                    _this.nav.setRoot(LanguesPage);
                }
                else {
                    _this.langserv = new LangueService();
                    _this.langserv.verifLangue().then(function (res) {
                        if (res === true) {
                            _this.langserv.getLangues(_this.langes).then(function (lang) {
                                _this.codeClinique = lang.getcodeClinique();
                                _this.nomClinique = lang.getnomClinique();
                                _this.langue = lang.getlangue();
                                if (_this.langue === "arabe") {
                                    _this.tabLangue = Variables.arabe;
                                }
                                else if (_this.langue === "francais") {
                                    _this.tabLangue = Variables.francais;
                                }
                                else if (_this.langue === "anglais") {
                                    _this.tabLangue = Variables.anglais;
                                }
                                _this.nav.setRoot(ListePage, {
                                    tabLangue: _this.tabLangue,
                                    langue: _this.langue,
                                    codeClinique: _this.codeClinique,
                                    nomClinique: _this.nomClinique
                                });
                            });
                        }
                        else {
                            _this.nav.setRoot(LanguesPage);
                        }
                    });
                }
            });
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