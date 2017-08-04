import { inject } from 'aurelia-framework';
import { Oileain } from '../services/oileain';
import { LeafletMap } from '../services/leaflet-map';
import { Coast } from '../services/poi';
import { App } from '../app';

@inject(Oileain, App)
export class Home {
  map: LeafletMap;
  routeConfig;
  coasts: Array<Coast>;
  populated = false;

  constructor(private oileain: Oileain, private app: App) {}

  populateCoast(coast: Coast) {
    let group = L.layerGroup([]);
    coast.pois.forEach(poi => {
      let marker = L.marker([
        poi.coordinates.geo.lat,
        poi.coordinates.geo.long,
      ]);
      var newpopup = L.popup({
        autoClose: false,
        closeOnClick: false,
      }).setContent(
        `<a href='#/poi/${poi.safeName}'>${poi.name} <small>(click for details}</small></a>`,
      );
      marker.bindPopup(newpopup);
      marker.addTo(group);
    });
    this.map.addLayer(coast.title, group);
    this.map.control.addOverlay(group, coast.title);
  }

  populateCoasts(coasts: Array<Coast>) {
    if (this.map && !this.populated) {
      this.populated = true;
      coasts.forEach(coast => {
        this.populateCoast(coast);
      });
      this.map.invalidateSize();
    }
  }

  activate(params, routeConfig) {
    this.app.homeVisible = true;
    this.app.title = 'Oileain';
    this.routeConfig = routeConfig;
    console.log(params.zone);
    this.oileain.getCoasts().then(coasts => {
      this.coasts = coasts;
      this.populateCoasts(coasts);
    });
  }

  attached() {
    this.app.homeVisible = true;
    if (!this.app.homeMapInitialized) {
      this.app.homeMapInitialized = true;
      this.map = new LeafletMap(
        'homemap',
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
    this.app.homeVisible = false;
  }
}
