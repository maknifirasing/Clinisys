export class Pharmacie {
  private _CodeDep: string;
  private _Libelle: string;
  private _CoDep: string;
  private _CodePhar: string;
  private _isNuit:boolean;

  constructor() {
  }

  getCodeDep(): string {
    return this._CodeDep;
  }

  setCodeDep(value: string) {
    this._CodeDep = value;
  }

  getLibelle(): string {
    return this._Libelle;
  }

  setLibelle(value: string) {
    this._Libelle = value;
  }

  getCoDep(): string {
    return this._CoDep;
  }

  setCoDep(value: string) {
    this._CoDep = value;
  }

  getCodePhar(): string {
    return this._CodePhar;
  }

  setCodePhar(value: string) {
    this._CodePhar = value;
  }
  getisNuit(): boolean {
    return this._isNuit;
  }

  setisNuit(value: boolean) {
    this._isNuit = value;
  }
}
