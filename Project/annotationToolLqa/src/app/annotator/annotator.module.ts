import { CommonModule }   from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatComponent } from './rat/rat.component';
import { MouseWheelDirective } from './control/mousewheel.directive';
import { HttpModule } from '@angular/http';
import { WorkComponent }    from './work/work.component';
import { AnnotatorRoutingModule } from './annotator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AnnotatorRoutingModule,
    HttpModule
  ],
  declarations: [
    WorkComponent, 
    RatComponent,
    MouseWheelDirective
  ]
})
export class AnnotatorModule {}