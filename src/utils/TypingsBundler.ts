import { PluginConfig } from './PluginConfig';

export class TypingsBundler {
  constructor(private readonly config: PluginConfig) {}

  public make(typings: Record<string, any>): string {
    const {
      eof, excludedReferences, header, moduleName, useTabChar
    } = this.config;

    let   bundledTypings = '';
    let   first          = true;
    const tab            = useTabChar === true ? '\t' : '  '

    for (const filename in typings) {
      const file     = typings[filename];
      const contents = file.source() as string;

      const lines = this.validateFile(contents, tab, moduleName, excludedReferences);
      if (lines == undefined) {
        continue;
      }

      if (first === true) {
        first = false;
      } else {
        bundledTypings += '\n';
      }

      bundledTypings += lines.join('\n') + '\n';
    }

    if (header != undefined) {
      if (typeof header === 'string') {
        bundledTypings = header + '\n\n' + bundledTypings;
      } else {
        bundledTypings = header.join('\n') + '\n\n' + bundledTypings;
      }
    }

    if (typeof moduleName === 'string' && moduleName.length !== 0) {
      return `declare module ${moduleName}` + '\n{\n' + `${bundledTypings}}` + (eof || '\n');
    }

    return bundledTypings + (eof || '\n');
  }

  private validateFile(
    contents:            string | undefined,
    tab:                 string | undefined,
    moduleName?:         string,
    excludedReferences?: string[],
  ): string[] | undefined {
    if (contents == undefined || tab == undefined) {
      return undefined;
    }

    const lines = contents.split('\n');
    let i       = lines.length;

    while (i--) {
			const line  = lines[i];
      let exclude = line.length === 0;

      // exclude exports, imports and references
			exclude = exclude || line.includes(TypingsBundler.KEY_EXPORT)
			exclude = exclude || (/import ([a-z0-9A-Z_-]+) = require\(/).test(line);
			if(!exclude && excludedReferences && line.includes(TypingsBundler.KEY_REFERENCE)) {
        exclude = excludedReferences.some(ref => line.includes(ref));
      }

			if (exclude) {
        lines.splice(i, 1);
      } else {
        if (moduleName != undefined) {
          if (line.includes(TypingsBundler.KEY_DECLARE)) {
            lines[i] = line.replace(TypingsBundler.KEY_DECLARE, '');
          }
				  lines[i] = `${tab}${lines[i]}`
        }
			}
    }

    return lines
  }

  private static KEY_EXPORT: string    = 'export =';
  private static KEY_REFERENCE: string = '<reference';
  private static KEY_DECLARE: string   = 'declare '
}
