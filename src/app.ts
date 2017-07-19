import { Router, RouterConfiguration } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import 'semantic-ui';
import * as $ from 'jquery'; // import $ from 'jquery';

export class App {
  router: Router;

  constructor() {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Contacts';
    config.map([
      { route: '', moduleId: 'poiview/no-selection', title: 'Select' },
      { route: 'poi/:id', moduleId: 'poiview/poi-detail', name: 'pois' },
    ]);

    this.router = router;
  }

  attached() {
    $('.ui.sidebar')
      .sidebar({ context: $('.pushable'),
                 dimPage: false})
      .sidebar('setting', 'transition', 'overlay')
      .sidebar('attach events', '#toc');
  }
}
