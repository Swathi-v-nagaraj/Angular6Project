import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';

import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http:HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }

  lineChart1Url = '../../assets/data/map/geo.json';

  //service to make a call to the geo JSON file
  getMarkers() {
    return this.http.get(this.lineChart1Url);
  }


}