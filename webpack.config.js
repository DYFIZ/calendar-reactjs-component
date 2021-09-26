
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const port = process.env.PORT || 3000;

module.exports = {
    entry:'./src/index.js',
    module:{
        rules:[
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
              },

              {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'index_bundle.js'
    },
    plugins:[
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    mode:'development',
    devtool: 'inline-source-map',
    
}