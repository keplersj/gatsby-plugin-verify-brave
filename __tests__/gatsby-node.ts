jest.mock("fs");

import mkdirp from "mkdirp";
import { writeFile } from "fs";
import { BuildArgs } from "gatsby";
import { onPostBuild } from "../gatsby-node";

const mockOnPostBuildArgs = ({
  reporter: {
    success: jest.fn()
  }
} as unknown) as BuildArgs;

describe("gatsby-plugin-verify-brave Gatsby Node API", () => {
  describe("onPostBuild hook", () => {
    it("throws if no plugin options are provided", async () => {
      await expect(
        onPostBuild!(mockOnPostBuildArgs, undefined)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"No options passed to gatsby-plugin-verify-brave! Please see usage in package README."`
      );
    });

    it("throws if no token is provided in plugin options", async () => {
      await expect(
        onPostBuild!(mockOnPostBuildArgs, { domain: "test.dev" } as any)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"No \`token\` passed to gatsby-plugin-brave! Please see usage in package README."`
      );
    });

    it("throws if no domain is provided in plugin options", async () => {
      await expect(
        onPostBuild!(mockOnPostBuildArgs, {
          token: "abcdefABCDEF0123456789"
        } as any)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"No \`domain\` passed to gatsby-plugin-brave! Please see usage in package README."`
      );
    });

    it("works as expected, given the correct options", async () => {
      await onPostBuild!(mockOnPostBuildArgs, {
        domain: "test.dev",
        token: "abcdefABCDEF0123456789"
      } as any);

      expect(mkdirp).toHaveBeenCalled();
      expect(((mkdirp as unknown) as jest.Mock).mock.calls)
        .toMatchInlineSnapshot(`
        Array [
          Array [
            "./public/.well-known",
            [Function],
          ],
        ]
      `);

      expect(writeFile).toHaveBeenCalled();
      expect(((writeFile as unknown) as jest.Mock).mock.calls)
        .toMatchInlineSnapshot(`
        Array [
          Array [
            "public/.well-known/brave-rewards-verification.txt",
            "This is a Brave Rewards publisher verification file.

        Domain: test.dev
        Token: abcdefABCDEF0123456789",
            [Function],
          ],
        ]
      `);

      expect(mockOnPostBuildArgs.reporter.success).toHaveBeenCalled();
      expect((mockOnPostBuildArgs.reporter.success as jest.Mock).mock.calls)
        .toMatchInlineSnapshot(`
        Array [
          Array [
            "Brave Rewards verification file created",
          ],
        ]
      `);
    });
  });
});
