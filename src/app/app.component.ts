import { Component } from '@angular/core';
import {Platform, NavController, NavParams} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import {ListePage} from "../pages/liste/liste";
<<<<<<< HEAD
import {ExamenLaboPage} from "../pages/examen-labo/examen-labo";
import {Variables} from "../providers/variables";
=======
>>>>>>> 7b0e36a43bd86a82dd9b92f7098ceefdb82ff7ef

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
<<<<<<< HEAD
 rootPage = HomePage;
  //rootPage = ListePage;

=======
  rootPage = HomePage;
//  rootPage = ListePage;
>>>>>>> 7b0e36a43bd86a82dd9b92f7098ceefdb82ff7ef

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
