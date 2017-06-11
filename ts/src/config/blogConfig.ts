type Path = string;

interface BlogConfig {
  readonly title: string;
  readonly entries: Path;
  readonly pages: {[key: string]: Path};
  readonly templates: {[key: string]: Path};
}
