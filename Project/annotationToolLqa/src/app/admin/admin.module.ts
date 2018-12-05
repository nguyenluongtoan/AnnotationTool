import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ProjectComponent }           from './project/project.component';
import { TaskComponent }  from './task/task.component';
import { UserComponent }    from './user/user.component';
import { AdminRoutingModule }       from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    ProjectComponent,
    TaskComponent,
    UserComponent,
    AdminComponent,
    DashboardComponent
  ]
})
export class AdminModule {}