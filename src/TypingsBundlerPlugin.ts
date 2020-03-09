
import { ExtensionValidator } from "./utils/ExtensionValidator";
import { PluginConfig }       from "./utils/PluginConfig";
import { TypingsBundler }     from "./utils/TypingsBundler";

/* istanbul ignore next */
export = class TypingsBundlerPlugin {
  private readonly extensionValidator: ExtensionValidator;
  private readonly typingsBundler: TypingsBundler

  constructor(private readonly config: PluginConfig) {
    this.extensionValidator = new ExtensionValidator('.d.ts');
    this.typingsBundler     = new TypingsBundler(config);
  }

  apply(compiler: any): void {
    compiler.hooks.emit.tapAsync('TypingsBundlerPlugin', (compilation: any, callback: Function): void => {
      const typings: Record<string, any> = {};

      for (const filename in compilation.assets) {
        if (this.extensionValidator.check(filename)) {
          typings[filename] = compilation.assets[filename];
          delete compilation.assets[filename];
        }
      }

      const bundledTypings = this.typingsBundler.make(typings);

      compilation.assets[this.config.out || './build/types.d.ts'] = {
        source: (): string => {
          return bundledTypings;
        },
        size: (): number => {
          return bundledTypings.length;
        }
      };

      callback();
    });
  }
}
