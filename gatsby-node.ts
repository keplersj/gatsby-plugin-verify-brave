import { stripIndent } from "common-tags";
import * as path from "path";
import * as fs from "fs";
import { promisify } from "util";
import { GatsbyNode } from "gatsby";
import mkdirp from "mkdirp";

const dirPath = "./public/.well-known";
const filePath = "brave-rewards-verification.txt";

interface PluginOptions {
  token?: string;
  domain?: string;
}

export const onPostBuild: GatsbyNode["onPostBuild"] = async (
  args,
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

  await promisify(mkdirp)(dirPath);

  const outputPath = path.join(dirPath, filePath);

  await promisify(fs.writeFile)(outputPath, content);

  args.reporter.success("Brave Rewards verification file created");
};
