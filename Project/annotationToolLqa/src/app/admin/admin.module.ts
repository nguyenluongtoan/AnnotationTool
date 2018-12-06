import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ProjectComponent }           from './project/project.component';
import { TaskComponent }  from './task/task.component';
import { UserComponent }    from './user/user.component';
import { AdminRoutingModule }       from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { AgGridModule } from 'ag-grid-angular';
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    ProjectComponent,
    TaskComponent,
    UserComponent,
    AdminComponent,
    DashboardComponent,
    AssignTaskComponent
  ]
})
export class AdminModule {}