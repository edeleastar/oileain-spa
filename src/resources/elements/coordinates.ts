import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import {PointOfInterest} from '../../services/poi';

export class  Coordinates {
  @bindable poi: PointOfInterest;
}