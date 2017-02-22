import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ExamenLaboPage} from '../pages/examen-labo';

@Injectable()
export class Variables {
  url: string;
  exm:any;

  constructor(public http: Http) {
    this.url = "http://192.168.0.140:8084/";

  }

}
