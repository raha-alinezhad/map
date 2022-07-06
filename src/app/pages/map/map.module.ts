import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  }
];

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MapModule { }
