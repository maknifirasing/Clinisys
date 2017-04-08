export class ListPreanesthesie {
  private _acte: string;
  private _chirurgien: string;
  private _dateacte: string;
  private _heureDebut: string;
  private _heureFin: string;
  private _kc: string;
  private _numeroDossier: string;

  constructor() {
  }


  getacte(): string {
    return this._acte;
  }

  setacte(value: string) {
    this._acte = value;
  }

  getchirurgien(): string {
    return this._chirurgien;
  }

  setchirurgien(value: string) {
    this._chirurgien = value;
  }

  getdateacte(): string {
    return this._dateacte;
  }

  setdateacte(value: string) {
    this._dateacte = value;
  }

  getheureDebut(): string {
    return this._heureDebut;
  }

  setheureDebut(value: string) {
    this._heureDebut = value;
  }

  getheureFin(): string {
    return this._heureFin;
  }

  setheureFin(value: string) {
    this._heureFin = value;
  }

  getkc(): string {
    return this._kc;
  }

  setkc(value: string) {
    this._kc = value;
  }

  getnumeroDossier(): string {
    return this._numeroDossier;
  }

  setnumeroDossier(value: string) {
    this._numeroDossier = value;
  }
}
