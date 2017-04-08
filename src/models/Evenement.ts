export class Evenement{
  private _date: string;
  private _detail: string;
  private _userCreat: string;
  private _evenements: string;
  private _numdoss: string;

  constructor() {
  }

  getnumdoss(): string {
    return this._numdoss;
  }

  setnumdoss(value: string) {
    this._numdoss = value;
  }

  getevenements(): string {
    return this._evenements;
  }

  setevenements(value: string) {
    this._evenements = value;
  }

  getdate(): string {
    return this._date;
  }

  setdate(value: string) {
    this._date = value;
  }

  getdetail(): string {
    return this._detail;
  }

  setdetail(value: string) {
    this._detail = value;
  }

  getuserCreat(): string {
    return this._userCreat;
  }

  setuserCreat(value: string) {
    this._userCreat = value;
  }
}
