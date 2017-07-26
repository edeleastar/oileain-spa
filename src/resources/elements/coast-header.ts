import { bindable } from 'aurelia-framework';
import { Coast } from '../../services/poi';
import * as $ from 'jquery';

export class CoastHeader {
  @bindable coasts: Array<Coast>;
  @bindable title: string;

  attached() {
    $('.ui.sidebar')
      .sidebar({
        context: $('.pushable'),
        dimPage: false,
      })
      .sidebar('setting', 'transition', 'overlay')
      .sidebar('attach events', '#toc');
  }
}
