import resolve    from 'rollup-plugin-node-resolve';
import commonjs   from 'rollup-plugin-commonjs';
import buble      from 'rollup-plugin-buble';
import multiEntry from 'rollup-plugin-multi-entry';
import json from 'rollup-plugin-json';
import pkg        from './package.json';

const { version, author, name, main, license, description } = pkg;

const banner = `\
/**
 * ${name} v${version}
 * ${description}
 *
 * @author ${author}
 * @license ${license}
 * @preserve
 */
`;

export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/lib-cjs.js',
    format: 'cjs'
  }
 }
//  ,{
//   input: 'src/index.js',
//   output: {
//     file: main,
//     name: 'lib',
//     sourcemap: true,
//     format: 'umd',
//     banner
//   },
//   plugins: [
//     resolve(),  // so Rollup can find external libs
//     commonjs(), // so Rollup can convert commonJS to an ES module
//     buble(),
//     json({
//       // All JSON files will be parsed by default,
//       // but you can also specifically include/exclude files
//       include: 'node_modules/**',
//       exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],

//       // for tree-shaking, properties will be declared as
//       // variables, using either `var` or `const`
//       preferConst: true, // Default: false

//       // specify indentation for the generated default export —
//       // defaults to '\t'
//       indent: '  '
//     })
//   ]
// }
// , {
//   input: 'src/index.js',
//   output: {
//     file: pkg.module,
//     name: 'lib',
//     sourcemap: true,
//     format: 'esm',
//     banner
//   },
//   plugins: [
//     resolve(),
//     commonjs(),
//     json({
//       // All JSON files will be parsed by default,
//       // but you can also specifically include/exclude files
//       include: 'node_modules/**',
//       exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],

//       // for tree-shaking, properties will be declared as
//       // variables, using either `var` or `const`
//       preferConst: true, // Default: false

//       // specify indentation for the generated default export —
//       // defaults to '\t'
//       indent: '  '
//     })
//   ]
// }
// , {
//   input: 'tests/**/*.spec.js',
//   output: {
//     file: 'dist/tests.bundle.js',
//     name: 'lib',
//     sourcemap: true,
//     format: 'iife',
//     banner,
//     globals: {
//       chai: 'chai',
//       it: 'it',
//       describe: 'describe'
//     }
//   },
//   external: ['chai', 'it', 'describe'],
//   plugins: [
//     resolve(),
//     commonjs(),
//     multiEntry(),
//     buble()
//   ]
// }
]
