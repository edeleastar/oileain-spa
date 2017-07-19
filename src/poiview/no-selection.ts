import * as L from 'leaflet';
import Map = L.Map;
import Layer = L.Layer;
import LayerGroup = L.LayerGroup;
import LayersObject = L.Control.LayersObject;
import {populateMapLayer, populateMapPoi} from '../services/maputils';
import {Oileain} from "../services/oileain";
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {Coast} from "../services/poi";

@inject(EventAggregator, Oileain)
export class NoSelection {
  imap: Map;
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

  constructor (private ea: EventAggregator, private oileain:Oileain) {
    oileain.getAllIslands().then(islands => {
      this.populateLayers(oileain.coasts);
    });
  }

  populateLayers(coasts: Array<Coast>) {
    coasts.forEach(coast => {
      let layer = populateMapLayer(coast);
      this.overlays[coast.title] = layer;
    });
    for (let title in this.overlays) {
      this.imap.addLayer(this.overlays[title]);
    }
    L.control.layers(this.baseLayers, this.overlays).addTo(this.imap);
  }

  attached() {
    this.imap = L.map('map', {
      center: [53.2734, -7.7783203],
      zoom: 8,
      minZoom: 7,
      layers: [this.baseLayers.Terrain],
    });
   // L.control.layers(this.baseLayers, this.overlays).addTo(this.imap);
  }

}