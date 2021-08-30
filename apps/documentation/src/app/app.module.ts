import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconModule } from '@ng-icons/core';
import { FeatherAirplay } from '@ng-icons/feather-icons';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgIconModule.withIcons({
      FeatherAirplay,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
