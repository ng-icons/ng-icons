import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import * as featherIcons from '@ng-icons/feather-icons';
import * as heroIcons from '@ng-icons/heroicons';
import * as jamIcons from '@ng-icons/jam-icons';
import * as octIcons from '@ng-icons/octicons';
import * as radixIcons from '@ng-icons/radix-icons';
import { AppComponent } from './app.component';
import { NgModelChangeDebouncedDirective } from './directives/debounce.directive';
import { DasherizePipe } from './pipes/dasherize.pipe';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DasherizePipe,
    SearchPipe,
    NgModelChangeDebouncedDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ClipboardModule,
    NgIconsModule.withIcons({
      ...featherIcons,
      ...heroIcons,
      ...jamIcons,
      ...octIcons,
      ...radixIcons,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
