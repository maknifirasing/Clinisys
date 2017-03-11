export class AntecCh {
   private _idpass: string;
  private _ch: string;


  constructor() {
  }

  getidpass(): string {
    return this._idpass;
  }

  setidpass(value: string) {
    this._idpass = value;
  }

  getch(): string {
    return this._ch;
  }

  setch(value: string) {
    this._ch = value;
  }
}

