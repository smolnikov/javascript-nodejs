var about = webpackJsonp_name_([ 12 ], {
0: function(t, e, n) {
"use strict";
n(67);
var r = n(52);
L.Google = L.Class.extend({
includes: L.Mixin.Events,
options: {
minZoom: 0,
maxZoom: 18,
tileSize: 256,
subdomains: "abc",
errorTileUrl: "",
attribution: "",
opacity: 1,
continuousWorld: !1,
noWrap: !1
},
initialize: function(t, e) {
L.Util.setOptions(this, e), this._type = google.maps.MapTypeId[t || "SATELLITE"];
},
onAdd: function(t, e) {
this._map = t, this._insertAtTheBottom = e, this._initContainer(), this._initMapObject(), 
t.on("viewreset", this._resetCallback, this), this._limitedUpdate = L.Util.limitExecByInterval(this._update, 150, this), 
t.on("move", this._update, this), this._reset(), this._update();
},
onRemove: function() {
this._map._container.removeChild(this._container), this._map.off("viewreset", this._resetCallback, this), 
this._map.off("move", this._update, this);
},
getAttribution: function() {
return this.options.attribution;
},
setOpacity: function(t) {
this.options.opacity = t, 1 > t && L.DomUtil.setOpacity(this._container, t);
},
_initContainer: function() {
var t = this._map._container, e = t.firstChild;
this._container || (this._container = L.DomUtil.create("div", "leaflet-google-layer leaflet-top leaflet-left"), 
this._container.id = "_GMapContainer"), t.insertBefore(this._container, e), this.setOpacity(this.options.opacity);
var n = this._map.getSize();
this._container.style.width = n.x + "px", this._container.style.height = n.y + "px";
},
_initMapObject: function() {
this._google_center = new google.maps.LatLng(0, 0);
var t = new google.maps.Map(this._container, {
center: this._google_center,
zoom: 0,
mapTypeId: this._type,
disableDefaultUI: !0,
keyboardShortcuts: !1,
draggable: !1,
disableDoubleClickZoom: !0,
scrollwheel: !1,
streetViewControl: !1,
styles: [ {
featureType: "all",
elementType: "all",
stylers: [ {
weight: .1
}, {
hue: "#a39b00"
}, {
saturation: -85
}, {
lightness: 0
}, {
gamma: 1.1
} ]
}, {
featureType: "water",
elementType: "geometry.fill",
stylers: [ {
hue: "#226c94"
}, {
saturation: 8
}, {
lightness: -10
} ]
} ]
}), e = this;
this._reposition = google.maps.event.addListenerOnce(t, "center_changed", function() {
e.onReposition();
}), t.backgroundColor = "#ff0000", this._google = t;
},
_resetCallback: function(t) {
this._reset(t.hard);
},
_reset: function() {
this._initContainer();
},
_update: function() {
this._resize();
var t = this._map.getBounds(), e = t.getNorthEast(), n = t.getSouthWest(), r = (new google.maps.LatLngBounds(new google.maps.LatLng(n.lat, n.lng), new google.maps.LatLng(e.lat, e.lng)), 
this._map.getCenter()), i = new google.maps.LatLng(r.lat, r.lng);
this._google.setCenter(i), this._google.setZoom(this._map.getZoom());
},
_resize: function() {
var t = this._map.getSize();
(this._container.style.width != t.x || this._container.style.height != t.y) && (this._container.style.width = t.x + "px", 
this._container.style.height = t.y + "px", google.maps.event.trigger(this._google, "resize"));
},
onReposition: function() {}
}), e.init = function() {
var t = new L.Map("map", {
center: new L.LatLng(54.231473, 37.734144),
zoom: 5,
attributionControl: !1,
scrollWheelZoom: !1,
markerZoomAnimation: !1
}), e = new L.Google("TERRAIN");
t.addLayer(e);
for (var n in r) (function(e) {
var n = L.circleMarker([ r[e].location.lat - .01, r[e].location.lng ], {
radius: r[e].radius / 3e3,
stroke: !1,
opacity: 1,
fill: !0,
clickable: !1,
fillColor: "#C13335",
fillOpacity: 1
});
t.addLayer(n);
})(n);
};
},
52: function(t) {
"use strict";
t.exports = {
"Москва": {
location: {
lat: 55.755826,
lng: 37.6173
},
radius: 3e4
},
"Екатеринбург": {
location: {
lat: 56.83892609999999,
lng: 60.6057025
},
radius: 2e4
},
"Ярославль": {
location: {
lat: 57.62607440000001,
lng: 39.8844708
},
radius: 18e3
},
"Новосибирск": {
location: {
lat: 55.00835259999999,
lng: 82.9357327
},
radius: 18e3
},
"Казань": {
location: {
lat: 55.790278,
lng: 49.134722
},
radius: 18e3
},
"Самара": {
location: {
lat: 53.202778,
lng: 50.140833
},
radius: 18e3
},
"Пермь": {
location: {
lat: 58.00000000000001,
lng: 56.316667
},
radius: 2e4
},
"Белгород": {
location: {
lat: 50.5997134,
lng: 36.5982621
},
radius: 18e3
},
"Ростов-на-Дону": {
location: {
lat: 47.23333299999999,
lng: 39.7
},
radius: 18e3
},
"Санкт-Петербург": {
location: {
lat: 59.9342802,
lng: 30.3350986
},
radius: 2e4
},
"Калининград": {
location: {
lat: 54.716667,
lng: 20.516667
},
radius: 18e3
},
"Киев": {
location: {
lat: 50.4501,
lng: 30.5234
},
radius: 3e4
},
"Харьков": {
location: {
lat: 49.9935,
lng: 36.230383
},
radius: 3e4
},
"Днепропетровск": {
location: {
lat: 48.464717,
lng: 35.046183
},
radius: 25e3
},
"Одесса": {
location: {
lat: 46.482526,
lng: 30.7233095
},
radius: 22e3
},
"Львов": {
location: {
lat: 49.839683,
lng: 24.029717
},
radius: 18e3
},
"Херсон": {
location: {
lat: 46.635417,
lng: 32.616867
},
radius: 18e3
},
"Донецк": {
location: {
lat: 48.015883,
lng: 37.80285
},
radius: 18e3
},
"Винница": {
location: {
lat: 49.233083,
lng: 28.468217
},
radius: 22e3
},
"Минск": {
location: {
lat: 53.90453979999999,
lng: 27.5615244
},
radius: 2e4
}
};
},
67: function() {}
});
//# sourceMappingURL=about.59afeae4f68eec943557.js.map