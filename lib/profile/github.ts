import config from "lib/config";
const GITHUB_URL = "https://api.github.com";

export interface User {
  name: string;
  bio: string;
  avatarUrl: string;
  repositories: RepositoryConnection;
}

export interface RepositoryConnection {
  nodes: Repository[];
}

export interface Repository {
  name: string;
  languages: LanguageConnection;
}

export interface LanguageConnection {
  edges: LanguageEdge[];
}

export interface LanguageEdge {
  size: number;
  node: Language;
}

export interface Language {
  name: string;
  id: string;
  color: string;
}

export const gql = async (query: string) => {
  return await fetch(`${GITHUB_URL}/graphql`, {
    method: "Post",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `bearer ${config.githubAuth}`,
    },
  });
};
