import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {tabBadge} from "../models/tabBadge";

export class tabBadgeActeService {
  public tabBadgeActe: Array<tabBadge> = [];
  verif: boolean;

  private sqlite: SQLite;

  constructor() {
  }

  public verifTabBadgeActe(tabBadgeActes: any, numDoss, FichierT, FichierF, codeClinique) {
    this.verif = false;

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
       //alert("g " + tabBadgeActes[0].getnumDoss());
      db.executeSql("select * from tabBadgeActe where numDoss like '" + numDoss + "' and ActeT like '" + FichierT + "'and ActeF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === tabBadgeActes.length) {
            this.verif = true;
          }
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 0 tabBadgeActe  ' + error);
        })
    });

    return this.verif;
  }

  public getTabBadgeActe(tabBadgeActes: any, numDoss, FichierT, FichierF, codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("select * from tabBadgeActe where numDoss like '" + numDoss + "' and ActeT like '" + FichierT + "'and ActeF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._inserttabBadgeActes(tabBadgeActes, numDoss, FichierT, FichierF, codeClinique)
          } else {
            var t;
            for (var i = 0; i < result.rows.length; i++) {
              t = new tabBadge();
              t.setnumDoss(result.rows.item(i).numDoss);
              t.setFichierT(result.rows.item(i).FichierT);
              t.setFichierF(result.rows.item(i).FichierF);

              this.tabBadgeActe.push(t);
            }
          }
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 1 tabBadgeActe  ' + error);
        })
    });

    return this.tabBadgeActe;
  }

  private _inserttabBadgeActes(tabBadgeActes: Array<tabBadge>, numDoss, FichierT, FichierF, codeClinique): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in tabBadgeActes) {
        if (!tabBadgeActes.hasOwnProperty(key)) {
          continue;
        }
        let tabBadgeActe = tabBadgeActes[key];
        db.executeSql('insert into tabBadgeActes (codeClinique,numDoss,ActeT,ActeF) values (?,?,?,?)', [
          codeClinique,
          tabBadgeActe.getnumDoss(),
          tabBadgeActe.getFichierT(),
          //  tabBadgeActe.getFichierF()
        ]);
      }
    }).catch(error => {
      //console.error('Error opening database', error);
       //alert('Error 2 tabBadgeActe ' + error);
    });

  }

  public deletetabBadgeActes(numDoss, FichierT, FichierF, codeClinique) {


    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from tabBadgeActes where numDoss like '" + numDoss + "' and ActeT like '" + FichierT + "'and ActeF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //    //alert("Suppression de table Traitement est terminé avec succes");
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 1 Traitement  ' + error);
        })
    });

    return this.tabBadgeActe;
  }
}
