import {SQLite} from 'ionic-native';
import {Traitement} from "../models/Traitement";

export class TraitementService {
  public traitement: Array<Traitement> = [];

  constructor() {
  }

  public verifTraitement(traitements: any, numDoss, datefeuille, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sum from Traitement where numDoss like '" + numDoss + "' and datefeuille like '" + datefeuille + "'and codeClinique like '" + codeClinique + "'", [])
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
            alert('Error 0 Traitement  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    });
  }

  public getTraitements(traitements: any, numDoss, datefeuille, codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Traitement where numDoss like '" + numDoss + "' and datefeuille like '" + datefeuille + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertTraitements(traitements, datefeuille, codeClinique)
          } else {
            var t;
            for (var i = 0; i < result.rows.length; i++) {
              t = new Traitement();
              t.setnumDoss(result.rows.item(i).numDoss);
              t.setdesignation(result.rows.item(i).designation);
              t.setjour(result.rows.item(i).jour);
              t.setposologie(result.rows.item(i).posologie);
              this.traitement.push(t);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Traitement  ' + error);
        })
    });
    db.close();
    return this.traitement;
  }

  private _insertTraitements(traitements: Array<Traitement>, datefeuille, codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in traitements) {
        if (!traitements.hasOwnProperty(key)) {
          continue;
        }
        let traitement = traitements[key];
        db.executeSql('insert into Traitement (numDoss,designation ,jour ,posologie ,datefeuille,codeClinique) values (?,?,?,?,?,?)', [
          traitement.getnumDoss(),
          traitement.getdesignation(),
          traitement.getjour(),
          traitement.getposologie(),
          datefeuille,
          codeClinique
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Traitement ' + error);
    });
    db.close();
  }

  public deleteTraitements(numDoss, datefeuille, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Traitement where  numDoss like '" + numDoss + "' and datefeuille like '" + datefeuille + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   alert("Suppression de table Traitement est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Traitement  ' + error);
        })
    });
    db.close();
    return this.traitement;
  }
}
