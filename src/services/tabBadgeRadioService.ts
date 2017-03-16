import {SQLite} from 'ionic-native';
import {tabBadge} from "../models/tabBadge";

export class tabBadgeRadioService {
  public tabBadgeRadio: Array<tabBadge> = [];
  verif: boolean;

  constructor() {
  }

  public verifTabBadgeRadio(tabBadgeRadios: any, numDoss, FichierT,FichierF,codeClinique) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      alert("g "+tabBadgeRadios[0].getnumDoss());
      db.executeSql("select * from tabBadgeRadio where numDoss like '" + numDoss + "' and RadioT like '" + FichierT + "'and RadioF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === tabBadgeRadios.length) {
            this.verif = true;
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 tabBadgeRadio  ' + error);
        })
    });
    db.close();
    return this.verif;
  }

  public getTabBadgeRadio(tabBadgeRadios: any, numDoss, FichierT,FichierF,codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from tabBadgeRadio where numDoss like '" + numDoss + "' and RadioT like '" + FichierT + "'and RadioF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._inserttabBadgeRadios(tabBadgeRadios, numDoss, FichierT,FichierF,codeClinique)
          } else {
            var t;
            for (var i = 0; i < result.rows.length; i++) {
              t = new tabBadge();
              t.setnumDoss(result.rows.item(i).numDoss);
              t.setFichierT(result.rows.item(i).FichierT);
              t.setFichierF(result.rows.item(i).FichierF);

              this.tabBadgeRadio.push(t);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 tabBadgeRadio  ' + error);
        })
    });
    db.close();
    return this.tabBadgeRadio;
  }

  private _inserttabBadgeRadios(tabBadgeRadios :Array<tabBadge>, numDoss, FichierT,FichierF,codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in tabBadgeRadios) {
        if (!tabBadgeRadios.hasOwnProperty(key)) {
          continue;
        }
        let tabBadgeRadio = tabBadgeRadios[key];
        db.executeSql('insert into tabBadgeRadios (codeClinique,numDoss,RadioT,RadioF) values (?,?,?,?)', [
          codeClinique,
          tabBadgeRadio.getnumDoss(),
          tabBadgeRadio.getFichierT(),
      //    tabBadgeRadio.getFichierF()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 tabBadgeRadio ' + error);
    });
    db.close();
  }

  public deletetabBadgeRadios(numDoss, FichierT,FichierF,codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from tabBadgeRadios where numDoss like '" + numDoss + "' and RadioT like '" + FichierT + "'and RadioF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   alert("Suppression de table Traitement est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Traitement  ' + error);
        })
    });
    db.close();
    return this.tabBadgeRadio;
  }
}
