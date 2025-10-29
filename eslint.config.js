import { nextJsConfig } from "@grocery-repo/eslint-config/next-js";
import nextPlugin from "@next/eslint-plugin-next";

/** @type {import("eslint").Linter.Config[]} */
export default [
...nextJsConfig,
nextPlugin.configs["core-web-vitals"],
{
ignores: [".next/**"]
}
];
