import { Router, RouterConfiguration } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import 'semantic-ui';
import * as $ from 'jquery';

export class App {
  router: Router;

  constructor() {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Oileain';
    config.map([
      { route: ['', 'coasts/:zone'], moduleId: './resources/elements/coast', title: 'Coast' },
      { route: 'poi/:id', moduleId: 'poiview/poi-detail', name: 'pois' },
    ]);
    this.router = router;
  }

  home() {
    this.router.navigate('/');
  }

  attached() {
    $('.ui.sidebar')
      .sidebar({ context: $('.pushable'),
                 dimPage: false})
      .sidebar('setting', 'transition', 'overlay')
      .sidebar('attach events', '#toc');
  }

  toggleSidebar() {
    $('.ui.sidebar')
        .sidebar('toggle')
    ;
  }
}
