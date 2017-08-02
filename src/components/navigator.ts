import { inject } from 'aurelia-framework';
import { Oileain } from '../services/oileain';
import { LeafletMap } from '../services/leaflet-map';
import { Coast, PointOfInterest } from '../services/poi';
import { App } from '../app';
import Marker = L.Marker;
import { EventAggregator } from 'aurelia-event-aggregator';
import { PoiViewed } from '../services/messages';

@inject(EventAggregator, Oileain, App)
export class Navigator {
  model = {
    id: 'Illaunroe',
  };
  map: LeafletMap;
  coasts: Array<Coast>;
  populated = false;

  markerMap = new Map<Marker, PointOfInterest>();
  constructor(
    private ea: EventAggregator,
    private oileain: Oileain,
    private app: App,
  ) {}

  onClick(markerEvent) {
    const marker = markerEvent.popup._source;
    const poi = this.markerMap.get(marker);
    console.log('click event');
    this.ea.publish(new PoiViewed(poi));
  }

  populateCoast(coast: Coast) {
    let group = L.layerGroup([]);
    coast.pois.forEach(poi => {
      let marker = L.marker([
        poi.coordinates.geo.lat,
        poi.coordinates.geo.long,
      ]);
      this.markerMap.set(marker, poi);
      var newpopup = L.popup({
        autoClose: false,
        closeOnClick: false,
      }).setContent(`${poi.safeName}</a>`);
      marker.bindPopup(newpopup);
      marker.addTo(group).on('popupopen', event => {
        this.onClick(event);
      });
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

  activate(params) {
    console.log('activate');
    this.app.title = 'Oileain: Navigator';
    console.log(params.zone);
    this.oileain.getCoasts().then(coasts => {
      this.coasts = coasts;
      this.populateCoasts(coasts);
    });
  }

  attached() {
    console.log('attached');
    this.map = new LeafletMap(
      'navigatormap',
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
