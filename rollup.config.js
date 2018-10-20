const fs = require('fs');
const path = require('path');
const babel = require('rollup-plugin-babel');
import {uglify} from 'rollup-plugin-uglify';

const license = require('rollup-plugin-license');
const {name} = require('./package.json');

const base = __dirname;
const src = path.resolve(base, 'src');
const dist = path.resolve(base, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist)
}

function defaultPlugins() {
    return [
        babel({
            plugins: ['external-helpers']
        }),
        uglify({
            sourcemap: true,
            // numWorkers: 1,
        }),
        license({
            // sourceMap: true,
            // cwd: '.', // Default is process.cwd()

            banner: `<%= pkg.name %> v<%= pkg.version %>
(c) <%= moment().format('YYYY') %> <%= pkg.author %>
Released under the <%= pkg.license %> License.`,
        }),
    ]
}

let plugins = defaultPlugins();
plugins.splice(1, 1);

let productionPlugins = defaultPlugins();

let configs = [
    {
        input: path.resolve(src, 'index.js'),
        // external: Object.keys(dependencies),
        plugins,
        output: {
            format: 'iife',
            file: path.resolve(dist, name + '.js'),
            sourcemap: true
        },
    }
];

if (process.env.NODE_ENV === 'production') {
    let newConfigs = [
        {
            input: path.resolve(src, 'index.js'),
            plugins: productionPlugins,
            output: {
                format: 'iife',
                file: path.resolve(dist, name + '.min.js'),
                sourcemap: true
            },
        }
    ];
    configs.push(...newConfigs);
}

module.exports = configs;