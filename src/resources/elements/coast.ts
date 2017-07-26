import { inject } from 'aurelia-framework';
import { Oileain } from '../../services/oileain';
import { LeafletMap } from '../../services/leaflet-map';
import { Coast } from '../../services/poi';
import { EventAggregator } from 'aurelia-event-aggregator';
import { CoastsUpdated } from '../../services/messages';

const ireland: Coast = {
  title: 'All Ireland',
  variable: 'all',
  identifier: 'all',
  geo: { lat: 53.2734, long: -7.7783203 },
  pois: null,
};

@inject(EventAggregator, Oileain)
export class NoSelection {
  map: LeafletMap;
  routeConfig;
  coast: Coast;
  coasts: Array<Coast>;
  title: string;

  constructor(private ea: EventAggregator, private oileain: Oileain) {
    ea.subscribe(CoastsUpdated, msg => {
      this.populate(msg.coasts);
    });
  }

  populate(coasts: Array<Coast>) {
    this.coasts = coasts;
    if (this.map) {
      this.map.populateCoasts(this.coasts);
    }
  }

  renderCoast(coast: Coast) {
    this.coast = coast;
    this.title = this.coast.title;
    if (this.map) {
      this.map.zoomTo(this.coast.geo);
    }
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    console.log(params.zone);
    this.oileain.getAllIslands().then(coasts => {
      this.populate(coasts);
      if (!params.zone) {
        this.renderCoast(ireland);
      } else {
        if (params.zone === 'all') {
          this.renderCoast(ireland);
        } else {
          this.renderCoast(this.oileain.coastMap.get(params.zone));
        }
      }
    });
  }

  attached() {
    this.map = new LeafletMap('map', { lat: 53.2734, long: -7.7783203 }, 8, 7);
    this.map.addControl();

    if (this.coasts) {
      this.populate(this.coasts);
    }
  }
}
