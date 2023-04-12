const fs = require('fs');

fs.readFile('package.json', (err, data) => {
  if (err) throw err;

  const packageJson = JSON.parse(data);
  const dependencies = packageJson.dependencies;

  console.log('Dependencies:');
  for (const dependencyName in dependencies) {
    const dependencyVersion = dependencies[dependencyName];
    const dependencyUrl = `https://www.npmjs.com/package/${dependencyName}`;
    console.log(`- [${dependencyName}](${dependencyUrl}) ${dependencyVersion}`);
  }
});
