import { stripIndent } from "common-tags";
import * as path from "path";
import { promises as fs } from "fs";
import { GatsbyNode } from "gatsby";

const directionPath = "./public/.well-known";
const filePath = "brave-rewards-verification.txt";

interface PluginOptions {
  token?: string;
  domain?: string;
}

export const onPostBuild: GatsbyNode["onPostBuild"] = async (
  arguments_,
  pluginOptions
) => {
  const options = pluginOptions as PluginOptions;

  if (!pluginOptions) {
    throw new Error(
      "No options passed to gatsby-plugin-verify-brave! Please see usage in package README."
    );
  }
  if (!pluginOptions.token) {
    throw new Error(
      "No `token` passed to gatsby-plugin-brave! Please see usage in package README."
    );
  }
  if (!pluginOptions.domain) {
    throw new Error(
      "No `domain` passed to gatsby-plugin-brave! Please see usage in package README."
    );
  }

  const content = stripIndent`
    This is a Brave Rewards publisher verification file.

    Domain: ${options.domain}
    Token: ${options.token}

    `;

  await fs.mkdir(directionPath, { recursive: true });

  const outputPath = path.join(directionPath, filePath);

  await fs.writeFile(outputPath, content);

  arguments_.reporter.success("Brave Rewards verification file created");
};
