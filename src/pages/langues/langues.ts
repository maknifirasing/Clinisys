import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Variables} from "../../providers/variables";
import {NativeStorage} from "ionic-native";
import {ListeCliniquePage} from "../liste-clinique/liste-clinique";

@Component({
  selector: 'page-langues',
  templateUrl: 'langues.html'
})
export class LanguesPage {
   la:string;
tabLangue:any;


langue:string;
  constructor(public navCtrl:NavController) {
    NativeStorage.setItem("name","basma");


  }

  ionViewDidLoad() {
  }

  choixLang(langue) {

     if(langue==="arabe"){
     this.tabLangue=Variables.arabe;
     }
     else  if(langue==="francais"){
       this.tabLangue=Variables.francais;
     }
     else  if(langue==="anglais"){
       this.tabLangue=Variables.anglais;
     }
     console.log("fra "+langue);
    this.navCtrl.push(ListeCliniquePage,{tabLangue:this.tabLangue,langue:langue});
  }

}
