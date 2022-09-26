import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/authGuard';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    //canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'events' },
      // { path: 'home', component: HomeComponent },
      {
        path: 'events',
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'locations',
        loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'auth',
        //component: LayoutComponent,
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      }
    ]
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
