import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PointOfInterest } from '../services/poi';
import { Oileain } from '../services/oileain';
import { PoiViewed } from '../services/messages';

import * as L from 'leaflet';
import Map = L.Map;
import Layer = L.Layer;
import LayerGroup = L.LayerGroup;
import LayersObject = L.Control.LayersObject;
import { createPopup, populateMapPoi } from '../services/maputils';

@inject(Oileain, EventAggregator)
export class PoiDetail {
  routeConfig;
  poi: PointOfInterest;
  imap: Map;
  islandLayer = L.layerGroup([]);
  overlays: LayersObject = {};
  mbAttr = `Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,
            <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>`;

  mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

  baseLayers = {
    Terrain: L.tileLayer(this.mbUrl, {
      id: 'mapbox.outdoors',
      attribution: this.mbAttr,
    }),
    Satellite: L.tileLayer(this.mbUrl, {
      id: 'mapbox.satellite',
      attribution: this.mbAttr,
    }),
  };

  constructor(private oileain: Oileain, private ea: EventAggregator) {}

  renderPoi(poi) {
    this.poi = poi;
    this.routeConfig.navModel.setTitle(this.poi.name);
    this.ea.publish(new PoiViewed(this.poi));

    if (this.imap) {
      const popup = createPopup(poi.nameHtml, poi.geo.lat, poi.geo.long);
      popup.addTo(this.islandLayer);
      console.log(this.poi);
      this.imap.setZoom(15);
      this.imap.panTo(new L.LatLng(this.poi.geo.lat, this.poi.geo.long));
    }
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    if (this.oileain.coasts) {
      this.renderPoi(this.oileain.islandMap.get(params.id));
    } else {
      this.oileain.getAllIslands().then(islands => {
        this.renderPoi(this.oileain.islandMap.get(params.id));
      });
    }
  }

  attachMap() {
    if (!this.imap) {
      this.imap = L.map('map', {
        center: [53.2734, -7.7783203],
        zoom: 8,
        minZoom: 7,
        layers: [this.baseLayers.Satellite],
      });
      this.overlays['Islands'] = this.islandLayer;
      L.control.layers(this.baseLayers, this.overlays).addTo(this.imap);
      this.imap.addLayer(this.islandLayer);
    }
    this.renderPoi(this.poi);
  }

  attached() {
    this.attachMap();
  }
}
