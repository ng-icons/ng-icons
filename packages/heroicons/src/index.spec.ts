import * as outlineIcons from '@ng-icons/heroicons/outline';
import * as solidIcons from '@ng-icons/heroicons/solid';

describe('Heroicons Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(outlineIcons)).toMatchSnapshot();
    expect(Object.keys(solidIcons)).toMatchSnapshot();
  });
});
