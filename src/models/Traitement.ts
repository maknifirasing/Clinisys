export class Traitement {
  private _designation: string;
  private _jour: number;
  private _posologie: string;
  private _numDoss: string;

  constructor() {
  }

  getnumDoss(): string {
    return this._numDoss;
  }

  setnumDoss(value: string) {
    this._numDoss = value;
  }

  getdesignation(): string {
    return this._designation;
  }

  setdesignation(value: string) {
    this._designation = value;
  }

  getjour(): number {
    return this._jour;
  }

  setjour(value: number) {
    this._jour = value;
  }

  getposologie(): string {
    return this._posologie;
  }

  setposologie(value: string) {
    this._posologie = value;
  }
}
