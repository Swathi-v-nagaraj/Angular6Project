import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from './map.service';
import { GeoJson, FeatureCollection } from './map';


@Component({
  selector: 'map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})
export class MapBoxComponent implements OnInit{

  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 37.75;
  lng = -122.41;
  data = 'Default';

  // data
  source: any;
  markers: any;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    //service to get the JSON data of maps gro JSON
    this.markers = this.mapService.getMarkers()
    this.initializeMap()
  }

  private initializeMap() {
    //locate the user, if we increase the zoom level, can see the difference
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }

    this.buildMap()

  }

  //function which is responsible for configuring and drawing the map
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 1,
      center: [this.lng, this.lat]
    });

    // Add data from geo.JSON firebase data on map load
    this.map.on('load', (event) => {

      /// register source
      this.map.addSource('firebase', {
         type: 'geojson',
         data: {
           type: 'FeatureCollection',
           features: []
         }
      });

      // get source
      this.source = this.map.getSource('firebase')

      // subscribe to data from firebase and set data source
      this.markers.subscribe(markers => {
          this.addColor(markers.features);
          let data = new FeatureCollection(markers.features)
          this.source.setData(data);
      })

      /// create map layers with JSON data
      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'symbol',
        layout: {
          'text-field': '{name}',
          'text-size': 15,
          'text-transform': 'uppercase',
          'icon-image': 'rocket-15',
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': {'type': 'identity', 'property': 'color'},
          'text-halo-color': '#fff',
          'text-halo-width': 1
        }
      })

    })

  }

  //adding color parameter to JSON object, based on the status('ok','warning','error')
  addColor(data){
    for (let element of data){
      if(element.properties.state == 'ok'){
        element.properties['color'] = '#087E16';
      } else if(element.properties.state == 'warning'){
        element.properties['color'] = '#DE6110';
      }else if(element.properties.state == 'error'){
        element.properties['color'] = '#BE010C';
      }
    }
  }

  //a map function which feels like flying to the particular point
  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  }
 
}