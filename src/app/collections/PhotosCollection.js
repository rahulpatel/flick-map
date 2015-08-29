import { Collection } from 'backbone';
import { flickr } from '../config';
import MapsAPI from  '../lib/MapsAPI';
import Photo from '../models/Photo';

export default class PhotosCollection extends Collection {

  url() {
    return `${flickr.base}?method=flickr.photos.search&api_key=${flickr.key}&format=json&nojsoncallback=1&has_geo=1&extras=geo&text=${this.getSearchTerm()}`;
  }

  fetch(term) {
    this._term = term;
    super.fetch({ reset: true });
  }

  getSearchTerm() {
    return this._term;
  }

  getBounds() {
    let bounds = MapsAPI.getLatLngBounds();
    this.forEach((model) => {
      let marker = model.get('marker');
      bounds.extend(marker.getPosition());
    });
    return bounds;
  }

  parse(response) {
    return response.photos.photo.map((photo, index) => {
      return {
        id: index,
        title: photo.title,
        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
        location: {
          lat: photo.latitude,
          lng: photo.longitude
        },
        marker: MapsAPI.addMarker({
          position: { lat: photo.latitude, lng: photo.longitude },
          title: photo.title || `Photo ${index}`
        })
      };
    });
  }

}

PhotosCollection.prototype.model = Photo;
