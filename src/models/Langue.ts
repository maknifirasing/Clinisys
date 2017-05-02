export class Langue {
  private _langue: string;
  private _nom: string;
  private _codePin: string;
  private _codeClinique: string;
  private _nomClinique: string;
  private _url: string;

  constructor() {
  }

  getlangue(): string {
    return this._langue;
  }

  getnom(): string {
    return this._nom;
  }

  setnom(value: string) {
    this._nom = value;
  }

  setlangue(value: string) {
    this._langue = value;
  }

  getcodePin(): string {
    return this._codePin;
  }

  setcodePin(value: string) {
    this._codePin = value;
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }

  getnomClinique(): string {
    return this._nomClinique;
  }

  setnomClinique(value: string) {
    this._nomClinique = value;
  }

  geturl(): string {
    return this._url;
  }

  seturl(value: string) {
    this._url = value;
  }
}
