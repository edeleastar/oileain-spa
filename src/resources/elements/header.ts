import {bindable} from 'aurelia-framework';
import {Coast} from "../../services/poi";

export class BookList {
  @bindable coasts: Array<Coast>;
  @bindable coast: Coast;
}