export  class Langue{
  private _langue:string;

  constructor() {
  }

  getlangue(): string {
    return this._langue;
  }

  setlangue(value: string) {
    this._langue = value;
  }
}
