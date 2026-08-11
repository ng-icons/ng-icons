import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import * as remix from '@ng-icons/remixicon';

/**
 * The two drifting rows of icons under the hero.
 *
 * A fixed, statically imported selection rather than the catalog, so the
 * prerendered landing page ships with them already in the HTML and the browser
 * never fetches icon data to paint above the fold.
 */
const ROW_ONE = [
  remix.remixHomeLine,
  remix.remixUser3Line,
  remix.remixSettingsLine,
  remix.remixSearchLine,
  remix.remixHeartLine,
  remix.remixStarLine,
  remix.remixRocketLine,
  remix.remixBellLine,
  remix.remixCloudLine,
  remix.remixCameraLine,
  remix.remixFolderLine,
  remix.remixFileTextLine,
  remix.remixCalendar2Line,
  remix.remixMailLine,
  remix.remixChatSmile2Line,
  remix.remixMapPinLine,
  remix.remixShoppingBag3Line,
  remix.remixWalletLine,
  remix.remixBankCardLine,
  remix.remixBarChartBoxLine,
  remix.remixPieChart2Line,
  remix.remixTerminalBoxLine,
  remix.remixArchiveLine,
  remix.remixBracesLine,
  remix.remixGitBranchLine,
  remix.remixCodeBoxLine,
];

const ROW_TWO = [
  remix.remixBugLine,
  remix.remixDatabaseLine,
  remix.remixServerLine,
  remix.remixCpuLine,
  remix.remixSmartphoneLine,
  remix.remixMacbookLine,
  remix.remixPrinterLine,
  remix.remixHeadphoneLine,
  remix.remixMusicLine,
  remix.remixPlayCircleLine,
  remix.remixImageLine,
  remix.remixPaletteLine,
  remix.remixBrushLine,
  remix.remixMagicLine,
  remix.remixLightbulbLine,
  remix.remixFireLine,
  remix.remixGlobeLine,
  remix.remixCompassLine,
  remix.remixPlaneLine,
  remix.remixCarLine,
  remix.remixBikeLine,
  remix.remixLeafLine,
  remix.remixSunLine,
  remix.remixUmbrellaLine,
  remix.remixCupLine,
  remix.remixTrophyLine,
];

@Component({
  selector: 'app-icon-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  template: `
    @for (row of rows; track $index) {
      <div
        class="flex w-max gap-3 px-3"
        [class.animate-drift]="$first"
        [class.animate-drift-slow]="$last"
      >
        @for (icon of row; track $index) {
          <div
            class="border-line bg-bg-0 text-sub mob:size-23 flex size-17 shrink-0 items-center justify-center rounded-2xl border"
          >
            <ng-icon [svg]="icon" size="30px" />
          </div>
        }
      </div>
    }
  `,
  host: {
    'aria-hidden': 'true',
    class:
      'marquee-mask relative flex h-49 flex-col gap-3 overflow-hidden mob:h-75',
  },
})
export class IconMarquee {
  // Doubled so the -50% drift loops seamlessly.
  protected readonly rows = [
    [...ROW_ONE, ...ROW_ONE],
    [...ROW_TWO, ...ROW_TWO],
  ];
}
