import * as L from 'leaflet';
import Map = L.Map;
import Layer = L.Layer;
import LayerGroup = L.LayerGroup;
import {Coast, PointOfInterest} from './poi';

export function populateMapLayer(coast: Coast): LayerGroup {
  let group = L.layerGroup([]);
  coast.pois.forEach(poi => {
    let marker = L.marker([poi.geo.lat, poi.geo.long]);
    marker.bindPopup(poi.description);
    marker.addTo(group);
  });
  return group;
}

export function populateMapPoi(poi: PointOfInterest): LayerGroup {
  let group = L.layerGroup([]);
    let marker = L.marker([poi.geo.lat, poi.geo.long]);
    marker.bindPopup(poi.description);
    marker.addTo(group);
  return group;
}
