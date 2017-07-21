import { inject } from 'aurelia-framework';
import { Oileain } from '../services/oileain';
import { LeafletMap } from '../services/leaflet-map';

@inject(Oileain)
export class NoSelection {
  map: LeafletMap;

  constructor(private oileain: Oileain) {
    oileain.getAllIslands().then(islands => {
      this.map.populateCoasts(oileain.coasts);
      this.map.addControl();
    });
  }

  attached() {
    this.map = new LeafletMap('map', { lat: 53.2734, long: -7.7783203 }, 8, 7);
  }
}
