var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListePage } from '../pages/liste/liste';
import { DossierPage } from '../pages/dossier/dossier';
import { DetailPerPagePage } from '../pages/detail-per-page/detail-per-page';
import { ExamenRadioPage } from "../pages/examen-radio/examen-radio";
import { ExamenLaboPage } from "../pages/examen-labo/examen-labo";
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { PdfViewPage } from '../pages/pdf-view/pdf-view';
import { ListPreanesthesiePage } from "../pages/list-preanesthesie/list-preanesthesie";
import { LanguesPage } from "../pages/langues/langues";
import { ListeCliniquePage } from "../pages/liste-clinique/liste-clinique";
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SigneCourbePage } from "../pages/signe-courbe/signe-courbe";
import { NotificationPage } from "../pages/notification/notification";
import { ClientDetailPage } from "../pages/client-detail/client-detail";
import { TraitmentCourbe } from "../pages/traitment-courbe/traitment-courbe";
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            TabsPage,
            ListePage,
            DossierPage,
            DetailPerPagePage,
            ExamenRadioPage,
            ExamenLaboPage,
            PdfViewPage,
            PdfViewerComponent,
            ListPreanesthesiePage,
            LanguesPage,
            ListeCliniquePage,
            SigneCourbePage,
            NotificationPage,
            ClientDetailPage,
            TraitmentCourbe
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            FlexLayoutModule,
            MaterialModule
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            TabsPage,
            ListePage,
            DossierPage,
            DetailPerPagePage,
            ExamenRadioPage,
            ExamenLaboPage,
            PdfViewPage,
            ListPreanesthesiePage,
            LanguesPage,
            ListeCliniquePage,
            SigneCourbePage,
            NotificationPage,
            ClientDetailPage,
            TraitmentCourbe
        ],
        providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map