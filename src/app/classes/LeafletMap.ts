import * as L from 'leaflet';
import { Subject } from 'rxjs';

export class LeafletMap {
  OSMap: L.Map;
  static userLocation: L.LatLngExpression;
  rendered = false;
  centroid: L.LatLngExpression;
  markersLayer: L.Layer;
  popupOpenSubject = new Subject();

  constructor(
      center?: L.LatLngExpression) {
    if (center) {
      this.setCenter(center);
    }
  }

  initMap(elementId: string) {
    this.OSMap = L.map(elementId,
      {
        center: this.centroid,
        zoom: 14,
        scrollWheelZoom: false
      });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

    const markerBlue = L.icon({
      iconUrl: './assets/icons/marker.png',
      shadowUrl: 'leaf-shadow.png',

      iconSize: [25, 40],
      iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    });

    const centerMarker = L.marker(this.centroid, {
      autoPan: true,
      icon: markerBlue
    }).addTo(this.OSMap);
    centerMarker.bindPopup('Search location');

    this.OSMap.on('move', () => {
      centerMarker.setLatLng(this.OSMap.getCenter());
    });

    tiles.addTo(this.OSMap);
    this.OSMap.on('popupopen', () => {
      this.popupOpenSubject.next();

    });
  }
  setCenter(center?: L.LatLngExpression) {
    this.centroid = center;
  }
  setZoom(zoom: number) {
    this.OSMap.setZoom(zoom);
  }

  panToCenter() {
    this.OSMap.flyTo(this.centroid, 15);
  }
  routeToExp(){
    console.log("dddd")
  }
}
