import { TypingsBundler }     from '../src/utils/TypingsBundler';
import { TypingsBundlerStub } from './Fixtures/TypingsBundlerStub';

describe('DeclarationBundler', (): void => {
  let sut: TypingsBundler;

  beforeEach((): void => {
    sut = new TypingsBundler({
      eof: '\n',
      moduleName: 'unleashed'
    })
  });

  it('bundleWithModuleName', (): void => {
    const data = sut.make(TypingsBundlerStub());

    expect(data).not.toBeUndefined();
    expect(data.length).toBeGreaterThan(0);
  });

  it('bundleWithoutModuleName', (): void => {
    sut = new TypingsBundler({
      eof: '\n'
    });

    const data = sut.make(TypingsBundlerStub());

    expect(data).not.toBeUndefined();
    expect(data.length).toBeGreaterThan(0);
  });

  it('bundleWithBasicStringHeader', (): void => {
    sut = new TypingsBundler({
      eof: '\n',
      header: '// a simple test'
    });

    const data = sut.make(TypingsBundlerStub());

    expect(data).not.toBeUndefined();
    expect(data.length).toBeGreaterThan(0);
  });

  it('bundleWithHeaderBuiltFromAnArrayOfStrings', (): void => {
    sut = new TypingsBundler({
      eof: '\n',
      header: [
        '// this is a',
        '// simple test'
      ]
    });

    const data = sut.make(TypingsBundlerStub());

    expect(data).not.toBeUndefined();
    expect(data.length).toBeGreaterThan(0);
  });
});
