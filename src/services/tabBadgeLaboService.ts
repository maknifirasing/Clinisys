import {SQLite} from 'ionic-native';
import {tabBadge} from "../models/tabBadge";

export class tabBadgeLaboService {
  public tabBadgeLabo: Array<tabBadge> = [];
  verif: boolean;

  constructor() {
  }

  public verifTabBadgeLabo(tabBadgeLabos: any, numDoss, FichierT,FichierF,codeClinique) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      alert("g "+tabBadgeLabos[0].getnumDoss());
      db.executeSql("select * from tabBadgeLabo where numDoss like '" + numDoss + "' and LabosT like '" + FichierT + "'and LabosF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === tabBadgeLabos.length) {
            this.verif = true;
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 tabBadgeLabo  ' + error);
        })
    });
    db.close();
    return this.verif;
  }

  public getTabBadgeLabo(tabBadgeLabos: any, numDoss, FichierT,Fichier,codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from tabBadgeLabo where numDoss like '" + numDoss + "' and LabosT like '" + FichierT + "'and Labos like '" + Fichier + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._inserttabBadgeLabos(tabBadgeLabos, numDoss, FichierT,Fichier,codeClinique)
          } else {
            var t;
            for (var i = 0; i < result.rows.length; i++) {
              t = new tabBadge();
              t.setnumDoss(result.rows.item(i).numDoss);
              t.setFichierT(result.rows.item(i).FichierT);
              t.setFichierF(result.rows.item(i).FichierF);

              this.tabBadgeLabo.push(t);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 tabBadgeLabo  ' + error);
        })
    });
    db.close();
    return this.tabBadgeLabo;
  }

  private _inserttabBadgeLabos(tabBadgeLabos :Array<tabBadge>, numDoss, FichierT,Fichier,codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in tabBadgeLabos) {
        if (!tabBadgeLabos.hasOwnProperty(key)) {
          continue;
        }
        let tabBadgeLabo = tabBadgeLabos[key];
        db.executeSql('insert into tabBadgeLabos (codeClinique,numDoss,LabosT,LabosF) values (?,?,?,?)', [
          codeClinique,
          tabBadgeLabo.getnumDoss(),
          tabBadgeLabo.getFichierT(),
        //  tabBadgeLabo.getFichierF()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 tabBadgeLabo ' + error);
    });
    db.close();
  }

  public deletetabBadgeLabos(numDoss, FichierT,FichierF,codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from tabBadgeLabos where numDoss like '" + numDoss + "' and LabosT like '" + FichierT + "'and LabosF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   alert("Suppression de table Traitement est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Traitement  ' + error);
        })
    });
    db.close();
    return this.tabBadgeLabo;
  }
}
