import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NgIconsModule } from '@ng-icons/core';
import { HeroCollection, HeroHome, HeroSearch } from '@ng-icons/heroicons';
import { OctMarkGithub, OctOctoface } from '@ng-icons/octicons';
import { FeatherFeather, FeatherShield } from '@ng-icons/feather-icons';
import { JamGlassFilled } from '@ng-icons/jam-icons';
import { RadixModulzLogo } from '@ng-icons/radix-icons';
import { TablerTools } from '@ng-icons/tabler-icons';
import { CssShapeHexagon } from '@ng-icons/css.gg';
import { IconCardComponent } from './components/icon-card/icon-card.component';
import { IconCardListComponent } from './components/icon-card-list/icon-card-list.component';
import { DashPipe } from './pipes/dash.pipe';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarItemComponent,
    NavigationBarComponent,
    IconCardComponent,
    IconCardListComponent,
    DashPipe,
    DialogComponent,
  ],
  exports: [
    SidebarComponent,
    SidebarItemComponent,
    NavigationBarComponent,
    IconCardComponent,
    IconCardListComponent,
    DashPipe,
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      HeroHome,
      HeroCollection,
      HeroSearch,
      OctMarkGithub,
      FeatherShield,
      FeatherFeather,
      JamGlassFilled,
      OctOctoface,
      RadixModulzLogo,
      TablerTools,
      CssShapeHexagon,
    }),
    FormsModule,
  ],
})
export class SharedModule {}
