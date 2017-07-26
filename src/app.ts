import { Router, RouterConfiguration } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { Oileain } from './services/oileain';
import { Coast } from './services/poi';

@inject(Oileain)
export class App {
  router: Router;
  coasts: Array<Coast> = [];

  constructor(private oileain: Oileain) {
    this.oileain.getAllIslands().then(islands => {
      this.coasts = this.oileain.coasts;
    });
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Oileain';
    config.map([
      {
        route: ['', 'coasts/:zone'],
        moduleId: './resources/elements/coast',
        title: 'Coasts',
      },
      {
        route: 'poi/:id',
        moduleId: './resources/elements/poi-detail',
        name: 'pois',
        title: 'Islands',
      },
    ]);
    this.router = router;
  }
}
