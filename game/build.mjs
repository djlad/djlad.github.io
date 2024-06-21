import glob from 'glob';
import * as esbuild from 'esbuild';
import {fstat, readFileSync, write, writeFile, writeFileSync, rmSync, mkdirSync} from 'fs';
import * as imageSize from 'image-size';
import externalGlobalPlugin from "esbuild-plugin-external-global";
import { networkInterfaces } from 'os';
import * as http from 'http';
import * as sourcemap from 'source-map';

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
    watch: false,
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
    // config.watch = false;
    return esbuild.build(config).catch((e)=>{
        console.log(e);
        return process.exit(1);
    });
}

function watch(config){
    // config.watch = false;
    return esbuild.serve({
        servedir:".",
        port:port
    }, config).catch((e)=>{
        console.log(e);
        return process.exit(1);
    });;
}

async function applySourceMap(stacktrace) {
    const matches = stacktrace.match(/http:\/\/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}:\d{0,4}\/dist\/[^\s]*:\d+:\d+/gm);
    if (matches == null) return stacktrace;
    let convertedtrace = stacktrace;
    await Promise.all(matches.map(async match=>{
        const url = match.match(/http:\/\/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}:\d{0,4}\/dist\/[^\s:]*?(?=:)/gm)[0];
        const linecolumn = match.replace(/http:\/\/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}:\d{0,4}\/dist\/[^\s]*?:/, "");
        const [line, column] = linecolumn.split(":");
        const sourcemapurl = url.replace(".mjs", ".mjs.map")
        const response = await fetch(sourcemapurl)
        const text = await response.text()
        const smc = await sourcemap.SourceMapConsumer.with(text, null, consumer => consumer); 
        const original = smc.originalPositionFor({
            line: parseInt(line),
            column: parseInt(column)
        })
        const converted = `${original.source}:${original.line}:${original.column}`
        convertedtrace = convertedtrace.replace(match, converted);        
    }));
    return convertedtrace;
}

function customServer(){
    const requestListener = function (req, res) {
        let body = ""
        req.on("data", (chunk)=>{
            body += chunk;
        })
        req.on("end",async ()=>{
            console.log(await applySourceMap(body));
            // You can also set using the following method
            res.setHeader('Access-Control-Allow-Origin', '*'); /* @dev First, read about security */
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
            res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
            res.setHeader('Access-Control-Allow-Headers', 'content-type'); 
            res.writeHead(200);
            res.end("Received request");
        })
    };
    const server = http.createServer(requestListener);
    server.listen(port+1, null, ()=>{
        console.log("Custom server started")
    });
}

const port = 8004;
const host = ""
// build(config).then(()=>{
    // console.log(`Built game in ./dist`);
// });

if (process.argv[2] === "lib"){
    console.log("Building library");
    const libEntryPoint = "src/index.ts";
    const allEntryPoints = [];
    rmSync("lib", {recursive:true});
    mkdirSync("lib");
    getDirectories("src", (err, matches)=>{
        const tsMatches = matches.filter(m=>m.endsWith(".ts"))
            .filter(m=>m !== "src/game.ts");
        const relativeMatches = tsMatches.map(m=>m.replace("src/", "./").replace(".ts", ""));
        const exportLines = relativeMatches.map(match=>`export * from "${match}";`).join("\n");
        writeFile(libEntryPoint, exportLines, ()=>{
            esbuild.build({
                entryPoints: [libEntryPoint],
                outfile: 'lib/index.js',
                bundle: true,
                sourcemap: true,
                // minify: true,
                // splitting: true,
                format: 'esm',
                target: ['esnext'],
                plugins:[
                    externalGlobalPlugin.externalGlobalPlugin({
                        'phaser': 'window.Phaser',
                        'pixi.js': 'window.PIXI'
                      })
                ]
            }).catch((e)=>{
                console.log(e);
                return process.exit(1);
            });
        })
    })
}
else if (process.argv.length != 3 && process.argv[2] != "build"){
    results["local"] = "127.0.0.1"
    for(let nic in results){
        console.log(`Serving dev site at http://${results[nic]}:${port}/dist/index.html`);
    }
    watch(config);
    customServer();
}