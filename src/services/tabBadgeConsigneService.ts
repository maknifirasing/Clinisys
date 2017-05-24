import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {tabBadge} from "../models/tabBadge";

export class tabBadgeConsigneService {
  public tabBadgeConsigne: Array<tabBadge> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifTabBadgeConsigne(numDoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from tabBadgeConsigne where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
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
            //console.error('Error opening database', error);
             //alert('Error 0 tabBadgeConsigne  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

  public getTabBadgeConsigne(tabBadgeConsignes: any, numDoss, codeClinique): Promise<tabBadge> {
    return new Promise<tabBadge>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from tabBadgeConsigne where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._inserttabBadgeConsignes(tabBadgeConsignes)
            } else {
              var t;
              for (var i = 0; i < result.rows.length; i++) {
                t = new tabBadge();
                t.setcodeClinique(result.rows.item(i).codeClinique);
                t.setnumDoss(result.rows.item(i).numDoss);
                t.setFichierT(result.rows.item(i).consigneT);
                t.setFichier(result.rows.item(i).consignes);
                this.tabBadgeConsigne.push(t);
              }
              resolve(this.tabBadgeConsigne[0]);
            }
          })
          .catch(error => {
            //console.error('Error opening database', error);
             //alert('Error 1 tabBadgeConsigne  ' + error);
          })
      });

      return this;
    });
  }

  private _inserttabBadgeConsignes(tabBadgeConsignes: Array<tabBadge>): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in tabBadgeConsignes) {
        if (!tabBadgeConsignes.hasOwnProperty(key)) {
          continue;
        }
        let tabBadgeConsigne = tabBadgeConsignes[key];
        db.executeSql('insert into tabBadgeConsigne (codeClinique,numDoss,consigneT,consignes) values (?,?,?,?)', [
          tabBadgeConsigne.getcodeClinique(),
          tabBadgeConsigne.getnumDoss(),
          tabBadgeConsigne.getFichierT(),
          tabBadgeConsigne.getFichier()
        ]);
      }
    }).catch(error => {
      //console.error('Error opening database', error);
       //alert('Error 2 tabBadgeConsigne ' + error);
    });

  }

  public deletetabBadgeConsignes(numDoss, codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from tabBadgeConsigne where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //    //alert("Suppression de table Traitement est terminé avec succes");
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 3 tabBadgeConsignes  ' + error);
        })
    });

    return this.tabBadgeConsigne;
  }
}
