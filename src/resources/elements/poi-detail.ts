import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Coast, PointOfInterest } from '../../services/poi';
import { Oileain } from '../../services/oileain';
import { PoiViewed } from '../../services/messages';
import { LeafletMap } from '../../services/leaflet-map';

@inject(Oileain, EventAggregator)
export class PoiDetail {
  map: LeafletMap;
  routeConfig;
  poi: PointOfInterest;
  coasts: Array<Coast>;
  title: string;

  constructor(private oileain: Oileain, private ea: EventAggregator) {}

  renderPoi(poi) {
    this.poi = poi;
    this.title = poi.name;
    this.routeConfig.navModel.setTitle(this.poi.safeName);
    this.ea.publish(new PoiViewed(this.poi));

    if (this.map) {
      this.map.addPopup('Islands', poi.nameHtml, poi.coordinates.geo);
      console.log(this.poi);
      this.map.moveTo(15, poi.coordinates.geo);
    }
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    this.oileain.getCoasts().then(islands => {
      this.oileain
        .getIsland(this.oileain.islandMap.get(params.id))
        .then(island => {
          this.renderPoi(island);
        });
    });
  }

  attached() {
    this.map = new LeafletMap(
      'map',
      { lat: 53.2734, long: -7.7783203 },
      8,
      7,
      'Satellite',
    );
    this.map.addLayerGroup('Islands');
    this.map.addControl();
    if (this.poi) {
      this.renderPoi(this.poi);
    }
  }
}
