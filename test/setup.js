import 'babel/polyfill';
import sinon from 'sinon';

// Setup the global scope

// Humm, this needs to change
window.stubs = {
  getPosition: sinon.stub(),
  extend: sinon.stub()
};
window.google = {
  maps: {
    Map: sinon.stub().returns({
      controls: [ ]
    }),
    ControlPosition: {
      TOP_CENTER: 'TOP_CENTER'
    },
    Marker: sinon.stub().returns({
      getPosition: window.stubs.getPosition
    }),
    InfoWindow: sinon.stub(),
    LatLng: sinon.stub(),
    LatLngBounds: sinon.stub().returns({
      extend: window.stubs.extend
    })
  }
};

beforeEach(function() {
  // Swallow and requests the tests try and make
  this.xhr = sinon.useFakeXMLHttpRequest();
  var requests = this.requests = [];

  this.xhr.onCreate = function(xhr) {
    requests.push(xhr);
  };
});

afterEach(function() {
  this.xhr.restore();
});

// Require tests files, find a better way to do this!
require('./app/testApp');
require('./app/collections/testPhotosCollection');
