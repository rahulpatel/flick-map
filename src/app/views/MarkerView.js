import { View } from 'backbone';
import MapsAPI from '../lib/MapsAPI';

export default class MarkerView extends View {

  constructor(props) {
    super(props);
    this._infoWindowView = props.infoWindowView;
    this._marker = props.model.get('marker');
    this._attachClickHandler();
  }

  _attachClickHandler() {
    this._marker.addListener('click', () => this._openInfoWindow());
  }

  _openInfoWindow() {
    this._infoWindowView.model = this.model;
    this._infoWindowView.marker = this._marker;
    this._infoWindowView.render();
  }

  remove() {
    this.model.get('marker').setMap(null);
    super.remove();
  }

  render() {
    this._marker.setMap(MapsAPI.getMap());
  }
}
