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
              lp.setcodeActe(result.rows.item(i).codeActe);
              lp.setcodeExamen(result.rows.item(i).codeExamen);
              lp.setcodeMedecinReanimateur(result.rows.item(i).codeMedecinReanimateur);
              lp.setcodeMedecinchirurgi(result.rows.item(i).codeMedecinchirurgi);
              lp.setcodeMedecinchirurgien(result.rows.item(i).codeMedecinchirurgien);
              lp.setcodePostop(result.rows.item(i).codePostop);
              lp.setdateacte(result.rows.item(i).dateacte);
              lp.setdatedemande(result.rows.item(i).datedemande);
              lp.setetatReservationBloc(result.rows.item(i).etatReservationBloc);
              lp.sethasAnesth(result.rows.item(i).hasAnesth);
              lp.sethasPost(result.rows.item(i).hasPost);
              lp.sethasPre(result.rows.item(i).hasPre);
              lp.setheureDebut(result.rows.item(i).heureDebut);
              lp.setheureFin(result.rows.item(i).heureFin);
              lp.setid(result.rows.item(i).id);
              lp.setidentifiant(result.rows.item(i).identifiant);
              lp.setkc(result.rows.item(i).kc);
              lp.setnom(result.rows.item(i).nom);
              lp.setnomReanimateur(result.rows.item(i).nomReanimateur);
              lp.setnumeroDossier(result.rows.item(i).numeroDossier);
              lp.setprenom(result.rows.item(i).prenom);
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
        db.executeSql('insert into ListPreanesthesie (acte ,chirurgien ,codeActe ,codeExamen,codeMedecinReanimateur,' +
          'codeMedecinchirurgi,codeMedecinchirurgien,codePostop,dateacte,datedemande,etatReservationBloc,' +
          'hasAnesth,hasPost,hasPre,heureDebut,heureFin,id,identifiant,kc,nom,nomReanimateur' +
          ',prenom,numeroDossier,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
          listPreanesthesie.getacte(),
          listPreanesthesie.getchirurgien(),
          listPreanesthesie.getcodeActe(),
          listPreanesthesie.getcodeExamen(),
          listPreanesthesie.getcodeMedecinReanimateur(),
          listPreanesthesie.getcodeMedecinchirurgi(),
          listPreanesthesie.getcodeMedecinchirurgien(),
          listPreanesthesie.getcodePostop(),
          listPreanesthesie.getdateacte(),
          listPreanesthesie.getdatedemande(),
          listPreanesthesie.getetatReservationBloc(),
          listPreanesthesie.gethasAnesth(),
          listPreanesthesie.gethasPost(),
          listPreanesthesie.gethasPre(),
          listPreanesthesie.getheureDebut(),
          listPreanesthesie.getheureFin(),
          listPreanesthesie.getid(),
          listPreanesthesie.getidentifiant(),
          listPreanesthesie.getkc(),
          listPreanesthesie.getnom(),
          listPreanesthesie.getnomReanimateur(),
          listPreanesthesie.getprenom(),
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
