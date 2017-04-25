export class Realisation {
  private _valeur: string;
  private _clavier: string;
  private _disabled: string;
  private _keyboard: number;

  constructor() {
  }

  getvaleur(): string {
    return this._valeur;
  }

  setvaleur(value: string) {
    this._valeur = value;
  }

  getclavier(): string {
    return this._clavier;
  }

  setclavier(value: string) {
    this._clavier = value;
  }

  getdisabled(): string {
    return this._disabled;
  }

  setdisabled(value: string) {
    this._disabled = value;
  }

  getkeyboard(): number {
    return this._keyboard;
  }

  setkeyboard(value: number) {
    this._keyboard = value;
  }
}
