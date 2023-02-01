import glob from 'glob';
import * as esbuild from 'esbuild';
import {readFileSync, write, writeFile, writeFileSync} from 'fs';
import * as imageSize from 'image-size';
import externalGlobalPlugin from "esbuild-plugin-external-global";
import { networkInterfaces } from 'os';

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
console.log(results);


const packageJson = JSON.parse(readFileSync("package.json"));
const dependencies = packageJson.dependencies;
const peerDependencies = [];

var getDirectories = async function (src, callback) {
    return glob(src + "/**/*", callback);
};

getDirectories("sprites", (err, files)=>{
    const result = {};
    files.forEach(file=> {
        const nameParts = file.split(".");
        const extension = nameParts[nameParts.length-1];
        if (!imageSize.types.includes(extension))return;
        result[file] = imageSize.imageSize(file);
    });
    const imageMetaDataFilePath = "./src/metadata.ts";
    writeFileSync(imageMetaDataFilePath, "export const metadata:any = " + JSON.stringify(result));
})

const config = {
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
    },
    external: [
    ],
    plugins:[
        externalGlobalPlugin.externalGlobalPlugin({
            'phaser': 'window.Phaser',
            'pixi.js': 'window.PIXI'
          })
    ]
};

function build(config){
    config.watch = false;
    return esbuild.build(config).catch((e)=>{
        console.log(e);
        return process.exit(1);
    });
}

function watch(config){
    config.watch = false;
    return esbuild.serve({
        servedir:".",
        port:port
    }, config).catch((e)=>{
        console.log(e);
        return process.exit(1);
    });;
}

const port = 8004;
build(config).then(()=>{
    console.log(`Built game in ./dist`);
});

if (process.argv.length != 3 && process.argv[2] != "build"){
    results["local"] = "127.0.0.1"
    for(let nic in results){
        console.log(`Serving dev site at http://${results[nic]}:${port}/dist/index.html`);
    }
    watch(config);
}