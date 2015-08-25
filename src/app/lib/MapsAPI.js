import { Events } from 'backbone';

let MapsAPI = window.google.maps;

export default Object.assign({ }, Events, MapsAPI, {

  defaultCenter: { lat: 0, lng: 0 },

  initMap(container) {
    this._map = new this.Map(container, {
      zoom: 2,
      center: this.getLatLng(this.defaultCenter)
    });
    this.trigger('map:loaded');
    return this._map;
  },

  getMap() {
    return this._map;
  },

  addControl(container, position) {
    this.getMap().controls[this.ControlPosition[position]].push(container);
  },

  addMarker({ position, title }) {
    return new this.Marker({
      title,
      position: this.getLatLng(position)
    });
  },

  setupInfoWindow() {
    return new this.InfoWindow();
  },

  getLatLng({ lat, lng }) {
    return new this.LatLng(lat, lng);
  },

  getLatLngBounds() {
    return new this.LatLngBounds();
  }

});
