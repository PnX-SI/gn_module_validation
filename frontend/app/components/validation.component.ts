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

  constructor(
    public searchService: DataService,
    private _mapListService: MapListService,
    private _commonService: CommonService,
    private toastr: ToastrService

    //private _modalService: NgbModal,
    //private _fs: SyntheseFormService
  ) {}

  ngOnInit() {
    //const initialData = { limit: AppConfig.SYNTHESE.NB_LAST_OBS };
    this.loadAndStoreData();
  }

  /*
  ngOnInit() {
    this.searchService.getSyntheseData().subscribe(
      data => {
        console.log('preparation reception');
        this.serverData = data as JSON;
        console.log(this.serverData);
      },

      error => {},
      () => {
        console.log('terminé');
      }
    );
  }
  */

  loadAndStoreData() {
    this.searchService.dataLoaded = false;
    this.searchService.getSyntheseData().subscribe(
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
    // and nomenclature code on the table
    // must return a feature
    if(feature.properties.id_nomenclature_valid_status === 466) {
      feature.properties.id_nomenclature_valid_status = 'En attente de validation';
    }
    if(feature.properties.id_nomenclature_valid_status === 318) {
      feature.properties.id_nomenclature_valid_status = 'Certain - très probable';
    }
    if(feature.properties.id_nomenclature_valid_status === 319) {
      feature.properties.id_nomenclature_valid_status = 'Probable';
    }
    if(feature.properties.id_nomenclature_valid_status === 320) {
      feature.properties.id_nomenclature_valid_status = 'Douteux';
    }
    if(feature.properties.id_nomenclature_valid_status === 321) {
      feature.properties.id_nomenclature_valid_status = 'Invalide';
    }
    if(feature.properties.id_nomenclature_valid_status === 322) {
      feature.properties.id_nomenclature_valid_status = 'Non réalisable';
    }
    if(feature.properties.id_nomenclature_valid_status === 323) {
      feature.properties.id_nomenclature_valid_status = 'Inconnu';
    }
    if(feature.properties.id_nomenclature_valid_status === 466) {
      feature.properties.id_nomenclature_valid_status = 'En attente de validation';
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
