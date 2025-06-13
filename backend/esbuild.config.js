const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: ['node18'],
  outfile: 'dist/index.js',
  alias: {
    '@src': './src',
    '@utils': './src/utils',
  },
}).catch(() => process.exit(1));