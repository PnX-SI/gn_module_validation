import {
  Component,
  OnInit,
  Input,
  ViewChild,
  HostListener,
  AfterContentChecked,
  OnChanges,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

import { Map,
         GeoJSON,
         Layer,
         FeatureGroup,
         Marker,
         LatLng
} from 'leaflet';

import { MapListService } from '@geonature_common/map-list/map-list.service';
import { MapService } from '@geonature_common/map/map.service';
import { DataService } from '../../services/data.service';
//import { SyntheseFormService } from '../../services/form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@geonature_common/service/common.service';
import { ModuleConfig } from '../../module.config';
//import { HttpParams } from '@angular/common/http/src/params';
import { DomSanitizer } from '@angular/platform-browser';
//import { SyntheseModalDownloadComponent } from './modal-download/modal-download.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
//import { ModalInfoObsComponent } from './modal-info-obs/modal-info-obs.component';
import { CommonModule } from '@angular/common';
import { ValidationPopupComponent } from '../validation-popup/validation-popup.component';
import { ValidationComponent } from '../validation.component'
import { Subscription } from 'rxjs';


@Component({
  selector: 'pnx-validation-synthese-list',
  templateUrl: 'validation-synthese-list.component.html',
  styleUrls: ['validation-synthese-list.component.scss']
})

export class ValidationSyntheseListComponent implements OnInit, OnChanges, AfterContentChecked {

  public VALIDATION_CONFIG = ModuleConfig;
  selectedObs : Array<number> = []; // list of id_synthese values for selected rows
  coordinates_list = []; // list of coordinates for selected rows
  group: featureGroup;
  marker: marker;
  public rowNumber: number;
  private _latestWidth: number;
  public id_same_coordinates = []; // list of observation ids having same geographic coordinates


  @Input() inputSyntheseData: GeoJSON;
  @ViewChild('table') table: DatatableComponent;

  constructor(
    public mapListService: MapListService,
    private _ds: DataService,
    public ngbModal: NgbModal,
    private _commonService: CommonService,
    //private _fs: SyntheseFormService,
    public sanitizer: DomSanitizer,
    public ref: ChangeDetectorRef,
    private _ms: MapService
  ) {}

  ngOnInit() {
    // get wiewport height to set the number of rows in the tabl
    const h = document.documentElement.clientHeight;
    this.rowNumber = Math.trunc(h / 37);

    this.group = new L.featureGroup();
    this.onMapClick();
    this.onTableClick();
    console.log(this.mapListService);
  }

  action() {
    console.log('à faire');
  }

  onMapClick() {
    this.mapListService.onMapClik$.subscribe(
      id => {
        // create list of observation ids having coordinates = to id value
        const selected_id_coordinates = this.mapListService.layerDict[id].feature.geometry.coordinates;
        this.id_same_coordinates = [];
        for (let obs in this.mapListService.geojsonData.features) {
          if (JSON.stringify(selected_id_coordinates) == JSON.stringify(this.mapListService.geojsonData.features[obs].geometry.coordinates)) {
            this.id_same_coordinates.push(parseInt(this.mapListService.geojsonData.features[obs].id));
          }
        }
        // select rows having id_synthese = to one of the id_same_coordinates values
        this.mapListService.selectedRow = [];
        for (let id of this.id_same_coordinates) {
          for (let i = 0; i < this.mapListService.tableData.length; i++) {
            if (this.mapListService.tableData[i]['id_synthese'] === id) {
              this.mapListService.selectedRow.push(this.mapListService.tableData[i]);
            }
          }
        }
        this.setSelectedObs();
      }
    );
  }


  onTableClick() {
    this.setSelectedObs();
    this.mapListService.onTableClick$.subscribe(
      id => {
        this.setSelectedObs();
        this.setOriginStyleToAll();
        this.setSelectedSyleToSelectedRows();
      }
    );
  }


  ngAfterContentChecked() {
    if (this.table && this.table.element.clientWidth !== this._latestWidth) {
      this._latestWidth = this.table.element.clientWidth;
    }
  }

  setOriginStyleToAll() {
    for (let obs in this.mapListService.layerDict) {
      this.mapListService.layerDict[obs].setStyle(this.VALIDATION_CONFIG.MAP_POINT_STYLE.originStyle);
    }
  }

  setSelectedSyleToSelectedRows() {
    for (let obs of this.selectedObs) {
      this.mapListService.layerDict[obs].setStyle(this.VALIDATION_CONFIG.MAP_POINT_STYLE.selectedStyle);
    }
  }

  selectAll() {
    this.mapListService.selectedRow = [...this.mapListService.tableData];
    this.setSelectedObs();
    this.viewFitList(this.selectedObs);
    this.setSelectedSyleToSelectedRows();
  }

  deselectAll() {
    this.mapListService.selectedRow = [];
    this.setSelectedObs();
    if (this.mapListService.selectedRow.length === 0) {
      this.setOriginStyleToAll();
    }
  }

  onActivate(event) {
    if (event.type == 'checkbox' || event.type == 'click') {
      this.setSelectedObs();
      this.viewFitList(this.selectedObs);
      if (this.mapListService.selectedRow.length === 0) {
        this.setOriginStyleToAll();
      }
    }
  }

  setFeatureGroup(observations) {
    for (let obs of observations) {
      if (this.mapListService.layerDict[obs].feature.geometry.type === 'Polygon') {
        let coordinates = this.mapListService.layerDict[obs].feature.geometry.coordinates[0];
        for (let coord of coordinates) {
          this.marker = new L.marker([coord[1],coord[0]);
          this.marker.addTo(this.group);
          this.coordinates_list.push(JSON.stringify(coord));
        }
      } else {
        let coordinates = this.mapListService.layerDict[obs].feature.geometry.coordinates;
        if (this.coordinates_list.indexOf(JSON.stringify(coordinates)) == -1) {
          this.marker = new L.marker([coordinates[1],coordinates[0]);
          this.marker.addTo(this.group);
          this.coordinates_list.push(JSON.stringify(coordinates));
        }
      }
    }
  }

  setView() {
    if (this.coordinates_list.length > 1) {
      this._ms.getMap().fitBounds(this.group.getBounds());
    } else {
      this._ms.getMap().setView(this.marker.getLatLng(), 12);
    }
  }

  viewFitList(observations) {
    this.setFeatureGroup(observations);
    this.setView();
    this.group = L.featureGroup();
    this.coordinates_list = [];
  }

  setSelectedObs() {
    // array of id_sythese values of selected observations
    this.selectedObs = [];
    if (this.mapListService.selectedRow.length === 0) {
      this.selectedObs = [];
    } else {
      for (let obs in this.mapListService.selectedRow) {
        this.selectedObs.push(this.mapListService.selectedRow[obs]['id_synthese']);
      }
    }

  }

  onStatusChange(status) {
    console.log(status);
    for (let obs in this.mapListService.selectedRow) {
      this.mapListService.selectedRow[obs]['id_nomenclature_valid_status'] = status;
      this.mapListService.selectedRow[obs]['validation_auto'] = '';
    }
    this.mapListService.selectedRow = [...this.mapListService.selectedRow];
  }

  // update the number of row per page when resize the window
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.rowNumber = Math.trunc(event.target.innerHeight / 37);
  }

  backToModule(url_source, id_pk_source) {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = url_source + '/' + id_pk_source;
    link.setAttribute('visibility', 'hidden');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  getRowClass() {
    return 'row-sm clickable';
  }

  ngOnChanges(changes) {
    if (changes.inputSyntheseData && changes.inputSyntheseData.currentValue) {
      // reset page 0 when new data appear
      this.table.offset = 0;
    }
    this.nbTotalObservation = this.mapListService.tableData.length;
  }


}
