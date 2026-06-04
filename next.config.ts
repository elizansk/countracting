import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const githubPagesBasePath = "/countracting";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubActions ? githubPagesBasePath : undefined,
  assetPrefix: isGithubActions ? githubPagesBasePath : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? githubPagesBasePath : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
