export class Labo {
  private _codeDemande: string;
  private _contenuePDF: string;
  private _dateDemande: string;
  private _medecinTraitant: string;
  private _numAdmission: string;
  private _numDossier: string;
  private _pdf: string;

  constructor() {
  }

  getcodeDemande(): string {
    return this._codeDemande;
  }

  setcodeDemande(value: string) {
    this._codeDemande = value;
  }

  getcontenuePDF(): string {
    return this._contenuePDF;
  }

  setcontenuePDF(value: string) {
    this._contenuePDF = value;
  }

  getdateDemande(): string {
    return this._dateDemande;
  }

  setdateDemande(value: string) {
    this._dateDemande = value;
  }

  getmedecinTraitant(): string {
    return this._medecinTraitant;
  }

  setmedecinTraitant(value: string) {
    this._medecinTraitant = value;
  }

  getnumDossier(): string {
    return this._numDossier;
  }
  
  getnumAdmission(): string {
    return this._numAdmission;
  }

  setnumAdmission(value: string) {
    this._numAdmission = value;
  }
  
  setnumDossier(value: string) {
    this._numDossier = value;
  }

  getpdf(): string {
    return this._pdf;
  }

  setpdf(value: string) {
    this._pdf = value;
  }
}
