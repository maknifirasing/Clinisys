import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the Try page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-try',
  templateUrl: 'try.html',

})
export class Try {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Try');
  }

}
