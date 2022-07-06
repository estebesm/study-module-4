const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = function(paths) {

    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    minimize: false,
                                    outputStyle: 'expanded'
                                }

                            }
                        }
                    ]
                }
            ]
        }
    };
}