import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { ControlComponent } from './control/control.component';
import { BatComponent } from './bat/bat.component';
import { CatComponent } from './cat/cat.component';
import { RatComponent } from './rat/rat.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageViewComponent,
    ControlComponent,
    BatComponent,
    CatComponent,
    RatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
