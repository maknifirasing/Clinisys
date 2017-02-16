import {DateTime} from "ionic-angular";
/**
 * Created by makni on 09/02/2017.
 */
export class Patient {
  private _id: string;
  private _dossier: string;
  private _chambre: string;
  private _nom: string;
  private _prenom: string;
  private _dateNaiss: DateTime;
  private _medecin: string;
  private _spec: string;
  private _etat: boolean;
  private _age: number;
  private _img: string;
  private _nature: string;

  constructor() {
  }

  getnature(): string {
    return this._nature;
  }

  setnature(value: string) {
    this._nature = value;
  }

  getid(): string {
    return this._id;
  }

  setid(value: string) {
    this._id = value;
  }

  getdossier(): string {
    return this._dossier;
  }

  setdossier(value: string) {
    this._dossier = value;
  }

  getchambre(): string {
    return this._chambre;
  }

  setchambre(value: string) {
    this._chambre = value;
  }

  getnom(): string {
    return this._nom;
  }

  setnom(value: string) {
    this._nom = value;
  }

  getprenom(): string {
    return this._prenom;
  }

  setprenom(value: string) {
    this._prenom = value;
  }

  getdateNaiss(): DateTime {
    return this._dateNaiss;
  }

  setdateNaiss(value: DateTime) {
    this._dateNaiss = value;
  }

  getmedecin(): string {
    return this._medecin;
  }

  setmedecin(value: string) {
    this._medecin = value;
  }

  getspec(): string {
    return this._spec;
  }

  setspec(value: string) {
    this._spec = value;
  }

  getetat(): boolean {
    return this._etat;
  }

  setetat(value: boolean) {
    this._etat = value;
  }
  
  getage(): number {
    return this._age;
  }

  setage(value: number) {
    this._age = value;
  }
  getimg(): string {
    return this._img;
  }

  setimg(value: string) {
    this._img = value;
  }
}
