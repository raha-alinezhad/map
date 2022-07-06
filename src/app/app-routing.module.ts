import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loc',
    pathMatch: 'full'
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then(m => m.MapModule)
  },
  {
    path: 'loc',
    loadChildren: () => import('./pages/share-location-detail/share-location-detail.module').then(m => m.ShareLocationDetailModule)
  },
  {
    path: 'loc/:name',
    loadChildren: () => import('./pages/share-location-detail/share-location-detail.module').then(m => m.ShareLocationDetailModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}