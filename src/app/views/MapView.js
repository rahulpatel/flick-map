import { View } from 'backbone';
import MapsAPI from '../lib/MapsAPI';
import SearchView from './SearchView';
import MarkerView from './MarkerView';
import InfoWindowView from './InfoWindowView';

export default class MapView extends View {

  constructor(props) {
    super(props);
    this._initViews();
    this._setupEventListeners();
  }

  _initViews() {
    this._views = {
      search: new SearchView({ collection: this.collection }),
      markers: [ ],
      infoWindow: new InfoWindowView()
    };
  }

  _setupEventListeners() {
    this.listenToOnce(MapsAPI, 'map:loaded', () => {
      MapsAPI.getMap().addListener('click', () => this._views.infoWindow.close());
      this._views.search.render();
    });
    this.listenTo(this.collection, 'request', this._removeMarkers);
    this.listenTo(this.collection, 'reset', this._addMarkers);
  }

  _addMarkers() {
    this.collection.forEach((model) => {
      let marker = new MarkerView({
        model: model,
        infoWindowView: this._views.infoWindow
      });
      this._views.markers.push(marker);
      marker.render();
    });

    let bounds = this.collection.getBounds();
    MapsAPI.getMap().fitBounds(bounds);
  }

  _removeMarkers() {
    this._views.markers.forEach((view) => view.remove());
    this._views.markers = [ ];
  }

  render() {
    MapsAPI.initMap(this.el);
  }
}

MapView.prototype.el = '#map-container';
