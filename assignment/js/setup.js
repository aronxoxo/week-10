var map = L.map('map', {
  center: [39.9526, -75.1652],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var layerPolygon = 'https://aaronsu.cartodb.com/api/v2/viz/ed46115e-ffa2-11e5-a981-0e5db1731f59/viz.json';
var layerPoints = 'https://aaronsu.cartodb.com/api/v2/viz/e67b29f4-ffac-11e5-ae6c-0e5db1731f59/viz.json';
var subLayer;
cartodb.createLayer(map, layerPolygon)
  .addTo(map)
  .on('done', function(layer) {
    layer.on('featureClick', function(e, latlng, pos, data) {
    });
  }).on('error', function(err) {
  });
cartodb.createLayer(map, layerPoints)
  .addTo(map)
  .on('done', function(layer) {
    subLayer = layer.getSubLayer(0);
    subLayer.on('featureClick', function(e, latlng, pos, data) {
    });
  }).on('error', function(err) {
  });

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems
    },
    draw: {
      polyline: false,
      polygon: false,
      circle: false,
      marker: false,
      rectangle: true
    }
  });
var drawnLayerID;
map.addControl(drawControl);
map.on('draw:created', function (e) {
  var type = e.layerType;
  var layer = e.layer;

  polygonsWithin(layer._latlngs);

  if (drawnLayerID) { map.removeLayer(map._layers[drawnLayerID]); }

  map.addLayer(layer);
  drawnLayerID = layer._leaflet_id;
});
