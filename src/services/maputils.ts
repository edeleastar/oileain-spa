import * as L from 'leaflet';
import Map = L.Map;
import Layer = L.Layer;
import LayerGroup = L.LayerGroup;
import {Coast, PointOfInterest} from './poi';

export function populateMapLayer(coast: Coast): LayerGroup {
  let group = L.layerGroup([]);
  coast.pois.forEach(poi => {
    let marker = L.marker([poi.geo.lat, poi.geo.long]);

    marker.bindPopup(poi.description.substring (0,300) + `
      <a href='#/poi/${poi.safeName}'> ... More Details... </a>
    `);
    marker.addTo(group);
  });
  return group;
}

export function populateDetailLayer(poi : PointOfInterest): LayerGroup {
  let group = L.layerGroup([]);
  // coast.pois.forEach(poi => {
  //   let marker = L.marker([poi.geo.lat, poi.geo.long]);

    const popup = createPopup(poi.nameHtml, poi.geo.lat, poi.geo.long);
    this.imap.addLayer(popup);
    //popup.addTo(group);
    //marker.addTo(group);
//  });
  return group;
}

export function createPopup(text:string, lat:number, long: number, disabled = true) {

  const popup = L.popup({
    closeOnClick: !disabled,
    closeButton: !disabled,
    //offset: [-2, -38]
  }).setLatLng({lat:lat, lng:long})
  .setContent(text);

  return popup;
}

export function populateMapPoi(poi: PointOfInterest): LayerGroup {
  let group = L.layerGroup([]);
    let marker = L.marker([poi.geo.lat, poi.geo.long]);
    marker.bindPopup(poi.nameHtml);
    marker.addTo(group);


  return group;
}
