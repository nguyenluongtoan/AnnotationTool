import { CommonModule }   from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatComponent } from './rat/rat.component';
import { MouseWheelDirective } from './control/mousewheel.directive';
import { HttpModule } from '@angular/http';
import { WorkComponent }    from './work/work.component';
import { AnnotatorRoutingModule } from './annotator-routing.module';
import { AnnotatorComponent } from './annotator/annotator.component';

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
    MouseWheelDirective,
    AnnotatorComponent
  ]
})
export class AnnotatorModule {}