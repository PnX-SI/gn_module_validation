import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { GN2CommonModule } from "@geonature_common/GN2Common.module";
import { Routes, RouterModule } from "@angular/router";
import { ValidationComponent } from "./components/validation.component";
import { ValidationSyntheseListComponent } from "./components/validation-synthese-list/validation-synthese-list.component";
import { ValidationSyntheseCarteComponent } from "./components/validation-synthese-carte/validation-synthese-carte.component";
import { ValidationPopupComponent } from "./components/validation-popup/validation-popup.component";
import { ValidationDefinitionsComponent } from "./components/validation-definitions/validation-definitions.component";
//import { ValidationSearchComponent } from "./components/validation-search/validation-search.component";

import { DataService } from "./services/data.service";
//import { ValidationFormService } from "./services/form.service";
import { HttpClient } from '@angular/common/http';

// my module routing
const routes: Routes = [
  { path: '', component: ValidationComponent }
];

@NgModule({
  declarations: [
    ValidationComponent,
    ValidationSyntheseListComponent,
    ValidationSyntheseCarteComponent,
    ValidationPopupComponent,
    ValidationDefinitionsComponent,
    //ValidationSearchComponent
  ],
  imports: [GN2CommonModule, RouterModule.forChild(routes), CommonModule],
  providers: [DataService],
  bootstrap: []
})
export class GeonatureModule {}
