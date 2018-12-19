import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { FormService } from '../../services/form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from '@geonature_config/app.config';
import { MapService } from '@geonature_common/map/map.service';
import {
  TreeComponent,
  TreeModel,
  TreeNode,
  TREE_ACTIONS,
  IActionMapping,
  ITreeOptions
} from 'angular-tree-component';
import { ValidationTaxonAdvancedModalComponent } from './validation-taxon-advanced/validation-taxon-advanced.component';
import { ValidationTaxonAdvancedStoreService } from './validation-taxon-advanced/validation-taxon-advanced-store.service';

@Component({
  selector: 'pnx-validation-search',
  templateUrl: 'validation-search.component.html',
  styleUrls: ['validation-search.component.scss'],
  providers: []
})

export class ValidationSearchComponent implements OnInit {

  public AppConfig = AppConfig;

  public taxonApiEndPoint = `${AppConfig.API_ENDPOINT}/validation/taxons_autocomplete`;
  @Output() searchClicked = new EventEmitter();
  constructor(
    public dataService: DataService,
    public formService: FormService,
    public ngbModal: NgbModal,
    public mapService: MapService,
    private _storeService: ValidationTaxonAdvancedStoreService
  ) {}

  ngOnInit() {
    //console.log(this.AppConfig.SYNTHESE);
  }

  onSubmitForm() {
    // mark as dirty to avoid set limit=100 when download
    this.formService.searchForm.markAsDirty();
    const updatedParams = this.formService.formatParams();
    this.searchClicked.emit(updatedParams);
  }

  refreshFilters() {
    this.formService.selectedtaxonFromComponent = [];
    this.formService.selectedCdRefFromTree = [];
    this.formService.searchForm.reset();

    // refresh taxon tree
    this._storeService.taxonTreeState = {};

    // remove layers draw in the map
    this.mapService.removeAllLayers(this.mapService.map, this.mapService.releveFeatureGroup);
  }

  openModal() {
    const taxonModal = this.ngbModal.open(ValidationTaxonAdvancedModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
  }
}
