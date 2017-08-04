import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { Oileain } from '../../services/oileain';
import { CoastsUpdated } from '../../services/messages';
import { Coast, PointOfInterest } from '../../services/poi';
import 'semantic-ui';
import * as $ from 'jquery';

@inject(Oileain, EventAggregator)
export class PoiList {
  coasts: Array<Coast>;
  poi: PointOfInterest;
  selectedPoiName = '';
  selectedCoast = '';

  constructor(private oileain: Oileain, ea: EventAggregator) {
    ea.subscribe(CoastsUpdated, msg => {
      this.coasts = msg.coasts;
    });
  }

  select(poi: PointOfInterest) {
    this.toggleSidebar();
    this.poi = poi;
    this.selectedPoiName = poi.safeName;
    this.selectedCoast = poi.coast.variable;
    return true;
  }

  attached() {
    $('.ui.accordion').accordion();
  }

  toggleSidebar() {
    $('.ui.sidebar').sidebar('toggle');
  }
}
