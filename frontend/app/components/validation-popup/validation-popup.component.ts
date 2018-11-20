import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MapListService } from "@geonature_common/map-list/map-list.service";
import { NgbModal, NgbActiveModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import { ModuleConfig } from "../../module.config";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbModule, NgbdButtonsRadioreactive } from "@ng-bootstrap/ng-bootstrap";
//import { FILTERSLIST } from "./filters-list";
import { Router } from "@angular/router";
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { GeoJSON } from 'leaflet';


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
  //private isAccessOk: Boolean = false;

  @Input() observations : Array<number>;
  @Input() nbTotalObservation : number;
  @Output() valStatus: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private _dateParser: NgbDateParserFormatter,
    private _router: Router,
    private _fb: FormBuilder,
    public dataService: DataService,
    private toastr: ToastrService
    ) {
      //this.error = '';
      this.statusForm = this._fb.group({
        statut : ['', Validators.required],
        comment : ['']
      });
    }

  // faire un form.service.ts

  onSubmit(value) {
    this.string_observations = JSON.stringify(this.observations);
    const statusUrl = '/' + this.string_observations;
    return this.dataService.postStatus(value, statusUrl).toPromise()
    .then(
      data => {
        this.promiseResult = data as JSON;
        console.log('retour du post : ', this.promiseResult);
        return new Promise((resolve, reject) => {
            this.toastr.success('Changement(s) de statut de validation effectué(s)');
            this.update_status();
            resolve('data updated');
        }
      })
    .catch(
      err => {
        if (err.statusText === 'Unknown Error') {
          this.toastr.error('ERROR: IMPOSSIBLE TO CONNECT TO SERVER');
        } else {
          this.toastr.error(err.error);
        }
        reject()
      }
    )
    .then(
      data => {
        console.log(data);
        return new Promise((resolve, reject) => {
          this.closeModal();
          resolve('process finished');
      }
    })
    .then(
      data => {
        console.log(data);
      }
    );
  }

  update_status() {
    this.valStatus.emit(this.statusForm.controls['statut'].value);
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
    console.log(this.nbTotalObservation);

    this.modalRef = this.modalService.open(content, {
      centered: true, size: "lg", backdrop: 'static', centered: true, windowClass: 'dark-modal'
    });
  }

  closeModal() {
    this.statusForm.reset();
    this.modalRef.close();
  }

  //this.statusForm.controls['statut'].setValue('');
  //this.statusForm.controls['comment'].setValue('');

}
