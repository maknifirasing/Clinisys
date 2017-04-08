export class ExamenRadio {
  private _compterendu: string;
  private _dateExamen: string;
  private _designationExamen: string;
  private _numeroDossier: string;
  private _observ: string;

  constructor() {
  }

  getcompterendu(): string {
    return this._compterendu;
  }

  setcompterendu(value: string) {
    this._compterendu = value;
  }

  getdateExamen(): string {
    return this._dateExamen;
  }

  setdateExamen(value: string) {
    this._dateExamen = value;
  }

  getdesignationExamen(): string {
    return this._designationExamen;
  }

  setdesignationExamen(value: string) {
    this._designationExamen = value;
  }

  getnumeroDossier(): string {
    return this._numeroDossier;
  }

  setnumeroDossier(value: string) {
    this._numeroDossier = value;
  }

  getobserv(): string {
    return this._observ;
  }

  setobserv(value: string) {
    this._observ = value;
  }
}
