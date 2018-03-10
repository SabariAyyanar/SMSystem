import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { TransportComponent } from './components/transport/transport.component';
import { LibraryComponent } from './components/library/library.component';
import { HostelComponent } from './components/hostel/hostel.component';

const routes: Routes = [
  {path: 'hostel', component: HostelComponent},
  {path: 'library', component: LibraryComponent},
  {path: 'transport', component: TransportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
