import { readFileSync } from "fs";

const packageJson = JSON.parse(readFileSync("package.json"));

console.log("Dependencies:");
for (const dependencyName in packageJson.dependencies) {
  const dependencyVersion = packageJson.dependencies[dependencyName];
  const dependencyUrl = `https://www.npmjs.com/package/${dependencyName}`;
  console.log(`- [${dependencyName}](${dependencyUrl}) ${dependencyVersion}`);
}
