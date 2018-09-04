import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GN2CommonModule } from "@geonature_common/GN2Common.module";
import { Routes, RouterModule } from "@angular/router";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Http } from "@angular/http";
import { DatatableComponent } from './validation-list/pager.component';

import { ValidationListComponent } from "./validation-list/validation-list.component";


const routes: Routes = [
  { path: "", component: ValidationListComponent }
];

@NgModule({
  imports: [CommonModule, GN2CommonModule, RouterModule.forChild(routes)],
  declarations: [
    ValidationListComponent, DatatableComponent
  ],
  providers: []
})

export class GeonatureModule {}
