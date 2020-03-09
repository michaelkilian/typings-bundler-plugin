export class ExtensionValidator {
  constructor(private readonly extension: string) {}

  public check(filename: string | undefined): boolean {
    return filename == undefined || this.extension.length === 0
      ? false
      : filename.indexOf(this.extension) === filename.length - this.extension.length;
  }
}
