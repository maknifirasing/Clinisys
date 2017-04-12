export class Clinique {
  private _code: string;
  private _nom: string;
  private _url: string;

  constructor() {
  }

  getcode(): string {
    return this._code;
  }

  setcode(value: string) {
    this._code = value;
  }

  getnom(): string {
    return this._nom;
  }

  setnom(value: string) {
    this._nom = value;
  }

  geturl(): string {
    return this._url;
  }

  seturl(value: string) {
    this._url = value;
  }
}
