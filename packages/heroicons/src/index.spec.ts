import * as microIcons from '@ng-icons/heroicons/micro';
import * as miniIcons from '@ng-icons/heroicons/mini';
import * as outlineIcons from '@ng-icons/heroicons/outline';
import * as solidIcons from '@ng-icons/heroicons/solid';

describe('Heroicons Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(outlineIcons)).toMatchSnapshot();
    expect(Object.keys(solidIcons)).toMatchSnapshot();
    expect(Object.keys(microIcons)).toMatchSnapshot();
    expect(Object.keys(miniIcons)).toMatchSnapshot();
  });
});
