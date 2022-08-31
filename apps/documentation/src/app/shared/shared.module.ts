import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AkarRadish } from '@ng-icons/akar-icons';
import { BootstrapBootstrap } from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { CryptoBtc } from '@ng-icons/cryptocurrency-icons';
import { CssShapeHexagon } from '@ng-icons/css.gg';
import { FeatherFeather, FeatherShield } from '@ng-icons/feather-icons';
import {
  HeroHome,
  HeroMagnifyingGlass,
  HeroRectangleStack,
} from '@ng-icons/heroicons/outline';
import { IconoirIconoir } from '@ng-icons/iconoir';
import { IonLogoIonic } from '@ng-icons/ionicons';
import { JamGlassFilled } from '@ng-icons/jam-icons';
import { OctMarkGithub } from '@ng-icons/octicons';
import { RadixModulzLogo } from '@ng-icons/radix-icons';
import { SimpleSimpleicons } from '@ng-icons/simple-icons';
import { TablerBrandGoogle, TablerTools } from '@ng-icons/tabler-icons';
import { TypInfinityOutline } from '@ng-icons/typicons';
import { DialogComponent } from './components/dialog/dialog.component';
import { IconCardListComponent } from './components/icon-card-list/icon-card-list.component';
import { IconCardComponent } from './components/icon-card/icon-card.component';
import { IconPageComponent } from './components/icon-page/icon-page.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarItemComponent,
    NavigationBarComponent,
    IconCardComponent,
    IconCardListComponent,
    DialogComponent,
    IconPageComponent,
  ],
  exports: [
    SidebarComponent,
    SidebarItemComponent,
    NavigationBarComponent,
    IconCardComponent,
    IconCardListComponent,
    IconPageComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    NgIconsModule.withIcons({
      HeroHome,
      HeroRectangleStack,
      HeroMagnifyingGlass,
      OctMarkGithub,
      FeatherShield,
      BootstrapBootstrap,
      FeatherFeather,
      JamGlassFilled,
      RadixModulzLogo,
      TablerTools,
      CssShapeHexagon,
      AkarRadish,
      IonLogoIonic,
      TablerBrandGoogle,
      IconoirIconoir,
      CryptoBtc,
      SimpleSimpleicons,
      TypInfinityOutline,
    }),
    FormsModule,
  ],
})
export class SharedModule {}
