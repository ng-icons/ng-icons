import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { akarRadish } from '@ng-icons/akar-icons';
import { bootstrapBootstrap } from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { cryptoBtc } from '@ng-icons/cryptocurrency-icons';
import { cssShapeHexagon } from '@ng-icons/css.gg';
import { dripFlag } from '@ng-icons/dripicons';
import { featherFeather, featherShield } from '@ng-icons/feather-icons';
import {
  heroHome,
  heroMagnifyingGlass,
  heroRectangleStack,
} from '@ng-icons/heroicons/outline';
import { iconoirIconoir } from '@ng-icons/iconoir';
import { ionLogoIonic } from '@ng-icons/ionicons';
import { jamGlassFilled } from '@ng-icons/jam-icons';
import { octMarkGithub } from '@ng-icons/octicons';
import { radixModulzLogo } from '@ng-icons/radix-icons';
import { simpleSimpleicons } from '@ng-icons/simple-icons';
import { tablerBrandGoogle, tablerTools } from '@ng-icons/tabler-icons';
import { typInfinityOutline } from '@ng-icons/typicons';
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
      heroHome,
      heroRectangleStack,
      heroMagnifyingGlass,
      octMarkGithub,
      featherShield,
      bootstrapBootstrap,
      featherFeather,
      jamGlassFilled,
      radixModulzLogo,
      tablerTools,
      cssShapeHexagon,
      akarRadish,
      ionLogoIonic,
      tablerBrandGoogle,
      iconoirIconoir,
      cryptoBtc,
      simpleSimpleicons,
      typInfinityOutline,
      dripFlag,
    }),
    FormsModule,
  ],
})
export class SharedModule {}
