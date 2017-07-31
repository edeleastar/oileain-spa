import { Router, RouterConfiguration } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { Oileain } from './services/oileain';
import { Coast } from './services/poi';

@inject(Oileain)
export class App {
  router: Router;
  coasts: Array<Coast> = [];
  title = 'Oileain';
  mapVisible: boolean = false;
  mapInitialized: boolean = false;

  constructor(private oileain: Oileain) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Oileain';
    config.map([
      {
        route: [''],
        moduleId: './resources/elements/coast',
        title: 'All Islands',
      },
      {
        route: 'poi/:id',
        moduleId: './resources/elements/poi-detail',
        name: 'pois',
        title: 'Island',
      },
    ]);
    this.router = router;
  }
}
