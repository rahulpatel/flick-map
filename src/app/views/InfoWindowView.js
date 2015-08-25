import { View } from 'backbone';
import MapsAPI from '../lib/MapsAPI';

export default class InfoWindowView extends View {

  constructor(props) {
    super(props);
    this._infoWindow = MapsAPI.setupInfoWindow();
  }

  close() {
    this._infoWindow.close();
  }

  render() {
    if (this._open) this.close();

    this.el.innerHTML = `
      <div class="info-window-ui">
        <h4>${this.model.get('title')}</h4>
        <img src="${this.model.get('url')}" />
      </div>
    `;

    this._infoWindow.setContent(this.el);
    this._infoWindow.open(MapsAPI.getMap(), this.marker);
    this._open = true;
  }

}

InfoWindowView.prototype.el = document.createElement('div');
InfoWindowView.prototype._open = false;
