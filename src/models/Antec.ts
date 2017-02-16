export class Antec {
  private _codeAntecedent: string;
  private _codeFamille: string;
  private _designation: string;
  private _idDetailAntec: string;
  private _ordre: string;
  private _visiblePreAnes: string;
  private _id: string;
  private _identifiant: string;
  private _numeroDossier: string;
  private _observation: any;
  private _utilisateurAnt: string;

  constructor() {
  }


  getcodeAntecedent(): string {
    return this._codeAntecedent;
  }

  setcodeAntecedent(value: string) {
    this._codeAntecedent = value;
  }

  getcodeFamille(): string {
    return this._codeFamille;
  }

  setcodeFamille(value: string) {
    this._codeFamille = value;
  }

  getdesignation(): string {
    return this._designation;
  }

  setdesignation(value: string) {
    this._designation = value;
  }

  getidDetailAntec(): string {
    return this._idDetailAntec;
  }

  setidDetailAntec(value: string) {
    this._idDetailAntec = value;
  }

  getordre(): string {
    return this._ordre;
  }

  setordre(value: string) {
    this._ordre = value;
  }

  getvisiblePreAnes(): string {
    return this._visiblePreAnes;
  }

  setvisiblePreAnes(value: string) {
    this._visiblePreAnes = value;
  }

  getid(): string {
    return this._id;
  }

  setid(value: string) {
    this._id = value;
  }

  getidentifiant(): string {
    return this._identifiant;
  }

  setidentifiant(value: string) {
    this._identifiant = value;
  }

  getnumeroDossier(): string {
    return this._numeroDossier;
  }

  setnumeroDossier(value: string) {
    this._numeroDossier = value;
  }

  getobservation(): any {
    return this._observation;
  }

  setobservation(value: any) {
    this._observation = value;
  }

  getutilisateurAnt(): string {
    return this._utilisateurAnt;
  }

  setutilisateurAnt(value: string) {
    this._utilisateurAnt = value;
  }
}

