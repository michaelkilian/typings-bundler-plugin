export interface PluginConfig {
  out?: string
  excludedReferences?: string[]
  moduleName?: string
  useTabChar?: boolean
  eof?: '\n' | '\r\n';
  header?: string | string[]
}
