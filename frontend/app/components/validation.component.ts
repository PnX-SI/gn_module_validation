import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MapListService } from '@geonature_common/map-list/map-list.service';
import { CommonService } from '@geonature_common/service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationSyntheseListComponent } from './validation-synthese-list/validation-synthese-list.component';
import { ValidationSyntheseCarteComponent } from './validation-synthese-carte/validation-synthese-carte.component';
//import { SyntheseFormService } from './services/form.service';
//import { SyntheseModalDownloadComponent } from './synthese-results/synthese-list/modal-download/modal-download.component';
import { AppConfig } from '@geonature_config/app.config';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'pnx-validation',
  styleUrls: ['validation.component.scss'],
  templateUrl: 'validation.component.html'
})

export class ValidationComponent implements OnInit {

  public serverData;
  public sameCoordinates: any;

  constructor(
    public searchService: DataService,
    private _mapListService: MapListService,
    private _commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const initialData = { limit: AppConfig.SYNTHESE.NB_LAST_OBS };
    this.loadAndStoreData(initialData);
  }

  loadAndStoreData(formatedParams) {
    this.searchService.dataLoaded = false;
    this.searchService.getSyntheseData(formatedParams).subscribe(
      result => {
        /*
        if (result['nb_obs_limited']) {
          const modalRef = this._modalService.open(SyntheseModalDownloadComponent, {
            size: 'lg'
          });
          const formatedParams = this._fs.formatParams();
          modalRef.componentInstance.queryString = this.searchService.buildQueryUrl(formatedParams);
          modalRef.componentInstance.tooManyObs = true;
        }
        */
        this._mapListService.geojsonData = result['data'];
        this._mapListService.loadTableData(result['data'], this.customColumns.bind(this));
        this._mapListService.idName = 'id_synthese';

        this.searchService.dataLoaded = true;
        this.serverData = result['data'];
      },
      error => {
        this.searchService.dataLoaded = true;
        if (error.status !== 403) {
          this._commonService.translateToaster('error', 'ErrorMessage');
        }
      }
    );
  }



  formatDate(unformatedDate) {
    const date = new Date(unformatedDate);
    return date.toLocaleDateString('fr-FR');
  }

  customColumns(feature) {
    // function pass to the LoadTableData maplist service function to format date
    if (feature.properties.validation_auto === true) {
      feature.properties.validation_auto = 'a';
    }
    if (feature.properties.validation_auto === false) {
      feature.properties.validation_auto = '';
    }
    if (feature.properties.date_min) {
      feature.properties.date_min = this.formatDate(feature.properties.date_min);
    }
    if (feature.properties.date_max) {
      feature.properties.date_max = this.formatDate(feature.properties.date_max);
    }
    return feature;
  }
}
