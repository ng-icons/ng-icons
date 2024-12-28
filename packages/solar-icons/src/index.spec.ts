import * as boldDuotoneIcons from '../bold-duotone/src/index';
import * as boldIcons from '../bold/src/index';
import * as duotoneIcons from '../duotone/src/index';
import * as outlineIcons from '../outline/src/index';

describe('SolarIcons Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(boldIcons)).toMatchSnapshot();
    expect(Object.keys(boldDuotoneIcons)).toMatchSnapshot();
    expect(Object.keys(duotoneIcons)).toMatchSnapshot();
    expect(Object.keys(outlineIcons)).toMatchSnapshot();
  });
});
