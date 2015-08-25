import assert from 'assert';
import sinon from 'sinon';

import PhotosCollection from '../../../src/app/collections/PhotosCollection';
import MapsAPI from '../../../src/app/lib/MapsAPI';

describe('Photos Collection', function() {

  beforeEach(function() {
    this.collection = new PhotosCollection();
  });

  describe('url()', function() {

    beforeEach(function() {
      sinon.stub(this.collection, 'getSearchTerm');
      this.collection.url();
    });

    afterEach(function() {
      this.collection.getSearchTerm.restore();
    });

    it('gets the search term when generating the url', function() {
      sinon.assert.called(this.collection.getSearchTerm);
    });
  });

  describe('fetch()', function() {

    beforeEach(function() {
      this.collection.fetch('foo');
    });

    it('sets the new search term back to the collection', function() {
      assert.equal(this.collection._term, 'foo');
    });

    it('makes a request', function() {
      assert.equal(this.requests.length, 1);
    });
  });

  describe('getSearchTerm()', function() {

    beforeEach(function() {
      this.collection._term = 'foo';
      this.result = this.collection.getSearchTerm();
    });

    it('returns the search term', function() {
      assert.equal(this.result, 'foo');
    });
  });

  describe('getBounds()', function() {

    beforeEach(function() {
      this.collection.models.push({
        get: sinon.stub().returns(MapsAPI.addMarker({
          position: 'foo',
          title: 'bar'
        }))
      });
      this.collection.getBounds();
    });

    it('gets the marker from the model', function() {
      sinon.assert.calledWith(this.collection.models[0].get, 'marker');
    });

    it('extends the bounds', function() {
      sinon.assert.called(window.stubs.extend);
    });
  });

  describe('parse()', function() {

    beforeEach(function() {
      let response = {
        photos: {
          photo: [
            {
              title: 'foo',
              farm: 1,
              server: 2,
              id: 3,
              secret: 'bar',
              latitude: 123,
              longitude: 321
            }
          ]
        }
      };
      this.result = this.collection.parse(response);
    });

    it('generates the url correctly', function() {
      assert.equal(this.result[0].url, 'https://farm1.staticflickr.com/2/3_bar.jpg');
    });

    it('creates a marker', function() {
      sinon.assert.called(MapsAPI.Marker);
    });
  });

});
