# Flick Map
A simple [Backbone.js](http://backbonejs.org/) web app that allows you to search for geotagged photos from [Flickr](http://www.flickr.com/) and shows them on [Google Maps](http://maps.google.co.uk).

## Why Backbone and not React?
Well, some of the google map features that accept custom html allow you to pass them a string or javascript dom element, this doesn't play well with React. You could get React to render your components to a string but then you lose the nice features that React provides and that's no fun. I did find a few awesome google map React component libraries, [react-google-maps](https://github.com/tomchentw/react-google-maps) and [react-googlemaps](https://github.com/pieterv/react-googlemaps) to name a couple, but they currently don't support the features I required for this app.

So backbone... Who knew that you could assign a javascript dom element to the `el` property of a backbone view?! This plays really nicely with google maps as you can use all the features of google maps and still have the ability to re-render your view on changes to your data!

## Setup
### Install
```
git clone git@github.com:rahulpatel/flick-map.git
cd flick-map
npm install # it may look like the process has locked up on node v0.12, just wait, it'll come around
```

### Runing the app
```
npm start
```
Visit http://localhost:8000

### Running the tests
```
npm test
```

## Todo
### Testing related
* WRITE MORE TESTS!
* Add support for jsdom or phantomjs to allow running tests via terminal
* Find a better way to stub the Google Maps API
* Add selenium tests
* Add travis to run tests on commit/pr/merge

### Tech debt
* Move configuration into config file (api keys, base urls, etc.)

### UXUI improvements
* Allow users to customise various aspects of searching Flickr (e.g. search accuracy, search context)
* Request image when user hovers over marker
* Improve the UI by making the search box more obvious
* Stop map from zooming out too far
* Better mobile support (e.g. info windows don't look too nice when on mobile, certain google map controls could be disabled/moved, search input looks a bit odd)
* Add support for more image services
