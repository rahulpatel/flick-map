import PhotosCollection from './collections/PhotosCollection';
import MapView from './views/MapView';

export default class App {
  constructor() {
    this._initCollections();
    this._initViews();
  }

  _initCollections() {
    this._photosCollection = new PhotosCollection();
  }

  _initViews() {
    this._mapView = new MapView({
      collection: this._photosCollection
    });
  }

  start() {
    this._mapView.render();
  }
}
