import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Map, GeoJSON, Layer, FeatureGroup, Marker, LatLng } from 'leaflet';
import { MapListService } from '@geonature_common/map-list/map-list.service';
import { MapService } from '@geonature_common/map/map.service';
import { leafletDrawOption } from '@geonature_common/map/leaflet-draw.options';
import { DataService } from '../../services/data.service';

//import { SyntheseFormService } from '../../services/form.service';


@Component({
  selector: 'pnx-validation-synthese-carte',
  templateUrl: 'validation-synthese-carte.component.html',
  styleUrls: ['validation-synthese-carte.component.scss'],
  providers: []
})
export class ValidationSyntheseCarteComponent implements OnInit, AfterViewInit {

  public leafletDrawOptions = leafletDrawOption;

  @Input() inputSyntheseData: GeoJSON;

  constructor(
    public mapListService: MapListService,
    private _ms: MapService,
    private _ds: DataService
    //public formService: SyntheseFormService
  ) {}


  ngOnInit() {
  }


  ngAfterViewInit() {
    // event from the list
    //this.mapListService.onTableClick(this._ms.getMap());
  }


  onEachFeature(feature, layer) {

    this.mapListService.layerDict[feature.id] = layer;

    layer.on({
      click: e => {
        // toggle style
        this.mapListService.toggleStyle(layer);
        // observable
        this.mapListService.mapSelected.next(feature.id);
      }
    });
  }

}
