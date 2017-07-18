export interface GridRef {
  sheet: string;
  eastings: string;
  northings: string;
}

export interface GeoLocation {
  lat: number;
  long: number;
}

export class PointOfInterest {
  name: string;
  safeName: string;
  nameHtml: string;
  costalZone: string;
  grid: GridRef;
  geo: GeoLocation;
  cursor: number;
  description: string;
}

export interface Coast {
  title: string;
  variable: string;
  identifier: string;
  pois: Array<PointOfInterest>;
}
