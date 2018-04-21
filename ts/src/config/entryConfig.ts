interface EntryConfig {
  readonly title: string;
  readonly description: string;
  readonly path: Path;
  readonly draft: boolean;
  readonly template: string;
  readonly tags: string[];
  readonly publishOn: string;
}
