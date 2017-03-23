import {SQLite} from 'ionic-native';
import {Document} from "../models/Document";

export class DocumentService {
  public document: Array<Document> = [];

  constructor() {
  }

  public  verifDocument(documents: any, observ): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sums from Document where observ like '" + observ + "'", [])
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
            alert('Error 0 Document  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    });
  }

  public getDocuments(documents: any,observ) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Document where observ like '" + observ + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertDocuments(documents, observ)
          } else {
            var doc;
            for (var i = 0; i < result.rows.length; i++) {
              doc = new Document();
              doc.setaccessUsersGrp(result.rows.item(i).accessUsersGrp);
              doc.setarborescenceID(result.rows.item(i).arborescenceID);
              doc.setIDArborPere(result.rows.item(i).IDArborPere);
              doc.setnomarborescence(result.rows.item(i).nomarborescence);
              doc.setdatedoc(result.rows.item(i).datedoc);
              doc.setdescription(result.rows.item(i).description);
              doc.setdoc(result.rows.item(i).doc);
              doc.setdocID(result.rows.item(i).docID);
              doc.setextension(result.rows.item(i).extension);
              doc.setnomdoc(result.rows.item(i).nomdoc);
              doc.setusers(result.rows.item(i).users);

              this.document.push(doc);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Document  ' + error);
        })
    });
    db.close();
    return this.document;
  }

  private _insertDocuments(documents: Array<Document>, observ): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in documents) {
        if (!documents.hasOwnProperty(key)) {
          continue;
        }
        let document = documents[key];
        db.executeSql('insert into Document (accessUsersGrp ,arborescenceID ,IDArborPere ,nomarborescence ,datedoc' +
          ' ,description, doc, docID, extension, nomdoc, users, observ) values (?,?,?,?,?,?,?,?,?,?,?,?)', [
          document.getaccessUsersGrp(),
        document.getarborescenceID(),
        document.getIDArborPere(),
        document.getnomarborescence(),
        document.getdatedoc(),
        document.getdescription(),
        document.getdoc(),
        document.getdocID(),
        document.getextension(),
        document.getnomdoc(),
        document.getusers(),
          observ
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Document ' + error);
    });
    db.close();
  }


  public deleteDocuments(observ) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Document where observ like '" + observ + "'", [])
        .then(() => {
          //  alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Patient  ' + error);
        })
    });
    db.close();
    return this.document;
  }
}
