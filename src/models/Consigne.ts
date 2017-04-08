export class Consigne{
  private _type: string;
  private _datetache: string;
  private _details: string;
  private _etat: string;
  private _heurtache: string;
  private _userCreate: string;
  private _numeroDossier: string;
  private _codeMedecin: string;
    private _codeClinique: string;

  constructor() {
  }

  getnumeroDossier(): string {
    return this._numeroDossier;
  }

  setnumeroDossier(value: string) {
    this._numeroDossier = value;
  }

  getcodeMedecin(): string {
    return this._codeMedecin;
  }

  setcodeMedecin(value: string) {
    this._codeMedecin = value;
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

  getuserCreate(): string {
    return this._userCreate;
  }

  setuserCreate(value: string) {
    this._userCreate = value;
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }
}
