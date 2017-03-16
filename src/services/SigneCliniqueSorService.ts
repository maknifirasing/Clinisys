import {SQLite} from 'ionic-native';
import {SigneClinique} from "../models/SigneClinique";

export class SigneCliniqueSorService {
  public signeClinique: Array<SigneClinique> = [];

  constructor() {
  }

  public verifSigneClinique(signeCliniques: any, numDoss, dateFeuille, nature, codeType, codeClinique) {
    var verif: boolean;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from SigneCliniqueSor where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
        +"' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          verif = (result.rows.length === signeCliniques.length);
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 SigneCliniqueSor  ' + error);
        })
    });
    db.close();
    return verif;
  }

  public getSigneCliniques(signeCliniques: any, numDoss, dateFeuille, nature, codeType, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from SigneCliniqueSor where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
        +"' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertSigneCliniques(signeCliniques, numDoss, dateFeuille, nature,codeType, codeClinique)
          } else {
            var s;
            for (var i = 0; i < result.rows.length; i++) {
              s = new SigneClinique();
              s.setcodeType(result.rows.item(i).codeType);
              s.setdate(result.rows.item(i).date);
              s.setdesignation(result.rows.item(i).designation);
              s.setquantite(result.rows.item(i).quantite);
              this.signeClinique.push(s);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 SigneCliniqueSor  ' + error);
        })
    });
    db.close();
    return this.signeClinique;
  }

  private _insertSigneCliniques(signeCliniques: Array<SigneClinique>, numDoss, dateFeuille, nature,codeType, codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in signeCliniques) {
        if (!signeCliniques.hasOwnProperty(key)) {
          continue;
        }
        let s = signeCliniques[key];
        db.executeSql('insert into SigneCliniqueSor (codeType ,date ,designation ,quantite ,numDoss ,dateFeuille, nature ,codetypeof, codeClinique) values (?,?,?,?,?,?,?,?,?)', [
          s.getcodeType(),
          s.getdate(),
          s.getdesignation(),
          s.getquantite(),
          numDoss,
          dateFeuille,
          nature,
          codeType,
          codeClinique
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 SigneCliniqueSor ' + error);
    });
    db.close();
  }

  public deleteSigneCliniques(numDoss, dateFeuille, nature, codeType, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from SigneCliniqueSor where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
      //    alert("Suppression de table SigneCliniqueSor est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 SigneCliniqueSor  ' + error);
        })
    });
    db.close();
    return this.signeClinique;
  }
}
