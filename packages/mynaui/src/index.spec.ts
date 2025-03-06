import * as icons from '../outline/src/index';
import * as solidIcons from '../solid/src/index';

describe('Mynaui Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(icons)).toMatchSnapshot();
    expect(Object.keys(solidIcons)).toMatchSnapshot();
  });
});
