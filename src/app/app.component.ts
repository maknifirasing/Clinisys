import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {LanguesPage} from '../pages/langues/langues';
import {StatusBar, Splashscreen, SQLite} from 'ionic-native';
import {ListePage} from "../pages/liste/liste";
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = LanguesPage;
//  rootPage = ListePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      SQLite.openDatabase({
        name: 'clinisys.db',
        location: 'default'
      })
        .then((db: SQLite) => {

          db.executeSql('CREATE TABLE IF NOT EXISTS Users(actif NUMERIC(10),chStat NUMERIC(10),codeMedecinInfirmier VARCHAR(32),codePin NUMERIC(10),' +
            'dateModPwd VARCHAR(32),dernierDateCnx VARCHAR(32),description VARCHAR(32),grp VARCHAR(32),matricule VARCHAR (32),natureUserDS VARCHAR (32),' +
            'oldGrp VARCHAR(32),passWord VARCHAR(32),userName VARCHAR(32),validCptRend VARCHAR(32),validPHNuit VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS Patient(id VARCHAR(32),dossier VARCHAR(32),chambre VARCHAR(32),nom VARCHAR(32),' +
            'prenom VARCHAR(32),dateNaiss VARCHAR(32),medecin VARCHAR(32),spec VARCHAR(32),etat VARCHAR (32),age NUMERIC(10),' +
            'img VARCHAR(32),nature VARCHAR(32),user VARCHAR(32),searchText VARCHAR(32),etage VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS DateFeuille(datefeuille VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS Traitement(codePosologie VARCHAR(32),date VARCHAR(32),dateFinTrait VARCHAR(32),' +
            'dci VARCHAR(32),designation VARCHAR(32),dureEnJour NUMERIC(10),heure VARCHAR(32),heureDebut VARCHAR(32),jour NUMERIC(10),nbFois NUMERIC(10),' +
            'numDoss VARCHAR(32),numTraitement VARCHAR(32),numbon VARCHAR(32),posologie VARCHAR(32),prescripteur VARCHAR(32),quantite VARCHAR(32),' +
            'unite VARCHAR(32),vitesse VARCHAR(32),voie VARCHAR(32),volume VARCHAR(32),datefeuille VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueAlert(codeType VARCHAR(32),date VARCHAR(32),designation VARCHAR(32),' +
            'quantite VARCHAR(32),numDoss VARCHAR(32),dateFeuille VARCHAR(32),nature VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueEnt(codeType VARCHAR(32),date VARCHAR(32),designation VARCHAR(32),' +
            'quantite VARCHAR(32),numDoss VARCHAR(32),dateFeuille VARCHAR(32),nature VARCHAR(32),codetypeof VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueSig(codeType VARCHAR(32),date VARCHAR(32),designation VARCHAR(32),' +
            'quantite VARCHAR(32),numDoss VARCHAR(32),dateFeuille VARCHAR(32),nature VARCHAR(32),codetypeof VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS SigneCliniqueSor(codeType VARCHAR(32),date VARCHAR(32),designation VARCHAR(32),' +
            'quantite VARCHAR(32),numDoss VARCHAR(32),dateFeuille VARCHAR(32),nature VARCHAR(32),codetypeof VARCHAR(32))', {});


          db.executeSql('CREATE TABLE IF NOT EXISTS Alegc(idpass VARCHAR(32),ch VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS Antech(idpass VARCHAR(32),ch VARCHAR(32))', {});

          /*
           db.executeSql('CREATE TABLE IF NOT EXISTS Aleg(idpass VARCHAR(32),codeAntecedent VARCHAR(32),codeFamille VARCHAR(32),designation VARCHAR(32),' +
           'idDetailAntec VARCHAR(32),ordre VARCHAR(32),visiblePreAnes VARCHAR(32),id VARCHAR(32),identifiant VARCHAR(32),numeroDossier VARCHAR(32),observation VARCHAR(32),utilisateurAnt VARCHAR(32))', {});

           db.executeSql('CREATE TABLE IF NOT EXISTS Antec(idpass VARCHAR(32),codeAntecedent VARCHAR(32),codeFamille VARCHAR(32),designation VARCHAR(32),' +
           'idDetailAntec VARCHAR(32),ordre VARCHAR(32),visiblePreAnes VARCHAR(32),id VARCHAR(32),identifiant VARCHAR(32),numeroDossier VARCHAR(32),observation VARCHAR(32),utilisateurAnt VARCHAR(32))', {});
           */

          db.executeSql('CREATE TABLE IF NOT EXISTS Consigne(type VARCHAR(32),datetache VARCHAR(32),date VARCHAR(32),' +
            'heurtache VARCHAR(32),details VARCHAR(32),userCreate VARCHAR(32),id VARCHAR(32),listCode VARCHAR(32),NumeroDossier VARCHAR(32),codeMedecin VARCHAR(32),etat VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS motifHospitalisation(conclusion VARCHAR(32),dateRdv VARCHAR(32),dateSortie VARCHAR(32)' +
            ',groupeSang VARCHAR(32),heureRdv VARCHAR(32),heureSortie VARCHAR(32),histoiremaladie VARCHAR(32),motifhospitalisation VARCHAR(32),' +
            'numdoss VARCHAR(32),observationSejour VARCHAR(32),poid VARCHAR(32),taille VARCHAR(32),traitementHabituelle VARCHAR(32),' +
            'traitementSejour VARCHAR(32),traitementSortie VARCHAR(32),utilisateurMotif VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS EvenementCon(access NUMERIC(10),code VARCHAR(32),evenements VARCHAR(32)' +
            ',orderEvenement NUMERIC(10),visible VARCHAR(32),date VARCHAR(32),detail VARCHAR(32),IDEvenement NUMERIC(10),numdoss VARCHAR(32),userCreat VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS EvenementEvo(access NUMERIC(10),code VARCHAR(32),evenements VARCHAR(32)' +
            ',orderEvenement NUMERIC(10),visible VARCHAR(32),date VARCHAR(32),detail VARCHAR(32),IDEvenement NUMERIC(10),numdoss VARCHAR(32),userCreat VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS EvenementExa(access NUMERIC(10),code VARCHAR(32),evenements VARCHAR(32)' +
            ',orderEvenement NUMERIC(10),visible VARCHAR(32),date VARCHAR(32),detail VARCHAR(32),IDEvenement NUMERIC(10),numdoss VARCHAR(32),userCreat VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS EvenementHis(access NUMERIC(10),code VARCHAR(32),evenements VARCHAR(32)' +
            ',orderEvenement NUMERIC(10),visible VARCHAR(32),date VARCHAR(32),detail VARCHAR(32),IDEvenement NUMERIC(10),numdoss VARCHAR(32),userCreat VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS Rigime(codeRegime NUMERIC(10),designation VARCHAR(32),numdoss VARCHAR(32)' +
            ',datefeuille NUMERIC(10),nature VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS ExamenRadio(codeExamen VARCHAR(32),compterendu VARCHAR(32),dateExamen VARCHAR(32)' +
            'datePrevu VARCHAR(32),date_RDV VARCHAR(32),designationExamen VARCHAR(32),heurePrevu VARCHAR(32),idres VARCHAR(32),' +
            'medecin VARCHAR(32),nature VARCHAR(32),numeroDossier VARCHAR(32),numeroExamen VARCHAR(32),observ VARCHAR(32),resultat VARCHAR(32))', {});

          db.executeSql('CREATE TABLE IF NOT EXISTS Labo(codeDemande VARCHAR(32),contenuePDF VARCHAR(32),dateDemande VARCHAR(32)' +
            ',dateRealisation VARCHAR(32), designation VARCHAR(32),etatExamen NUMERIC(10),id NUMERIC(10),medecinTraitant VARCHAR(32),' +
            'nomLabo VARCHAR(32),numAdmission VARCHAR(32),numDossier VARCHAR(32),patient VARCHAR(32),state VARCHAR(32),userName VARCHAR(32),' +
            'validation VARCHAR(32))', {});

        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error opening database  ' + error);
        });

      StatusBar.styleDefault();
      Splashscreen.hide();
    });

  }
}
