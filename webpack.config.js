const path = require('path');
const {merge} = require('webpack-merge');
const pug = require('./webpack/pug');
const devServer = require('./webpack/devServer');
const sass = require('./webpack/sass');
const images = require('./webpack/images');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")

const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
}
const PAGES_DIR = `${path.resolve(__dirname, "src")}/entries/`;
const PAGES_DIRS = fs.readdirSync(PAGES_DIR).map(dir => `${path.resolve(__dirname, "src")}/entries/${dir}`);

const PAGES = PAGES_DIRS.map(dir => ({
    filenames: fs.readdirSync(dir).filter(filename => filename.endsWith(".pug")),
    path: dir
}));

const res = [];


PAGES.forEach(page => page.filenames.forEach(filename => {
    res.push( new HtmlWebpackPlugin({
        chunks: [filename.substring(0, filename.length-4)],
        filename: `${filename.replace(/\.pug/, '.html')}`,
        template: `${page.path}/${filename}`,
        minify: false
    }));
}));

const common = merge([
    {
        mode: "production",
        optimization: {
            minimize: false
        },
        entry: {
            "index": PATHS.source + "/entries/index/index.js",
        },
        output: {
            path: PATHS.build,
            filename: "[name].js"
        },
        plugins: [
            new MiniCssExtractPlugin({

            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: "src/assets",
                        to: "assets" ,
                        noErrorOnMissing: true // disable ERROR: unable to locate
                    }
                ],
            }),
            ...res
        ],
    },
    pug(),
    sass(),
    //fonts(),
    images()
]);

module.exports = function (env, argv){
    if(argv.mode === "production"){
        return common;
    }
    if(argv.mode === "development"){
        return merge([
            common,
            devServer()
        ]);
    }
}