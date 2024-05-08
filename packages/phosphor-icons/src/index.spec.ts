import * as boldIcons from '@ng-icons/phosphor-icons/bold';
import * as duotoneIcons from '@ng-icons/phosphor-icons/duotone';
import * as fillIcons from '@ng-icons/phosphor-icons/fill';
import * as lightIcons from '@ng-icons/phosphor-icons/light';
import * as regularIcons from '@ng-icons/phosphor-icons/regular';
import * as thinIcons from '@ng-icons/phosphor-icons/thin';

describe('PhosphorIcons Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(boldIcons)).toMatchSnapshot();
    expect(Object.keys(duotoneIcons)).toMatchSnapshot();
    expect(Object.keys(fillIcons)).toMatchSnapshot();
    expect(Object.keys(lightIcons)).toMatchSnapshot();
    expect(Object.keys(regularIcons)).toMatchSnapshot();
    expect(Object.keys(thinIcons)).toMatchSnapshot();
  });
});
