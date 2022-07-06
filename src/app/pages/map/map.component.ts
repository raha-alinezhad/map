import { AfterViewInit, Component } from '@angular/core';
import { LeafletMap } from 'src/app/classes/LeafletMap';
import { MapService } from 'src/app/services/map.service';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map: LeafletMap;
  constructor(private reactivService: MapService,
    public router: Router) {
    this.map = new LeafletMap();
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.map.popupOpenSubject.subscribe(() => {
      const elements = document.getElementById('test');
      elements.addEventListener('click', this.routeToLoc.bind(this));
    })
  }
  initMap() {
    this.map.setCenter([35.775102, 51.423911]);
    this.map.initMap('ex_map');
    this.drawLocationsOnMap();
  }

  drawLocationsOnMap() {

    const markers = [];
    this.reactivService.markers.map(data => {

      const markerIcon = L.icon({
        iconUrl: data.logo,
        className: 'avatar-marker',
        iconSize: [35, 35],
        iconAnchor: [17, 15]
      });
      const loc: L.LatLngTuple = data.latLng;
      const marker = L.marker(loc, { icon: markerIcon });
      let popup = '<div> <div class="font-weight-bold">' + data.name + '</div>';
      // popup += '<button class="popup-btn">Close</button>';
      popup += '<button id="test" data-title="' + data.name + '" class="popup-btn">Edit</button>';
      popup += '</div>';

      marker.bindPopup(popup);
      markers.push(marker);
    });
    if (markers && markers.length > 0) {
      this.map.markersLayer = L.layerGroup(markers);
      this.map.markersLayer.addTo(this.map.OSMap);
    }
  };
  routeToLoc(event) {
    this.router.navigateByUrl("/loc/" + event.currentTarget.dataset.title)
  }
}
