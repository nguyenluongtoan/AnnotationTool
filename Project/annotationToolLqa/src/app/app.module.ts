import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { ImageViewComponent } from './image-view/image-view.component';
//import { ControlComponent } from './control/control.component';
import { RatComponent } from './rat/rat.component';
import { MouseWheelDirective } from './control/mousewheel.directive';

@NgModule({
  declarations: [
    AppComponent,
    //ImageViewComponent,
    //ControlComponent,
    RatComponent,
    MouseWheelDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
