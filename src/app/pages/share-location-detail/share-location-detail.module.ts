import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareLocationDetailComponent } from './share-location-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ShareLocationDetailComponent
  }
];


@NgModule({
  declarations: [ShareLocationDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ShareLocationDetailModule { }
