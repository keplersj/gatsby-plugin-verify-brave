jest.mock("fs");

import { promises as fs } from "fs";
import { BuildArgs } from "gatsby";
import { onPostBuild } from "../gatsby-node";

const mockOnPostBuildArguments = ({
  reporter: {
    success: jest.fn()
  }
} as unknown) as BuildArgs;

describe("gatsby-plugin-verify-brave Gatsby Node API", () => {
  describe("onPostBuild hook", () => {
    it("throws if no plugin options are provided", async () => {
      await expect(
        onPostBuild!(mockOnPostBuildArguments, undefined)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"No options passed to gatsby-plugin-verify-brave! Please see usage in package README."`
      );
    });

    it("throws if no token is provided in plugin options", async () => {
      await expect(
        onPostBuild!(mockOnPostBuildArguments, { domain: "test.dev" } as any)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"No \`token\` passed to gatsby-plugin-brave! Please see usage in package README."`
      );
    });

    it("throws if no domain is provided in plugin options", async () => {
      await expect(
        onPostBuild!(mockOnPostBuildArguments, {
          token: "abcdefABCDEF0123456789"
        } as any)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"No \`domain\` passed to gatsby-plugin-brave! Please see usage in package README."`
      );
    });

    it("works as expected, given the correct options", async () => {
      await onPostBuild!(mockOnPostBuildArguments, {
        domain: "test.dev",
        token: "abcdefABCDEF0123456789"
      } as any);

      expect(fs.mkdir).toHaveBeenCalled();
      expect(((fs.mkdir as unknown) as jest.Mock).mock.calls)
        .toMatchInlineSnapshot(`
        Array [
          Array [
            "./public/.well-known",
            Object {
              "recursive": true,
            },
          ],
        ]
      `);

      expect(fs.writeFile).toHaveBeenCalled();
      expect(((fs.writeFile as unknown) as jest.Mock).mock.calls)
        .toMatchInlineSnapshot(`
        Array [
          Array [
            "public/.well-known/brave-rewards-verification.txt",
            "This is a Brave Rewards publisher verification file.

        Domain: test.dev
        Token: abcdefABCDEF0123456789",
          ],
        ]
      `);

      expect(mockOnPostBuildArguments.reporter.success).toHaveBeenCalled();
      expect(
        (mockOnPostBuildArguments.reporter.success as jest.Mock).mock.calls
      ).toMatchInlineSnapshot(`
        Array [
          Array [
            "Brave Rewards verification file created",
          ],
        ]
      `);
    });
  });
});
