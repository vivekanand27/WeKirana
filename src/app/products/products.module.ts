import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableExporterModule } from 'mat-table-exporter';

import { ProductCreateComponent} from './product-create/product-create.component';
import { ProductListComponent} from './product-list/product-list.component';

@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    MatTableExporterModule
  ]
})

export class ProductModule {
}
