import * as L from 'leaflet';

export class LocationVM {
    latLng: L.LatLngExpression;
    name: string;
    type: string;
    logo: Blob;
}