import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Coast } from '../../services/poi';
import * as $ from 'jquery';
import { Oileain } from '../../services/oileain';
import { EventAggregator } from 'aurelia-event-aggregator';
import { CoastsUpdated } from '../../services/messages';

@inject(EventAggregator, Oileain)
export class CoastHeader {
  @bindable title: string;
  activeIndicator = 'active';
  isPrimed = false;

  constructor(private ea: EventAggregator, private oileain: Oileain) {
    if (oileain.coasts) {
      this.activeIndicator = 'inactive';
      this.isPrimed = true;
    }
    ea.subscribe(CoastsUpdated, msg => {
      this.activeIndicator = 'inactive';
      this.isPrimed = true;
    });
  }
  attached() {
    $('.ui.sidebar')
      .sidebar({
        context: $('.pushable'),
        dimPage: false,
        on: 'hover',
      })
      .sidebar('setting', 'transition', 'overlay')
      .sidebar('attach events', '#toc');
  }
}
