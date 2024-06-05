/* eslint-disable @nx/enforce-module-boundaries */
import * as duotoneIcons from '@ng-icons/lets-icons/duotone';
import * as duotoneLineIcons from '@ng-icons/lets-icons/duotone-line';
import * as fillIcons from '@ng-icons/lets-icons/fill';
import * as lightIcons from '@ng-icons/lets-icons/light';
import * as regularIcons from '@ng-icons/lets-icons/regular';

describe('Lets Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(duotoneIcons)).toMatchSnapshot();
    expect(Object.keys(duotoneLineIcons)).toMatchSnapshot();
    expect(Object.keys(regularIcons)).toMatchSnapshot();
    expect(Object.keys(fillIcons)).toMatchSnapshot();
    expect(Object.keys(lightIcons)).toMatchSnapshot();
  });
});
