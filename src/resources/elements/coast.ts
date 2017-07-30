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
  pois: [],
};

@inject(EventAggregator, Oileain)
export class NoSelection {
  map: LeafletMap;
  routeConfig;
  coast: Coast;
  coasts: Array<Coast>;
  title: string;
  populatedCoasts = new Set<Coast>();

  constructor(private ea: EventAggregator, private oileain: Oileain) {}

  renderCoast(coast: Coast) {
    this.coast = coast;
    this.title = this.coast.title;
    if (this.map) {
      this.map.zoomTo(this.coast.geo);
      if (!this.populatedCoasts.has(coast)) {
        this.map.populateCoast(coast);
        this.populatedCoasts.add(coast);
      }
    }
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    console.log(params.zone);
    this.oileain.getCoasts().then(coasts => {
      this.coasts = coasts;
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
    if (this.coast) {
      this.renderCoast(this.coast);
    }
  }
}
