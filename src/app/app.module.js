"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var app_component_1 = require('./app.component');
var home_1 = require('../pages/home/home');
var tabs_1 = require('../pages/tabs/tabs');
var liste_1 = require('../pages/liste/liste');
var dossier_1 = require('../pages/dossier/dossier');
var detail_per_page_1 = require('../pages/detail-per-page/detail-per-page');
var examen_radio_1 = require("../pages/examen-radio/examen-radio");
var examen_labo_1 = require("../pages/examen-labo/examen-labo");
var ng2_pdf_viewer_1 = require('ng2-pdf-viewer');
var pdf_view_1 = require('../pages/pdf-view/pdf-view');
var list_preanesthesie_1 = require("../pages/list-preanesthesie/list-preanesthesie");
var langues_1 = require("../pages/langues/langues");
var home_ar_1 = require("../pages/home/home-ar");
var liste_ar_1 = require("../pages/liste/liste-ar");
var examen_radioArr_1 = require("../pages/examen-radio/examen-radioArr");
var list_preanesthesieArr_1 = require("../pages/list-preanesthesie/list-preanesthesieArr");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.MyApp,
                home_1.HomePage,
                tabs_1.TabsPage,
                liste_1.ListePage,
                dossier_1.DossierPage,
                detail_per_page_1.DetailPerPagePage,
                examen_radio_1.ExamenRadioPage,
                examen_labo_1.ExamenLaboPage,
                pdf_view_1.PdfViewPage,
                ng2_pdf_viewer_1.PdfViewerComponent,
                list_preanesthesie_1.ListPreanesthesiePage,
                langues_1.LanguesPage,
                home_ar_1.HomeArPage,
                liste_ar_1.ListeArrPage,
                examen_radioArr_1.ExamenRadioArrPage,
                list_preanesthesieArr_1.ListPreanesthesieArrPage,
                ExamenLaboArrPage
            ],
            imports: [
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp)
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.MyApp,
                home_1.HomePage,
                tabs_1.TabsPage,
                liste_1.ListePage,
                dossier_1.DossierPage,
                detail_per_page_1.DetailPerPagePage,
                examen_radio_1.ExamenRadioPage,
                examen_labo_1.ExamenLaboPage,
                pdf_view_1.PdfViewPage,
                list_preanesthesie_1.ListPreanesthesiePage,
                langues_1.LanguesPage,
                home_ar_1.HomeArPage,
                liste_ar_1.ListeArrPage,
                examen_radioArr_1.ExamenRadioArrPage,
                list_preanesthesieArr_1.ListPreanesthesieArrPage,
                ExamenLaboArrPage
            ],
            providers: [{ provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler }]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
