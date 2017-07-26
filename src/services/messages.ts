import { Coast } from './poi';

export class CoastsUpdated {
  coasts: Array<Coast>;
  constructor(coasts: Array<Coast>) {
    this.coasts = coasts;
  }
}
export class PoiViewed {
  constructor(public poi){ }
}