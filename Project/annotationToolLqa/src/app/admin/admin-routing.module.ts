import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent }           from './admin/admin.component';
import { ProjectComponent }           from './project/project.component';
import { TaskComponent }  from './task/task.component';
import { UserComponent }    from './user/user.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { AssignTaskComponent }  from './assign-task/assign-task.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'project', component: ProjectComponent },
          { path: 'task', component: TaskComponent },
          { path: 'assign-task', component: AssignTaskComponent },
          { path: 'user', component: UserComponent },
          { path: '', component: DashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}