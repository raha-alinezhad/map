import { Injectable } from "@angular/core";
import { LocationVM } from "../models/location.model";

@Injectable({
    providedIn: 'root'
  })
  export class MapService {
    markers: LocationVM[] = [];

    constructor() {
    }

    addToMarkers(data: LocationVM){
        this.markers.push(data)
    }
  }