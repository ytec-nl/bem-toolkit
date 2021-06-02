const tsNode = require('ts-node');
const tsConfigPaths = require('tsconfig-paths');
const mainTSConfig = require('./tsconfig.json');
const testTSConfig = require('./tests/tsconfig.json');

tsConfigPaths.register({
    baseUrl: './test',
    paths: {
        ...mainTSConfig.compilerOptions.paths,
        ...testTSConfig.compilerOptions.paths,
    },
});

tsNode.register({
    files: true,
    transpileOnly: true,
    project: './tests/tsconfig.json',
});
