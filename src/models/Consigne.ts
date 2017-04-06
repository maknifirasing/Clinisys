export class Consigne{
  private _codeExamen: string;
  private _codeMedecin: string;
  private _codeinf: string;
  private _date: string;
  private _dateDelete: string;
  private _dateRealisation: string;
  private _datetache: string;
  private _details: string;
  private _etat: string;
  private _heurtache: string;
  private _id: string;
  private _listCode: string;
  private _nomMed: string;
  private _numeroDossier: string;
  private _observation: string;
  private _type: string;
  private _userCreate: string;
  private _userDelete: string;
  private _userRealise: string;
  private _codeClinique: string;
  private _typeget: string;
  private _etatget: string;

  constructor() {
  }

  getcodeExamen(): string {
    return this._codeExamen;
  }

  setcodeExamen(value: string) {
    this._codeExamen = value;
  }

  getcodeMedecin(): string {
    return this._codeMedecin;
  }

  setcodeMedecin(value: string) {
    this._codeMedecin = value;
  }

  getcodeinf(): string {
    return this._codeinf;
  }

  setcodeinf(value: string) {
    this._codeinf = value;
  }

  getdate(): string {
    return this._date;
  }

  setdate(value: string) {
    this._date = value;
  }

  getdateDelete(): string {
    return this._dateDelete;
  }

  setdateDelete(value: string) {
    this._dateDelete = value;
  }

  getdateRealisation(): string {
    return this._dateRealisation;
  }

  setdateRealisation(value: string) {
    this._dateRealisation = value;
  }

  getdatetache(): string {
    return this._datetache;
  }

  setdatetache(value: string) {
    this._datetache = value;
  }

  getdetails(): string {
    return this._details;
  }

  setdetails(value: string) {
    this._details = value;
  }

  getetat(): string {
    return this._etat;
  }

  setetat(value: string) {
    this._etat = value;
  }

  getheurtache(): string {
    return this._heurtache;
  }

  setheurtache(value: string) {
    this._heurtache = value;
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

  getnomMed(): string {
    return this._nomMed;
  }

  setnomMed(value: string) {
    this._nomMed = value;
  }

  getnumeroDossier(): string {
    return this._numeroDossier;
  }

  setnumeroDossier(value: string) {
    this._numeroDossier = value;
  }

  getobservation(): string {
    return this._observation;
  }

  setobservation(value: string) {
    this._observation = value;
  }

  gettype(): string {
    return this._type;
  }

  settype(value: string) {
    this._type = value;
  }

  getuserCreate(): string {
    return this._userCreate;
  }

  setuserCreate(value: string) {
    this._userCreate = value;
  }

  getuserDelete(): string {
    return this._userDelete;
  }

  setuserDelete(value: string) {
    this._userDelete = value;
  }

  getuserRealise(): string {
    return this._userRealise;
  }

  setuserRealise(value: string) {
    this._userRealise = value;
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }

  gettypeget(): string {
    return this._typeget;
  }

  settypeget(value: string) {
    this._typeget = value;
  }

  getetatget(): string {
    return this._etatget;
  }

  setetatget(value: string) {
    this._etatget = value;
  }
}
