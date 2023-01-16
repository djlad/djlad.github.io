import glob from 'glob';
import * as esbuild from 'esbuild';
import {readFileSync} from 'fs';

const packageJson = JSON.parse(readFileSync("package.json"));
const dependencies = packageJson.dependencies;
const peerDependencies = [];

var getDirectories = async function (src, callback) {
    return glob(src + "/**/*.ts", callback);
};

getDirectories("src", (er, dirs)=>{
    const phaser = 'node_modules/phaser/dist/phaser.js';
    dirs.push(phaser);
    build(dirs);
});
function build(dirs){
    esbuild.build(
    {
        entryPoints: ["src/game.ts"],
        bundle: true,
        // outdir: "./dist",
        outfile: "./dist/game.mjs",
        watch: true,
        // external: Object.keys(dependencies??[]).concat(Object.keys(peerDependencies??[])),
        sourcemap: true,
        target: ["chrome107"],
        logLevel: 'info',
        format:'iife',
        platform: "browser",
        define: {
            // "module":"global.module",
            // "exports":"global.exports"
        },
        external: [
            // "node_modules/phaser/dist/phaser.js"
            // "node_modules/phaser/src/phaser.js"
            // "phaser.js"
        ]
    }).catch((e)=>{
        console.log(e);
        return process.exit(1);
    });
}