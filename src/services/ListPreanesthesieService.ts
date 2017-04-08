import {SQLite} from 'ionic-native';
import {ListPreanesthesie} from "../models/ListPreanesthesie";

export class ListPreanesthesieService {
  public listPreanesthesie: Array<ListPreanesthesie> = [];

  constructor() {
  }

  public verifListPreanesthesie(ListPreanesthesies: any, numeroDossier, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sum  from ListPreanesthesie where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
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
            alert('Error 0 listPreanesthesie  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    })
  }

  public getListPreanesthesies(ListPreanesthesies: any, numeroDossier, codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from ListPreanesthesie where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertListPreanesthesies(ListPreanesthesies, codeClinique);
          } else {
            var lp;
            for (var i = 0; i < result.rows.length; i++) {
              lp = new ListPreanesthesie();
              lp.setacte(result.rows.item(i).acte);
              lp.setchirurgien(result.rows.item(i).chirurgien);
              lp.setdateacte(result.rows.item(i).dateacte);
              lp.setheureDebut(result.rows.item(i).heureDebut);
              lp.setheureFin(result.rows.item(i).heureFin);
              lp.setkc(result.rows.item(i).kc);
              lp.setnumeroDossier(result.rows.item(i).numeroDossier);
              this.listPreanesthesie.push(lp);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 listPreanesthesie  ' + error);
        })
    });
    db.close();
    return this.listPreanesthesie;
  }

  private _insertListPreanesthesies(ListPreanesthesies: Array<ListPreanesthesie>, codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in ListPreanesthesies) {
        if (!ListPreanesthesies.hasOwnProperty(key)) {
          continue;
        }
        let listPreanesthesie = ListPreanesthesies[key];
        db.executeSql('insert into ListPreanesthesie (acte ,chirurgien ,dateacte,heureDebut,heureFin,kc,numeroDossier,codeClinique) values (?,?,?,?,?,?,?,?)', [
          listPreanesthesie.getacte(),
          listPreanesthesie.getchirurgien(),
          listPreanesthesie.getdateacte(),
          listPreanesthesie.getheureDebut(),
          listPreanesthesie.getheureFin(),
          listPreanesthesie.getkc(),
          listPreanesthesie.getnumeroDossier(),
          codeClinique
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 listPreanesthesie ' + error);
    });
    db.close();
  }

  public deleteListPreanesthesies(numeroDossier, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from ListPreanesthesie where numeroDossier like '" + numeroDossier + "' and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //    alert("Suppression de table Aleg est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 ListPreanesthesie  ' + error);
        })
    });
    db.close();
    return this.listPreanesthesie;
  }
}
