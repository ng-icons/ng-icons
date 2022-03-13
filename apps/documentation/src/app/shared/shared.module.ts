import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NgIconsModule } from '@ng-icons/core';
import { IonLogoIonic } from '@ng-icons/ionicons';
import {
  HeroCollection,
  HeroHome,
  HeroSearch,
} from '@ng-icons/heroicons/outline';
import { OctMarkGithub, OctOctoface } from '@ng-icons/octicons';
import { AkarRadish } from '@ng-icons/akar-icons';
import { FeatherFeather, FeatherShield } from '@ng-icons/feather-icons';
import { JamGlassFilled } from '@ng-icons/jam-icons';
import { RadixModulzLogo } from '@ng-icons/radix-icons';
import { TablerBrandGoogle, TablerTools } from '@ng-icons/tabler-icons';
import { IconoirIconoir } from '@ng-icons/iconoir';
import { BootstrapBootstrap } from '@ng-icons/bootstrap-icons';
import { CssShapeHexagon } from '@ng-icons/css.gg';
import { IconCardComponent } from './components/icon-card/icon-card.component';
import { IconCardListComponent } from './components/icon-card-list/icon-card-list.component';
import { DashPipe } from './pipes/dash.pipe';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogModule } from '@angular/cdk-experimental/dialog';
import { IconPageComponent } from './components/icon-page/icon-page.component';
import { CryptoBtc } from '@ng-icons/cryptocurrency-icons';
import { SimpleSimpleicons } from '@ng-icons/simple-icons';

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarItemComponent,
    NavigationBarComponent,
    IconCardComponent,
    IconCardListComponent,
    DashPipe,
    DialogComponent,
    IconPageComponent,
  ],
  exports: [
    SidebarComponent,
    SidebarItemComponent,
    NavigationBarComponent,
    IconCardComponent,
    IconCardListComponent,
    DashPipe,
    IconPageComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    NgIconsModule.withIcons({
      HeroHome,
      HeroCollection,
      HeroSearch,
      OctMarkGithub,
      FeatherShield,
      BootstrapBootstrap,
      FeatherFeather,
      JamGlassFilled,
      OctOctoface,
      RadixModulzLogo,
      TablerTools,
      CssShapeHexagon,
      AkarRadish,
      IonLogoIonic,
      TablerBrandGoogle,
      IconoirIconoir,
      CryptoBtc,
      SimpleSimpleicons,
    }),
    FormsModule,
  ],
})
export class SharedModule {}
