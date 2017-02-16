export class SigneClinique {
  private _codeType: string;
  private _date: string;
  private _designation: string;
  private _quantite: string;

  constructor() {
  }

  getcodeType(): string {
    return this._codeType;
  }

  setcodeType(value: string) {
    this._codeType = value;
  }

  getdate(): string {
    return this._date;
  }

  setdate(value: string) {
    this._date = value;
  }

  getdesignation(): string {
    return this._designation;
  }

  setdesignation(value: string) {
    this._designation = value;
  }

  getquantite(): string {
    return this._quantite;
  }

  setquantite(value: string) {
    this._quantite = value;
  }
}
