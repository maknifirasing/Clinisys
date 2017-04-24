import { Document } from "../models/Document";
var DocumentService = (function () {
    function DocumentService(sqlite) {
        this.sqlite = sqlite;
        this.document = [];
    }
    DocumentService.prototype.verifDocument = function (documents, observ, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sums from Document where observ like '" + observ + "'and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.item(0).sum > 0) {
                        resolve(true);
                        return true;
                    }
                    else {
                        resolve(false);
                        return false;
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 0 Document  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    DocumentService.prototype.getDocuments = function (documents, observ, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select * from Document where observ like '" + observ + "'and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertDocuments(documents);
                        resolve(documents[0]);
                    }
                    else {
                        var doc;
                        for (var i = 0; i < result.rows.length; i++) {
                            doc = new Document();
                            doc.seturl(result.rows.item(i).url);
                            doc.setobserv(result.rows.item(i).observ);
                            doc.setcodeClinique(result.rows.item(i).codeClinique);
                            _this.document.push(doc);
                            resolve(_this.document[0]);
                        }
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 1 Document  ' + error);
                });
            });
            return _this;
        });
    };
    DocumentService.prototype._insertDocuments = function (documents) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in documents) {
                if (!documents.hasOwnProperty(key)) {
                    continue;
                }
                var document_1 = documents[key];
                db.executeSql('insert into Document (url ,observ ,codeClinique) values (?,?,?)', [
                    document_1.geturl(),
                    document_1.getobserv(),
                    document_1.getcodeClinique()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 Document ' + error);
        });
    };
    DocumentService.prototype.deleteDocuments = function (observ, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from Document where observ like '" + observ + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //  alert("Suppression de table Patient est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Patient  ' + error);
            });
        });
        return this.document;
    };
    return DocumentService;
}());
export { DocumentService };
//# sourceMappingURL=DocumentService.js.map