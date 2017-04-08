import {SQLite} from 'ionic-native';
import {Consigne} from "../models/Consigne";

export class ConsigneService {
  public consigne: Array<Consigne> = [];

  constructor() {
  }

  public verifConsigne(consignes: any, numeroDossier, codeClinique, typeget, etatget): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sum from Consigne where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'and typeget like '" + typeget + "'and etatget like '" + etatget + "'", [])
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
            alert('Error 0 Consigne  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    });
  }

  public getConsignes(consignes: any, numeroDossier, codeClinique, typeget, etatget) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Consigne where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'and typeget like '" + typeget + "'and etatget like '" + etatget + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertConsignes(consignes,typeget,etatget)
          } else {
            var consigne;
            for (var i = 0; i < result.rows.length; i++) {
              consigne = new Consigne();
              consigne.setdatetache(result.rows.item(i).datetache);
              consigne.setdetails(result.rows.item(i).details);
              consigne.setetat(result.rows.item(i).etat);
              consigne.setheurtache(result.rows.item(i).heurtache);
              consigne.setnumeroDossier(result.rows.item(i).numeroDossier);
              consigne.setcodeMedecin(result.rows.item(i).codeMedecin);
              consigne.settype(result.rows.item(i).type);
              consigne.setuserCreate(result.rows.item(i).userCreate);
              this.consigne.push(consigne);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Consigne  ' + error);
        })
    });
    db.close();
    return this.consigne;
  }

  private _insertConsignes(consignes: Array<Consigne>,typeget,etatget): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in consignes) {
        if (!consignes.hasOwnProperty(key)) {
          continue;
        }
        let consigne = consignes[key];
        db.executeSql('insert into Consigne (datetache ,details ,etat ,heurtache,numeroDossier,codeMedecin ,type ,userCreate ,codeClinique,typeget ,etatget) values (?,?,?,?,?,?,?,?,?,?)', [
          consigne.getdatetache(),
          consigne.getdetails(),
          consigne.getetat(),
          consigne.getheurtache(),
          consigne.getnumeroDossier(),
          consigne.getcodeMedecin(),
          consigne.gettype(),
          consigne.getuserCreate(),
          consigne.getcodeClinique(),
		      typeget,
          etatget
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Consigne ' + error);
    });
    db.close();
  }

  public deleteConsignes(numeroDossier, codeClinique, typeget, etatget) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Consigne where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'and typeget like '" + typeget + "'and etatget like '" + etatget + "'", [])
        .then(() => {
          //   alert("Suppression de table Traitement est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Consigne  ' + error);
        })
    });
    db.close();
    return this.consigne;
  }
}
