type Path = string;

interface BlogConfig {
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly entries: Path;
  readonly static: {[key: string]: Path};
  readonly pages: {[key: string]: Path};
  readonly templates: {[key: string]: Path};
  readonly options: {[key: string]: string}
}
