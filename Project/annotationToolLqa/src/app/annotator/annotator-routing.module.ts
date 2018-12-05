import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkComponent }    from './work/work.component';

const annotatorRoutes: Routes = [
  { 
    path: '',
    component: WorkComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: WorkComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(annotatorRoutes)
  ],
  exports: [
    RouterModule
  ]
}) 
export class AnnotatorRoutingModule { }