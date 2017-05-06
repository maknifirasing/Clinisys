import {TraitementArticlePharmacie} from "./TraitementArticlePharmacie";
export class Article {
  private _article: TraitementArticlePharmacie;
  private _qte: number;
  private _rang: number;

  constructor() {
  }

  getarticle(): TraitementArticlePharmacie {
    return this._article;
  }

  setarticle(value: TraitementArticlePharmacie) {
    this._article = value;
  }

  getqte(): number {
    return this._qte;
  }

  setqte(value: number) {
    this._qte = value;
  }

  getrang(): number {
    return this._rang;
  }

  setrang(value: number) {
    this._rang = value;
  }
}
