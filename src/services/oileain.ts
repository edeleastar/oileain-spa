import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Coast, PointOfInterest } from './poi';
import { HttpClient } from 'aurelia-fetch-client';
import {resolve} from "url";

@inject(EventAggregator, HttpClient)
export class Oileain {
  coasts: Array<Coast>;
  ea: EventAggregator;
  http: HttpClient;
  islandMap = new Map<string, PointOfInterest>();

  constructor(ea, http) {
    this.ea = ea;
    this.http = http;
  }

  getAllIslands() {
    if (this.coasts) {
      return new Promise((resolve, reject) => {
        resolve(this.coasts);
      });
    } else
      return (
        this.http
          //      .fetch('https://edeleastar.github.io/oileain-api/all.json')
          .fetch('all.json')
          .then(response => response.json())
          .then(islands => {
            this.coasts = islands;
            this.createIslandMap();
            return islands;
          })
      );
  }

  createIslandMap() {
    this.coasts.forEach(coast => {
      coast.pois.forEach(poi => {
        this.islandMap.set(poi.safeName, poi);
      });
    });
  }
}
