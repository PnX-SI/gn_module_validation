import { Component, Input} from "@angular/core";
import { MapListService } from "@geonature_common/map-list/map-list.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ModuleConfig } from "../../module.config";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
//import { FILTERSLIST } from "./filters-list";
import { Router } from "@angular/router";
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: "pnx-validation-popup",
  templateUrl: "validation-popup.component.html",
  styleUrls: ["./validation-popup.component.scss"],
  providers: [MapListService]
})
export class ValidationPopupComponent implements OnInit {

  //my_url: string;
  string_observations: string;
  public isError: Boolean;
  public displayColumns: Array<any>;
  public availableColumns: Array<any>;
  public pathEdit: string;
  public pathInfo: string;
  public idName: string;
  public apiEndPoint: string;
  //public validationConfig = ModuleConfig;
  //public formsDefinition = FILTERSLIST;
  //public dynamicFormGroup: FormGroup;
  public closeResult: string;
  public formsSelected = [];
  public modalForm: FormGroup;
  public tableMessages = {
    emptyMessage: "Aucune observation à afficher",
    totalMessage: "observation(s) au total"
  };
  advandedFilterOpen = false;

  @Input() observations : Array<number>;

  constructor(
    private modalService: NgbModal,
    //private mapListService: MapListService,
    private _dateParser: NgbDateParserFormatter,
    private _router: Router,
    private _fb: FormBuilder,
    public searchService: DataService,
    private toastr: ToastrService
    ) {
      this.modalForm = this._fb.group({
        status : ['', Validators.required],
        comment : ['']
        //mettre le statut actuel par défaut
      });
    }

  // faire un form.service.ts
  onSubmit(value: any) {
    console.log('Soumission des données à valider : ');
    this.postValidationStatus(value);
  }

  postValidationStatus(value) {
    this.string_observations = JSON.stringify(this.observations);
    console.log(this.string_observations);
    const statusUrl = '/validation/' + this.string_observations;
    this.searchService.postStatus(value, statusUrl)
      .subscribe(
        data => {
          console.log('Message de retour du serveur suite au HTTP Post du formulaire = ' + JSON.stringify(data));
        },
        (err) => {
          this.isError = true;
          console.log(err);
          //this.toastr.success('Le changement de statut de validation des observations ' + this.observations.toString() + ' a été modifié avec succès');
          this.toastr.warning("La modification du statut de validation a échoué, contactez l'administrateur web");
        },
        () => {
          console.log('fin de lenvoi');
          this.toastr.success('Le statut de validation a été modifié avec succès');
        }
      );
      this._router.navigate([ModuleConfig.api_url]);
      // this.modalService.close();
  }


  ngOnInit() {
    console.log('valeur observations : ', this.observations);
    });


    /*
    this.validationConfig = ModuleConfig;

    // columns to be default displayed
    this.mapListService.displayColumns = this.displayColumns;

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
  */

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg', backdrop: 'static' });
  }



  /*

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

  onDetailReleve(id_releve) {
    this._router.navigate(["validation/info", id_releve]);
  }

  customColumns(feature) {
    const date_min = new Date(feature.properties.date_min);
    const date_max = new Date(feature.properties.date_max);
    feature.properties.date_min = date_min.toLocaleDateString("fr-FR");
    feature.properties.date_max = date_max.toLocaleDateString("fr-FR");
    return feature;
  }

  refreshFilters() {
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
  */



}
