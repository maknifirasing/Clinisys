export class Document {

  private _url: string;
  private _observ: string;
  private _codeClinique: string;


  constructor() {
  }


  geturl(): string {
    return this._url;
  }

  seturl(value: string) {
    this._url = value;
  }

  getobserv(): string {
    return this._observ;
  }

  setobserv(value: string) {
    this._observ = value;
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }
}
