import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { MapBoxComponent } from './map/map-box.component';
import { TableComponent } from './table/table.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path:'', redirectTo: '/map', pathMatch: 'full' },
  { path:'charts', component: ChartComponent },
  { path:'map', component: MapBoxComponent },
  { path:'table', component: TableComponent },
  { path: '**', component: PagenotfoundComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
