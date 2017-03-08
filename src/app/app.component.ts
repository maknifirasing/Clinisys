import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen, SQLite} from 'ionic-native';
import {HomePage} from '../pages/home/home';
import {ListePage} from "../pages/liste/liste";


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = HomePage;
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

          db.executeSql('CREATE TABLE IF NOT EXISTS SigneClinique(codeType VARCHAR(32),date VARCHAR(32),designation VARCHAR(32),' +
            'quantite VARCHAR(32),numDoss VARCHAR(32),dateFeuille VARCHAR(32),nature VARCHAR(32))', {});
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
