type Path = string;

interface BlogConfig {
  readonly title: string;
  readonly author: string;
  readonly entries: Path;
  readonly static: {[key: string]: Path};
  readonly pages: {[key: string]: Path};
  readonly templates: {[key: string]: Path};
}
