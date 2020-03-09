export const TypingsBundlerStub = (): Record<string, { source(): string }> => {
  return {
    'foo.d.ts': {
      source: (): string => {
        return `export declare class HelloWorld {
  private readonly person;
  constructor(name: string);
  say(): void;
}`
      }
    },
    'person.d.ts': {
      source: (): string => {
        return `export declare class Person {
  private readonly name;
  constructor(name: string);
  getName(): string;
}`
      }
    },
    'fail.d.ts': {
      source: (): string => {
        return undefined as unknown as string;
      }
    }
  }
};
