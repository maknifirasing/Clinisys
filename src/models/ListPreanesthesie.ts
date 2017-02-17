import {DateTime} from "ionic-angular";
export class ListPreanesthesie {
  private _acte: string;
  private _chirurgien: string;
  private _codeActe: string;
  private _codeExamen: string;
  private _codeMedecinReanimateur: any;
  private _codeMedecinchirurgi: DateTime;
  private _codeMedecinchirurgien: string;
  private _codePostop: string;
  private _dateacte: string;
  private _datedemande: string;
  private _etatReservationBloc: string;
  private _hasAnesth: string;
  private _hasPost: string;
  private _hasPre: string;
  private _heureDebut: string;
  private _heureFin: any;
  private _id: DateTime;
  private _identifiant: any;
  private _kc: string;
  private _nom: string;
  private _nomReanimateur: any;
  private _numeroDossier: string;
  private _prenom: string;

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

  getcodeActe(): string {
    return this._codeActe;
  }

  setcodeActe(value: string) {
    this._codeActe = value;
  }

  getcodeExamen(): string {
    return this._codeExamen;
  }

  setcodeExamen(value: string) {
    this._codeExamen = value;
  }

  getcodeMedecinReanimateur(): any {
    return this._codeMedecinReanimateur;
  }

  setcodeMedecinReanimateur(value: any) {
    this._codeMedecinReanimateur = value;
  }

  getcodeMedecinchirurgi(): DateTime {
    return this._codeMedecinchirurgi;
  }

  setcodeMedecinchirurgi(value: DateTime) {
    this._codeMedecinchirurgi = value;
  }

  getcodeMedecinchirurgien(): string {
    return this._codeMedecinchirurgien;
  }

  setcodeMedecinchirurgien(value: string) {
    this._codeMedecinchirurgien = value;
  }

  getcodePostop(): string {
    return this._codePostop;
  }

  setcodePostop(value: string) {
    this._codePostop = value;
  }

  getdateacte(): string {
    return this._dateacte;
  }

  setdateacte(value: string) {
    this._dateacte = value;
  }

  getdatedemande(): string {
    return this._datedemande;
  }

  setdatedemande(value: string) {
    this._datedemande = value;
  }

  getetatReservationBloc(): string {
    return this._etatReservationBloc;
  }

  setetatReservationBloc(value: string) {
    this._etatReservationBloc = value;
  }

  gethasAnesth(): string {
    return this._hasAnesth;
  }

  sethasAnesth(value: string) {
    this._hasAnesth = value;
  }

  gethasPost(): string {
    return this._hasPost;
  }

  sethasPost(value: string) {
    this._hasPost = value;
  }

  gethasPre(): string {
    return this._hasPre;
  }

  sethasPre(value: string) {
    this._hasPre = value;
  }

  getheureDebut(): string {
    return this._heureDebut;
  }

  setheureDebut(value: string) {
    this._heureDebut = value;
  }

  getheureFin(): any {
    return this._heureFin;
  }

  setheureFin(value: any) {
    this._heureFin = value;
  }

  getid(): DateTime {
    return this._id;
  }

  setid(value: DateTime) {
    this._id = value;
  }

  getidentifiant(): any {
    return this._identifiant;
  }

  setidentifiant(value: any) {
    this._identifiant = value;
  }

  getkc(): string {
    return this._kc;
  }

  setkc(value: string) {
    this._kc = value;
  }

  getnom(): string {
    return this._nom;
  }

  setnom(value: string) {
    this._nom = value;
  }

  getnomReanimateur(): any {
    return this._nomReanimateur;
  }

  setnomReanimateur(value: any) {
    this._nomReanimateur = value;
  }

  getnumeroDossier(): string {
    return this._numeroDossier;
  }

  setnumeroDossier(value: string) {
    this._numeroDossier = value;
  }

  getprenom(): string {
    return this._prenom;
  }

  setprenom(value: string) {
    this._prenom = value;
  }
}
