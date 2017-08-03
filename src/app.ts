import { Router, RouterConfiguration } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { Oileain } from './services/oileain';
import { Coast } from './services/poi';

@inject(Oileain)
export class App {
  router: Router;
  coasts: Array<Coast> = [];
  title = 'Oileain';
  homeVisible = false;
  homeMapInitialized = false;
  model = {
    id: 'Illaunroe',
  };

  constructor(private oileain: Oileain) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Oileain';
    config.map([
      {
        route: [''],
        moduleId: './components/home',
        title: 'All Islands',
      },
      {
        route: 'poi/:id',
        moduleId: './components/poi-detail',
        name: 'pois',
        title: 'Island',
      },
      {
        route: 'navigator',
        moduleId: './components/navigator',
        name: 'navigator',
        title: 'Navigtor',
      },
    ]);
    this.router = router;
  }
}
