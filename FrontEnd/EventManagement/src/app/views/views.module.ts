import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewsRoutingModule } from './views-routing.module';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    TabsModule,
  ]
})
export class ViewsModule { }
