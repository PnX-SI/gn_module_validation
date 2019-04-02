import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MapListService } from "@geonature_common/map-list/map-list.service";
import { NgbModal, NgbActiveModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import { ModuleConfig } from "../../module.config";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbModule, NgbdButtonsRadioreactive } from "@ng-bootstrap/ng-bootstrap";
//import { FILTERSLIST } from "./filters-list";
import { Router } from "@angular/router";
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { GeoJSON } from 'leaflet';
import { ValidationDefinitionsComponent } from './validation-definitions/ValidationDefinitionsComponent';


@Component({
  selector: "pnx-validation-popup",
  templateUrl: "validation-popup.component.html",
  styleUrls: ["./validation-popup.component.scss"],
  providers: [MapListService]
})
export class ValidationPopupComponent implements OnInit {

  error: any;
  public modalRef:any;
  string_observations: string;
  public statusForm: FormGroup;
  public VALIDATION_CONFIG = ModuleConfig;
  public status;
  public plurielObservations;
  public plurielNbOffPage;
  public nbOffPage;
  public validationDate;

  @Input() observations : Array<number>;
  @Input() selectedPages : Array<number>;
  @Input() nbTotalObservation : number;
  @Input() currentPage : any;
  @Input() status_names : any;
  @Input() status_keys : any;
  @Output() valStatus = new EventEmitter();
  @Output() valDate = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private _dateParser: NgbDateParserFormatter,
    private _router: Router,
    private _fb: FormBuilder,
    public dataService: DataService,
    private toastr: ToastrService,
    private mapListService: MapListService
    ) {
      // form used for changing validation status
      this.statusForm = this._fb.group({
        statut : ['', Validators.required],
        comment : ['']
      });
    }


  ngOnInit() {
  }
  

  onSubmit(value) {
    // post validation status form ('statusForm') for one or several observation(s) to backend/routes
    return this.dataService.postStatus(value, this.observations).toPromise()
    .then(
      data => {
        this.promiseResult = data as JSON;
        //console.log('retour du post : ', this.promiseResult);
        return new Promise((resolve, reject) => {
            // show success message indicating the number of observation(s) with modified validation status
            this.toastr.success('Vous avez modifié le statut de validation de ' + this.observations.length + ' observation(s)');
            // bind statut value with validation-synthese-list component
            this.update_status();
            this.getValidationDate(this.observations[0]);
            resolve('data updated');
        }
      })
    .catch(
      err => {
        if (err.statusText === 'Unknown Error') {
          // show error message if no connexion
          this.toastr.error('ERROR: IMPOSSIBLE TO CONNECT TO SERVER (check your connexion)');
        } else {
          // show error message if other server error
          this.toastr.error(err.error);
        }
        reject()
      }
    )
    .then(
      data => {
        //console.log(data);
        return new Promise((resolve, reject) => {
          // close validation status popup
          this.closeModal();
          resolve('process finished');
      }
    })
    .then(
      data => {
        //console.log(data);
      }
    );
  }

  update_status() {
    // send valstatus value to validation-synthese-list component
    this.valStatus.emit(this.statusForm.controls['statut'].value);
  }


  definePlurielObservations() {
    if (this.observations.length == 1) {
      return '';
    } else {
      return 's';
    }
  }

  definePlurielNbOffPage() {
    if (this.nbOffPage <= 1) {
      return '';
    } else {
      return 's';
    }
  }

  isAccess() {
    // disable access validation button if no row is checked
    if (this.observations.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  openVerticallyCentered(content) {
      // if no error : open popup for changing validation status
      this.modalRef = this.modalService.open(content, {
        centered: true, size: "lg", backdrop: 'static', windowClass: 'dark-modal'
      });
      this.getObsNboffPage();
      this.plurielObservations = this.definePlurielObservations();
      this.plurielNbOffPage = this.definePlurielNbOffPage();
  }

  getObsNboffPage() {
    this.nbOffPage = 0;
    for (let page of this.selectedPages) {
      if (page != this.currentPage) {
        this.nbOffPage = this.nbOffPage +1;
      } 
    }
  }

  closeModal() {
    // close validation status popup
    this.statusForm.reset();
    this.modalRef.close();
  }

  getValidationDate(id) {
    this.dataService.getValidationDate(id).subscribe(
      result => {
        // get status names
        this.validationDate = result;
      },
      err => {
        if (err.statusText === 'Unknown Error') {
          // show error message if no connexion
          this.toastr.error('ERROR: IMPOSSIBLE TO CONNECT TO SERVER (check your connexion)');
        } else {
          // show error message if other server error
          this.toastr.error(err.error);
        }
      },
      () => {
        this.valDate.emit(this.validationDate);
      }
    );
  }


}
