import {SQLite} from 'ionic-native';
import {SigneClinique} from "../models/SigneClinique";

export class SigneCliniqueAlertService {
  public signeClinique: Array<SigneClinique> = [];

  constructor() {
  }

  public verifSigneCliniqueAlert(signeCliniques: any, numDoss, dateFeuille, nature) {
    var verif: boolean;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from SigneCliniqueAlert where numDoss like '"+ numDoss +"' and dateFeuille like '"+ dateFeuille
        +"' and nature like '"+ nature+"'", [])
        .then(result => {
          verif = (result.rows.length === signeCliniques.length);
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 SigneCliniqueAlert  ' + error);
        })
    });
    db.close();
    return verif;
  }

  public getSigneCliniquesAlert(signeCliniques: any, numDoss, dateFeuille, nature) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from SigneCliniqueAlert where numDoss like '"+ numDoss +"' and dateFeuille like '"+ dateFeuille
        +"' and nature like '"+ nature+"'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertSigneCliniquesAlert(signeCliniques, numDoss, dateFeuille, nature)
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
          alert('Error 1 SigneCliniqueAlert  ' + error);
        })
    });
    db.close();
    return this.signeClinique;
  }

  private _insertSigneCliniquesAlert(signeCliniques: Array<SigneClinique>, numDoss, dateFeuille, nature): void {
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
        db.executeSql('insert into SigneCliniqueAlert (codeType ,date ,designation ,quantite ,numDoss ,dateFeuille ,nature) values (?,?,?,?,?,?,?)', [
          s.getcodeType(),
          s.getdate(),
          s.getdesignation(),
          s.getquantite(),
          numDoss,
          dateFeuille,
          nature
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 SigneCliniqueAlert ' + error);
    });
    db.close();
  }

   public deleteSigneCliniquesAlert(numDoss, dateFeuille, nature) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from SigneCliniqueAlert where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille + "' and nature like '" + nature + "'", [])
        .then(() => {
          alert("Suppression de table SigneCliniqueAlert est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 SigneCliniqueAlert  ' + error);
        })
    });
    db.close();
    return this.signeClinique;
  }
}