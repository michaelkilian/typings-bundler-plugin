import { ExtensionValidator } from '../src/utils/ExtensionValidator';

describe('ExtensionValidator', (): void => {
  let sut: ExtensionValidator;

  beforeEach((): void => {
    sut = new ExtensionValidator('.d.ts');
  });

  it('checkFailedBecauseOfEmptyExtension', (): void => {
    sut = new ExtensionValidator('');

    const valid = sut.check('bundle.d.ts');

    expect(valid).toBeFalsy();
  });

  it('checkFailedBecauseOfUndefinedFilename', (): void => {
    const valid = sut.check(undefined);

    expect(valid).toBeFalsy();
  });

  it('checkIsValid', (): void => {
    const valid = sut.check('bundle.d.ts');

    expect(valid).toBeTruthy();
  })
});
