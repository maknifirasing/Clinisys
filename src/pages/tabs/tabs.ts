import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ListePage } from '../liste/liste';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tab1Root: any = ListePage;
  tab2Root: any = ContactPage;
  tab3Root: any = AboutPage;

  constructor() {
  }
}
