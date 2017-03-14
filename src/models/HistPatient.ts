export class HistPatient {
  private _user: string;
  private _searchText: string;
  private _etage: string;
  private _date: string;
  private _codeClinique: string;


  constructor() {
  }


  getuser(): string {
    return this._user;
  }

  setuser(value: string) {
    this._user = value;
  }

  getsearchText(): string {
    return this._searchText;
  }

  setsearchText(value: string) {
    this._searchText = value;
  }

  getetage(): string {
    return this._etage;
  }

  setetage(value: string) {
    this._etage = value;
  }

  getdate(): string {
    return this._date;
  }

  setdate(value: string) {
    this._date = value;
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }
}
