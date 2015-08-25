import assert from 'assert';
import sinon from 'sinon';

import App from '../../src/app/App';
import PhotosCollection from '../../src/app/collections/PhotosCollection';
import MapView from '../../src/app/views/MapView';

describe('App', function() {

  beforeEach(function() {
    this.app = new App();
  });

  describe('constructor()', function() {
    it('initialises the photos collection', function() {
      assert.ok(this.app._photosCollection instanceof PhotosCollection);
    });

    it('initialises the map view passing in the photos collection', function() {
      assert.ok(this.app._mapView instanceof MapView);
      assert.deepEqual(this.app._mapView.collection, this.app._photosCollection);
    });
  });

  describe('start()', function() {
    beforeEach(function() {
      sinon.stub(this.app._mapView, 'render');
      this.app.start();
    });

    afterEach(function() {
      this.app._mapView.render.restore();
    });

    it('renders the map view', function() {
      sinon.assert.called(this.app._mapView.render);
    });
  });
});
