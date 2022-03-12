import * as baselineIcons from '@ng-icons/material-icons/baseline';
import * as outlineIcons from '@ng-icons/material-icons/outline';
import * as roundIcons from '@ng-icons/material-icons/round';
import * as sharpIcons from '@ng-icons/material-icons/sharp';

describe('Material Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(baselineIcons)).toMatchSnapshot();
    expect(Object.keys(outlineIcons)).toMatchSnapshot();
    expect(Object.keys(roundIcons)).toMatchSnapshot();
    expect(Object.keys(sharpIcons)).toMatchSnapshot();
  });
});
