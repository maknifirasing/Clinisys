export class DateFeuille{
  private _datefeuille:string;

  constructor() {
  }

  getdatefeuille(): string {
    return this._datefeuille;
  }

  setdatefeuille(value: string) {
    this._datefeuille = value;
  }
}
