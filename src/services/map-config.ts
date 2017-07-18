import * as L from 'leaflet';

export default class MapConfig {
  mbAttr = `Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,
            <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>`;

  mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

  // baseLayers = {
  //   Terrain: L.tileLayer(this.mbUrl, {
  //     id: 'mapbox.outdoors',
  //     attribution: this.mbAttr,
  //   }),
  //   Satellite: L.tileLayer(this.mbUrl, {
  //     id: 'mapbox.satellite',
  //     attribution: this.mbAttr,
  //   }),
  //};
}
