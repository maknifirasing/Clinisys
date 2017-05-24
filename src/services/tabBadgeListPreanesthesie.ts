import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {tabBadge} from "../models/tabBadge";

export class tabBadgeListPreanesthesie {
  public tabBadgeList: Array<tabBadge> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifTabBadgeList(numDoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from tabBadgeListPreanesthesie where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
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
             //alert('Error 0 tabBadgeListPreanesthesie  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

  public getTabBadgeList(tabBadgeLists: any, numDoss, codeClinique): Promise<tabBadge> {
    return new Promise<tabBadge>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from tabBadgeListPreanesthesie where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._inserttabBadgeLists(tabBadgeLists)
            } else {
              var t;
              for (var i = 0; i < result.rows.length; i++) {
                t = new tabBadge();
                t.setcodeClinique(result.rows.item(i).codeClinique);
                t.setnumDoss(result.rows.item(i).numDoss);
                t.setFichierT(0);
                t.setFichier(result.rows.item(i).ListPreanesthesie);
                this.tabBadgeList.push(t);
              }
              resolve(this.tabBadgeList[0]);
            }
          })
          .catch(error => {
            //console.error('Error opening database', error);
             //alert('Error 1 tabBadgeListPreanesthesie  ' + error);
          })
      });

      return this;
    });
  }

  private _inserttabBadgeLists(tabBadgeLists: Array<tabBadge>): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in tabBadgeLists) {
        if (!tabBadgeLists.hasOwnProperty(key)) {
          continue;
        }
        let tabBadgeList = tabBadgeLists[key];
        db.executeSql('insert into tabBadgeListPreanesthesie (codeClinique,numDoss,ListPreanesthesie) values (?,?,?)', [
          tabBadgeList.getcodeClinique(),
          tabBadgeList.getnumDoss(),
          tabBadgeList.getFichier()
        ]);
      }
    }).catch(error => {
      //console.error('Error opening database', error);
       //alert('Error 2 tabBadgeListPreanesthesie ' + error);
    });

  }

  public deletetabBadgeLists(numDoss, codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from tabBadgeListPreanesthesie where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //    //alert("Suppression de table Traitement est terminé avec succes");
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 3 tabBadgeListPreanesthesie  ' + error);
        })
    });

    return this.tabBadgeList;
  }
}
