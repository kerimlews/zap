const path = require('path');
const webpack = require('webpack');
const flexbugs = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const isDebug = process.env.NODE_ENV !== 'production';

module.exports = (options) => ({
    entry: options.entry,
    output: Object.assign({
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/'
    }, options.output),

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: { url: true, importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => (isDebug
                                ? [flexbugs, autoprefixer()]
                                : [flexbugs, autoprefixer(), cssnano({ preset: 'default' })]
                            )
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { precision: 9 }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        mimetype: 'application/font-woff'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{ loader: 'file-loader' }]
            }
        ]
    },

    plugins: options.plugins.concat([
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            },
            API_BASE_URL: JSON.stringify('http://localhost:3000')
        }),

        new webpack.NamedModulesPlugin()
    ]),

    resolve: {
        modules: ['app', 'node_modules'],
        extensions: [
            '.js',
            '.jsx',
            '.react.js'
        ],
        mainFields: [
            'browser',
            'jsnext:main',
            'main'
        ]
    },

    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {}
});