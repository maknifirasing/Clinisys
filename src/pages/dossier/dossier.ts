import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MotifHospitalisation} from '../../models/motifHospitalisation';
import {Antec} from '../../models/Antec';
import {SigneClinique} from '../../models/SigneClinique';

@Component({
  selector: 'page-dossier',
  templateUrl: 'dossier.html'
})

export class DossierPage implements OnInit {
  m = new MotifHospitalisation();
   id: string;
   numDoss: string;
   img: string;
   nom: string;
   age: string;
   ch: string;
   nature: string;
  antec: Array<Antec> = [];
  signe: Array<SigneClinique> = [];
  disig: string;
  dateFeuille: string;
  test: boolean;
  AlerteSigneCliniqueTest: boolean=false;
  AntecedentAllergieTest: boolean=false;
  stringAlerg :string="";
   stringAntec :string= "";
   Alerg :boolean= false;
   Ante:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get("identifiant");
    this.numDoss = navParams.get("numeroDossier");
    this.img = navParams.get("image");
    this.nom = navParams.get("nom");
    this.age = navParams.get("age");
    this.ch = navParams.get("chambre");
    this.nature = navParams.get("nature");
    this.dateFeuille = navParams.get("dateFeuille");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DossierPage');
  }

  ngOnInit() {
    this.GetAllMotifHospitalisationByNumDoss(this.numDoss);
    this.getAntecedentAllergieByIdentifiant(this.id);
    this.GetAlerteSigneClinique(this.numDoss, this.dateFeuille, this.nature);
  }


  GetAlerteSigneClinique(numDoss, dateFeuille, nature) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://192.168.0.65:8084/dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:GetAlerteSigneClinique>' +
      '<numdoss>' + numDoss + '</numdoss>' +
      '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
      '<nature>' + nature + '</nature>' +
      '</ser:GetAlerteSigneClinique>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.AlerteSigneCliniqueTest = true;
            var xml = xmlhttp.responseXML;
            var x, i;
            x = xml.getElementsByTagName("return");
            var s;
            for (i = 0; i < x.length; i++) {
              s = new SigneClinique();
              s.setcodeType(x[i].children[0].textContent);
              s.setdate(x[i].children[1].textContent);
              s.setdesignation(x[i].children[2].textContent);
              s.setquantite(x[i].children[3].textContent);
              this.signe.push(s);
            }
          } catch (Error) {
            this.AlerteSigneCliniqueTest = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  getAntecedentAllergieByIdentifiant(id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://192.168.0.65:8084/dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:getAntecedentAllergieByIdentifiant>' +
      '<identifiant>' + id + '</identifiant>' +
      '</ser:getAntecedentAllergieByIdentifiant>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try{
            this.AntecedentAllergieTest=true;
            this.disig = "";
            var xml = xmlhttp.responseXML;
            var x, i;
            x = xml.getElementsByTagName("return");
            var a;
            console.log("ll  "+x.length);
            for (i = 0; i < x.length; i++) {
              console.log(x[i].children[0].children[0].textContent);
              a = new Antec();
              a.setcodeAntecedent(x[i].children[0].children[0].textContent);
              a.setcodeFamille(x[i].children[0].children[1].textContent);
              a.setdesignation(x[i].children[0].children[2].textContent);
              a.setidDetailAntec(x[i].children[0].children[3].textContent);
              a.setordre(x[i].children[0].children[4].textContent);
              a.setvisiblePreAnes(x[i].children[0].children[5].textContent);
              a.setid(x[i].children[1].textContent);
              a.setidentifiant(x[i].children[2].textContent);
              a.setnumeroDossier(x[i].children[3].textContent);
              a.setobservation(x[i].children[4].textContent);
              a.setutilisateurAnt(x[i].children[5].textContent);

              /* if (i === x.length - 1)
               this.disig += a.getdesignation();
               else
               this.disig += a.getdesignation() + ", ";*/

              if (!(a.getcodeAntecedent()===("A000"))&& (!(a.getcodeAntecedent()===("A255")))) {
                if (a.getcodeFamille()===("FA02")) // Allergie
                {
                  if (a.getcodeAntecedent().toUpperCase()===("ALER")) {
                    this.stringAlerg += a.getobservation() + ", ";
                    this.Alerg = true;

                  }
                  else {
                    this.stringAlerg += a.getdesignation() + ", ";
                    this.Alerg = true;
                  }

                }
                else // Antécédent
                {
                  if (a.getcodeFamille().toUpperCase()===("AUTR")) {
                    this.stringAntec += a.getobservation() + ", ";
                    this.Ante = true;
                  }
                  else {
                    this.stringAntec += a.getdesignation() + ", ";
                    this.Ante = true;
                  }
                }

              }

              this.antec.push(a);
          }

          //  console.log("get    "+a.getcodeAntecedent());
          } catch (Error){
            this.AntecedentAllergieTest=false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetAllMotifHospitalisationByNumDoss(numDoss) {
    this.test = false;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://192.168.0.65:8084/dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:GetAllMotifHospitalisationByNumDoss>' +
      '<numDoss>' + numDoss + '</numDoss>' +
      '</ser:GetAllMotifHospitalisationByNumDoss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.test = true;
           var xml = xmlhttp.responseXML;
            var x, i, m, drdv, dsortie, hrdv, hsortie;
            var day = "";
            var month = "";
            var year = "";
            var minu = "";
            var second = "";
            var hour = "";
            x = xml.getElementsByTagName("return");
            this.m.setconclusion(x[0].children[0].textContent);
            drdv = new Date(x[0].children[1].textContent);
            day = drdv.getDay();
            month = drdv.getMonth();
            year = drdv.getFullYear();
            this.m.setdateRdv(day + "/" + month + "/" + year);
            dsortie = new Date(x[0].children[2].textContent);
            day = dsortie.getDay();
            month = dsortie.getMonth();
            year = dsortie.getFullYear();
            this.m.setdateSortie(day + "/" + month + "/" + year);
            this.m.setgroupeSang(x[0].children[3].textContent);
            hrdv = new Date(x[0].children[4].textContent);
            minu = hrdv.getMinutes();
            hour = hrdv.getHours();
            second = hrdv.getSeconds();
            this.m.setheureRdv(hour + " : " + minu + " : " + second);
            hsortie = new Date(x[0].children[5].textContent);
            minu = hrdv.getMinutes();
            hour = hrdv.getHours();
            second = hrdv.getSeconds();
            this.m.setheureSortie(hour + " : " + minu + " : " + second);
            this.m.sethistoiremaladie(x[0].children[6].textContent);
            this.m.setmotifhospitalisation(x[0].children[7].textContent);
            this.m.setnumdoss(x[0].children[8].textContent);
            this.m.setobservationSejour(x[0].children[9].textContent);
            this.m.setpoid(x[0].children[10].textContent);
            this.m.settaille(x[0].children[11].textContent);
            this.m.settraitementHabituelle(x[0].children[12].textContent);
            this.m.settraitementSejour(x[0].children[13].textContent);
            this.m.settraitementSortie(x[0].children[14].textContent);
            this.m.setutilisateurMotif(x[0].children[15].textContent);
            return this.m;
          } catch (Error) {
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }
}
