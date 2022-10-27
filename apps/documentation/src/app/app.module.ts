import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrapGithub } from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { heroChevronRightMini } from '@ng-icons/heroicons/mini';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ heroChevronRightMini, bootstrapGithub }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
