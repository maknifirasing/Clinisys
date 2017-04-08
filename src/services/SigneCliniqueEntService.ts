import {SQLite} from 'ionic-native';
import {SigneClinique} from "../models/SigneClinique";

export class SigneCliniqueEntService {
  public signeClinique: Array<SigneClinique> = [];

  constructor() {
  }

  public verifSigneClinique(signeCliniques: any, numDoss, dateFeuille, nature, codeType, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sum from SigneCliniqueEnt where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
          + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.item(0).sum > 0) {
              resolve(true);
              return true;
            }
            else {
              resolve(false);
              return false;
            }
          })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 0 SigneCliniqueEnt  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    });
  }

  public getSigneCliniques(signeCliniques: any, numDoss, dateFeuille, nature, codeType, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from SigneCliniqueEnt where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
        + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertSigneCliniques(signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique)
          } else {
            var s;
            for (var i = 0; i < result.rows.length; i++) {
              s = new SigneClinique();
              s.setdate(result.rows.item(i).date);
              s.setdesignation(result.rows.item(i).designation);
              s.setquantite(result.rows.item(i).quantite);
              this.signeClinique.push(s);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 SigneCliniqueEnt  ' + error);
        })
    });
    db.close();
    return this.signeClinique;
  }

  private _insertSigneCliniques(signeCliniques: Array<SigneClinique>, numDoss, dateFeuille, nature, codeType, codeClinique): void {
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
        db.executeSql('insert into SigneCliniqueEnt (date ,designation ,quantite ,numDoss ,dateFeuille, nature ,codetypeof,codeClinique) values (?,?,?,?,?,?,?,?)', [
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
      alert('Error 2 SigneCliniqueEnt ' + error);
    });
    db.close();
  }

  public deleteSigneCliniques(numDoss, dateFeuille, nature, codeType, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from SigneCliniqueEnt where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //      alert("Suppression de table SigneCliniqueEnt est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 SigneCliniqueEnt  ' + error);
        })
    });
    db.close();
    return this.signeClinique;
  }
}
