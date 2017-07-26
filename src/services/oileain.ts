import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Coast, PointOfInterest } from './poi';
import { HttpClient } from 'aurelia-fetch-client';
import {resolve} from "url";
import {CoastsUpdated} from "./messages";

@inject(EventAggregator, HttpClient)
export class Oileain {
  coasts: Array<Coast>;
  ea: EventAggregator;
  http: HttpClient;
  islandMap = new Map<string, PointOfInterest>();
  coastMap = new Map<string, Coast>();

  constructor(ea, http) {
    this.ea = ea;
    this.http = http;
    // this.getAllIslands().then(coasts => {
    //   ea.publish(new CoastsUpdated(coasts));
    // });
  }

  getAllIslands() {
    if (this.coasts) {
      return new Promise((resolve, reject) => {
        resolve(this.coasts);
      });
    } else
      return (
        this.http
           .fetch('https://edeleastar.github.io/oileain-api/all.json')
          //.fetch('all.json')
          .then(response => response.json())
          .then(islands => {
            this.coasts = islands;
            this.createIndexes();
            return islands;
          })
      );
  }

  createIndexes() {
    this.coasts.forEach(coast => {
      this.coastMap.set(coast.variable, coast);
      coast.pois.forEach(poi => {
        poi.coast = coast;
        this.islandMap.set(poi.safeName, poi);
      });
    });
  }
}
