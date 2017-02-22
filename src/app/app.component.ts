import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import {ListePage} from "../pages/liste/liste";
<<<<<<< HEAD
<<<<<<< HEAD
import {ExamenLaboPage} from "../pages/examen-labo/examen-labo";
import {Variables} from "../providers/variables";
=======
>>>>>>> 7b0e36a43bd86a82dd9b92f7098ceefdb82ff7ef
=======
>>>>>>> b38b774492a3df3058b3fa755fe8150945041014

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
<<<<<<< HEAD
<<<<<<< HEAD
 rootPage = HomePage;
  //rootPage = ListePage;

=======
  rootPage = HomePage;
//  rootPage = ListePage;
>>>>>>> 7b0e36a43bd86a82dd9b92f7098ceefdb82ff7ef
=======
  //rootPage = HomePage;
  rootPage = ListePage;
>>>>>>> b38b774492a3df3058b3fa755fe8150945041014

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
