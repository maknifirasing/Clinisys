export class Document {
  private _accessUsersGrp: string;
  private _arborescenceID: string;
  private _IDArborPere: string;
  private _nomarborescence: string;
  private _datedoc: string;
  private _description: string;
  private _doc: string;
  private _docID: string;
  private _extension: string;
  private _nomdoc: string;
  private _users: string;

  constructor() {
  }

  getaccessUsersGrp(): string {
    return this._accessUsersGrp;
  }

  setaccessUsersGrp(value: string) {
    this._accessUsersGrp = value;
  }

  getarborescenceID(): string {
    return this._arborescenceID;
  }

  setarborescenceID(value: string) {
    this._arborescenceID = value;
  }

  getIDArborPere(): string {
    return this._IDArborPere;
  }

  setIDArborPere(value: string) {
    this._IDArborPere = value;
  }

  getnomarborescence(): string {
    return this._nomarborescence;
  }

  setnomarborescence(value: string) {
    this._nomarborescence = value;
  }

  getdatedoc(): string {
    return this._datedoc;
  }

  setdatedoc(value: string) {
    this._datedoc = value;
  }

  getdescription(): string {
    return this._description;
  }

  setdescription(value: string) {
    this._description = value;
  }

  getdoc(): string {
    return this._doc;
  }

  setdoc(value: string) {
    this._doc = value;
  }

  getdocID(): string {
    return this._docID;
  }

  setdocID(value: string) {
    this._docID = value;
  }

  getextension(): string {
    return this._extension;
  }

  setextension(value: string) {
    this._extension = value;
  }

  getnomdoc(): string {
    return this._nomdoc;
  }

  setnomdoc(value: string) {
    this._nomdoc = value;
  }

  getusers(): string {
    return this._users;
  }

  setusers(value: string) {
    this._users = value;
  }
}
