import { inject } from 'aurelia-framework';
import { Oileain } from '../services/oileain';
import { LeafletMap } from '../services/leaflet-map';
import { Coast } from '../services/poi';

const ireland: Coast = {
  title: 'All Ireland',
  variable: 'all',
  identifier: 'all',
  geo: { lat: 53.2734, long: -7.7783203 },
  pois: null,
};

@inject(Oileain)
export class NoSelection {
  map: LeafletMap;
  routeConfig;
  coast: Coast;
  coasts: Array<Coast>;
  test = 'test';

  constructor(private oileain: Oileain) {
    this.coast = ireland;

  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    console.log(params.zone);
    if (params.zone) {
      if (params.zone == 'all') {
        this.coast = ireland;
      } else {
        this.coast = this.oileain.coastMap.get(params.zone);
      }
    }
    if (this.map) {
      this.map.zoomTo(this.coast.geo);
    }
  }

  attached() {
    this.map = new LeafletMap('map', { lat: 53.2734, long: -7.7783203 }, 8, 7);
    this.oileain.getAllIslands().then(islands => {
      this.coasts = this.oileain.coasts;
      this.map.populateCoasts(this.coasts);
      this.map.addControl();
      this.map.zoomTo(this.coast.geo);
    });
  }

  bind(){

  }
}
