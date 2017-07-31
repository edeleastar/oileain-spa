import { inject } from 'aurelia-framework';
import { Oileain } from '../../services/oileain';
import { LeafletMap } from '../../services/leaflet-map';
import { Coast } from '../../services/poi';
import { App } from '../../app';

@inject(Oileain, App)
export class NoSelection {
  map: LeafletMap;
  routeConfig;
  coasts: Array<Coast>;
  populated = false;

  constructor(private oileain: Oileain, private app: App) {}

  populateCoasts(coasts: Array<Coast>) {
    if (this.map && !this.populated) {
      this.populated = true;
      coasts.forEach(coast => {
        this.map.populateCoast(coast);
      });
    }
  }

  activate(params, routeConfig) {
    this.app.mapVisible = true;

    this.routeConfig = routeConfig;
    console.log(params.zone);
    this.oileain.getCoasts().then(coasts => {
      this.coasts = coasts;
      this.populateCoasts(coasts);
    });
  }

  attached() {
    this.app.mapVisible = true;
    if (!this.app.mapInitialized) {
      this.app.mapInitialized = true;
      this.map = new LeafletMap(
        'map',
        { lat: 53.2734, long: -7.7783203 },
        8,
        7,
      );
      this.map.addControl();
      if (this.coasts) {
        this.populateCoasts(this.coasts);
      }
    }
  }

  detached() {
    this.app.mapVisible = false;
  }
}
