import { provideIcons } from '@ng-icons/core';
import {
  remixAlertLine,
  remixAngularjsFill,
  remixArrowRightSLine,
  remixArrowRightUpLine,
  remixArticleLine,
  remixBracesLine,
  remixCheckLine,
  remixCloseLine,
  remixCodeSLine,
  remixCompass3Line,
  remixDownloadLine,
  remixEqualizerLine,
  remixFileCopyLine,
  remixGithubFill,
  remixHeartFill,
  remixHeartLine,
  remixLayoutGridLine,
  remixLoader4Line,
  remixMenuLine,
  remixMoonLine,
  remixSearchLine,
  remixStackLine,
  remixSunLine,
} from '@ng-icons/remixicon';

/**
 * The icons the site's own chrome uses. Registered once and imported wherever
 * needed, which also keeps the site honest: it renders its own icons through
 * `<ng-icon>` like any consumer would.
 */
export const provideUiIcons = () =>
  provideIcons({
    remixAlertLine,
    remixAngularjsFill,
    remixArrowRightSLine,
    remixArrowRightUpLine,
    remixArticleLine,
    remixBracesLine,
    remixCheckLine,
    remixCloseLine,
    remixCodeSLine,
    remixCompass3Line,
    remixDownloadLine,
    remixEqualizerLine,
    remixFileCopyLine,
    remixGithubFill,
    remixHeartFill,
    remixHeartLine,
    remixLayoutGridLine,
    remixLoader4Line,
    remixMenuLine,
    remixMoonLine,
    remixSearchLine,
    remixStackLine,
    remixSunLine,
  });
