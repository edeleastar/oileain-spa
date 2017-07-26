import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { Oileain } from '../../services/oileain';
import { CoastsUpdated, PoiViewed } from '../../services/messages';
import { Coast, PointOfInterest } from '../../services/poi';
import 'semantic-ui';
import * as $ from 'jquery'; // import $ from 'jquery';

@inject(Oileain, EventAggregator)
export class PoiList {
  coasts: Array<Coast>;
  selectedPoiName = 'hello';

  constructor(private oileain: Oileain, ea: EventAggregator) {
    // ea.subscribe (CoastsUpdated, msg => {
    //   this.coasts = msg.coasts;
    // });
    this.oileain.getAllIslands().then(coasts => {
      this.coasts = coasts;
    });
  }

  select(poi: PointOfInterest) {
    this.toggleSidebar();
    this.selectedPoiName = poi.safeName;
    return true;
  }

  attached() {
    $('.ui.accordion').accordion();
  }

  toggleSidebar() {
    $('.ui.sidebar').sidebar('toggle');
  }
}
