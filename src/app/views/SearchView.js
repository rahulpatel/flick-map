import { View } from 'backbone';
import MapsAPI from '../lib/MapsAPI';

export default class SearchView extends View {

  constructor(props) {
    super(props);
    this._addEventListeners();
  }

  _addEventListeners() {
    this.listenTo(this.collection, 'request', () => {
      this._loading = true;
      this.render();
    });
    this.listenTo(this.collection, 'reset', () => {
      this._loading = false;
      this.render();
    });
  }

  _handleSearch(event) {
    let value = event.currentTarget.value;
    if (this.collection.getSearchTerm() == value || value == '') {
      return event.stopPropagation();
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this.collection.fetch(value);
    }, 600);
  }

  render() {
    if (!this._controlAdded) {
      MapsAPI.addControl(this.el, 'TOP_CENTER');
      this.el.innerHTML = `
        <div class="search-ui">
          <input class="search-input" type="text" placeholder="Enter your search term here..." />
          <img class="loading" src="http://v2.preloaders.net/preloaders/496/Flip%20Flop.gif" />
        </div>
      `;

      // Hand contol over to the input
      let input = this.$('input');
      this.setElement(input);
      this._controlAdded = true;
    }

    if (this._loading) {
      this.$el.prevObject.find('.loading').show();
    } else {
      this.$el.prevObject.find('.loading').hide();
    }
  }

}

SearchView.prototype.el = document.createElement('div');
SearchView.prototype.events = {
  keyup: '_handleSearch'
};
SearchView.prototype._controlAdded = false;
