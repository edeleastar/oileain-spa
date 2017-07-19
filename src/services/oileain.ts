import { inject } from 'aurelia-framework';
import AsyncHttpClient from './async-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import {Coast, PointOfInterest} from './poi';
import { CoastsUpdate } from './messages';
import { HttpClient } from 'aurelia-fetch-client';

@inject(AsyncHttpClient, EventAggregator, HttpClient)
export class Oileain {
  coasts: Array<Coast>;
  ac: AsyncHttpClient;
  ea: EventAggregator;
  http: HttpClient;
  islandMap = new Map<string, PointOfInterest>();

  constructor(ac, ea, http) {
    this.ac = ac;
    this.ea = ea;
    this.http = http;
    //this.getAll();
    //this.getAllIslands();
  }

  getAll() {
    this.ac.get('/all.json').then(res => {
      this.coasts = res.content;
      this.ea.publish(new CoastsUpdate(this.coasts));
    });
  }

  getAllIslands() {
    return this.http
      .fetch('all.json')
      .then(response => response.json())
      .then(islands => {
        this.coasts = islands;
        //this.ea.publish(new CoastsUpdate(this.coasts));
        this.createIslandMap();
        return islands;
      });
  }

  createIslandMap() {
    this.coasts.forEach(coast => {
      coast.pois.forEach(poi => {
        this.islandMap.set(poi.safeName, poi);
      });
    });
  }

  getCoast(coastName: string): Coast {
    let coast: Coast = null;
    const coasts = this.coasts.filter(coast => {
      if (coast.title == coastName) return coast;
    });
    if (coasts.length > 0) {
      coast = coasts[0];
    }
    return coast;
  }
}
