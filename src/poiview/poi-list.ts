import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { Oileain } from '../services/oileain';
import { CoastsUpdate, PoiViewed } from '../services/messages';
import { Coast, PointOfInterest } from '../services/poi';
import 'semantic-ui';
import * as $ from 'jquery'; // import $ from 'jquery';

@inject(Oileain, EventAggregator)
export class PoiList {
  coasts: Array<Coast>;
  selectedPoiName = 'hello';

  constructor(private oileain: Oileain, ea: EventAggregator) {
    oileain.getAllIslands().then(islands => {
      this.coasts = oileain.coasts;
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
    $('.ui.sidebar')
        .sidebar('toggle')
    ;
  }
}
