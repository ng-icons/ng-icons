import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import * as featherIcons from '@ng-icons/feather-icons';
import * as heroIcons from '@ng-icons/heroicons';
import * as jamIcons from '@ng-icons/jam-icons';
import { AppComponent } from './app.component';
import { DasherizePipe } from './pipes/dasherize.pipe';

@NgModule({
  declarations: [AppComponent, DasherizePipe],
  imports: [
    BrowserModule,
    NgIconsModule.withIcons({
      ...featherIcons,
      ...heroIcons,
      ...jamIcons,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
