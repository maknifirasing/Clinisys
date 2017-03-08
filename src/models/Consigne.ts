export class Consigne{
  private _type: string;
  private _datetache: string;
  private _date: string;
  private _heurtache: string;
  private _details: string;
  private _userCreate: string;
  private _id: string;
  private _listCode: string;
  private _NumeroDossier: string;
  private _codeMedecin: string;
  private _etat: string;

  constructor() {
  }

  gettype(): string {
    return this._type;
  }

  settype(value: string) {
    this._type = value;
  }

  getdatetache(): string {
    return this._datetache;
  }

  setdatetache(value: string) {
    this._datetache = value;
  }

  getdate(): string {
    return this._date;
  }

  setdate(value: string) {
    this._date = value;
  }

  getheurtache(): string {
    return this._heurtache;
  }

  setheurtache(value: string) {
    this._heurtache = value;
  }

  getdetails(): string {
    return this._details;
  }

  setdetails(value: string) {
    this._details = value;
  }

  getuserCreate(): string {
    return this._userCreate;
  }

  setuserCreate(value: string) {
    this._userCreate = value;
  }

  getid(): string {
    return this._id;
  }

  setid(value: string) {
    this._id = value;
  }

  getlistCode(): string {
    return this._listCode;
  }

  setlistCode(value: string) {
    this._listCode = value;
  }

  getNumeroDossier(): string {
    return this._NumeroDossier;
  }

  setNumeroDossier(value: string) {
    this._NumeroDossier = value;
  }

  getcodeMedecin(): string {
    return this._codeMedecin;
  }

  setcodeMedecin(value: string) {
    this._codeMedecin = value;
  }

  getetat(): string {
    return this._etat;
  }

  setetat(value: string) {
    this._etat = value;
  }
}
