import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ListePage} from "../liste/liste";
import {errorHandler} from "@angular/platform-browser/src/browser";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  err:string;
  constructor(public navCtrl: NavController) {

  }
  connecter(login,password) {
    console.log(login," ",password);
    this.err="";
    if (login==="admin" && password==="admin") {
      this.navCtrl.push(ListePage);
    }
    else {
this.err="verifier votre ....!"
    }
  }
}
