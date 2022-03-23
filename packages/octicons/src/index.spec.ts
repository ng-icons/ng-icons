import * as icons from './index';
import * as smallIcons from '@ng-icons/octicons/small';
import * as largeIcons from '@ng-icons/octicons/large';

describe('Octicons Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(icons)).toMatchSnapshot();
    expect(Object.keys(smallIcons)).toMatchSnapshot();
    expect(Object.keys(largeIcons)).toMatchSnapshot();
  });
});
