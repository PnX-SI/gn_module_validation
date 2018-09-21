import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MapListService } from "@geonature_common/map-list/map-list.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ModuleConfig } from "../module.config";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { FILTERSLIST } from "./filters-list";

@Component({
  selector: "pnx-validation-list",
  templateUrl: "validation-list.component.html",
  styleUrls: ["./validation-list.component.scss"],
  providers: [MapListService]
})
export class ValidationListComponent implements OnInit {
  public displayColumns: Array<any>;
  public availableColumns: Array<any>;
  public pathEdit: string;
  public pathInfo: string;
  public idName: string;
  public apiEndPoint: string;
  public validationConfig = ModuleConfig;
  public formsDefinition = FILTERSLIST;
  public dynamicFormGroup: FormGroup;
  public closeResult: string;
  public formsSelected = [];
  // provisoire
  public tableMessages = {
    emptyMessage: "Aucune observation à afficher",
    totalMessage: "observation(s) au total"
  };
  advandedFilterOpen = false;

  constructor(
    private mapListService: MapListService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _dateParser: NgbDateParserFormatter
  ) {}

  ngOnInit() {
    this.dynamicFormGroup = this._fb.group({
      cd_nom: null,
      observers: null,
      dataset: null,
      observers_txt: null,
      id_dataset: null,
      date_up: null,
      date_low: null,
      municipality: null
    });

    this.validationConfig = ModuleConfig;

    // parameters for maplist
    // columns to be default displayed
    this.mapListService.displayColumns = this.displayColumns;

    // columns available for display

    this.mapListService.availableColumns = this.validationConfig.available_maplist_column;

    this.idName = "id_releve_validation";
    this.mapListService.idName = this.idName;
    this.apiEndPoint = "validation/vreleve";

    // FETCH THE DATA
    this.mapListService.getData(
      "validation/vreleve",
      [{ param: "limit", value: 12 }],
      this.customColumns
    );
    // end OnInit
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg', backdrop: 'static' });
  }

  toggleAdvancedFilters() {
    this.advandedFilterOpen = !this.advandedFilterOpen;
  }

  closeAdvancedFilters() {
    this.advandedFilterOpen = false;
  }

  searchData() {
    this.mapListService.refreshUrlQuery(12);
    const params = [];
    for (let key in this.dynamicFormGroup.value) {
      let value = this.dynamicFormGroup.value[key];
      if (key === "cd_nom" && value) {
        value = this.dynamicFormGroup.value[key].cd_nom;
        params.push({ param: key, value: value });
      } else if ((key === "date_up" || key === "date_low") && value) {
        value = this._dateParser.format(this.dynamicFormGroup.value[key]);
        params.push({ param: key, value: value });
      } else if (key === "observers" && value) {
        this.dynamicFormGroup.value.observers.forEach(observer => {
          params.push({ param: "observers", value: observer.id_role });
        });
      } else if (value && value !== "") {
        params.push({ param: key, value: value });
      }
    }
    this.closeAdvancedFilters();
    this.mapListService.refreshData(this.apiEndPoint, "set", params);
  }

  customColumns(feature) {
    // function pass to the getData and the maplist service to format date
    // on the table
    // must return a feature
    const date_min = new Date(feature.properties.date_min);
    const date_max = new Date(feature.properties.date_max);
    feature.properties.date_min = date_min.toLocaleDateString("fr-FR");
    feature.properties.date_max = date_max.toLocaleDateString("fr-FR");
    return feature;
  }

  refreshFilters() {
    // this.taxonomyComponent.refreshAllInput();
    this.dynamicFormGroup.reset();
    this.mapListService.refreshUrlQuery(12);
  }

  toggle(col) {
    const isChecked = this.isChecked(col);
    if (isChecked) {
      this.mapListService.displayColumns = this.mapListService.displayColumns.filter(
        c => {
          return c.prop !== col.prop;
        }
      );
    } else {
      this.mapListService.displayColumns = [
        ...this.mapListService.displayColumns,
        col
      ];
    }
  }

  onChangeFilterOps(col) {
    // reset url query
    this.mapListService.urlQuery.delete(this.mapListService.colSelected.prop);
    this.mapListService.colSelected = col; // change filter selected
  }

  isChecked(col) {
    let i = 0;
    while (
      i < this.mapListService.displayColumns.length &&
      this.mapListService.displayColumns[i].prop !== col.prop
    ) {
      i = i + 1;
    }
    return i === this.mapListService.displayColumns.length ? false : true;
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  


}


