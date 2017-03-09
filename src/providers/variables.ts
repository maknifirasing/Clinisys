import {Injectable} from '@angular/core';
import {Platform} from "ionic-angular";

declare var navigator: any;
declare var Connection: any;
@Injectable()
export class Variables {
  url: string;


  constructor(platform: Platform) {
    this.url = "http://192.168.0.138:8084/";

  }

  public static checconnection() {
    var states = {};
    var networkState = navigator.connection.type;
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';
    return states[networkState];
  }

  public static  checservice(url) {
    var xhr = new XMLHttpRequest();
    var file = url;

    xhr.timeout = 200;
    xhr.open('HEAD', file, true);
    xhr.send();
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 304) {
          alert("connection exists!");
        } else {
          alert("connection doesn't exist!");
        }
      }
    }

  }

}
