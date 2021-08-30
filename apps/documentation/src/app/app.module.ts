import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconModule } from '@ng-icons/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgIconModule.withIcons({})],
  bootstrap: [AppComponent],
})
export class AppModule {}
