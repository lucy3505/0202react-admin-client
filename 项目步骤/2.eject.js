/* 

npm run eject
eject出来之后只有一个webpack.config.js。不再区分为dev和prod两个配置文件。

首先安装 antd,less,less-loader
npm install antd
npm install less less-loader

eject CRA新建的项目
config目录下的文件如下：


 

image.png
修改webpack.config.js
首先配置less module
在cssRegex和sassRegex附近(line 42左右)添加如下代码

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

再找到使用cssRegex的代码位置(line 460左右）添加如下代码

{
             test: lessRegex,
             // exclude: lessModuleRegex,
             exclude: /node_modules/,
             use: getStyleLoaders(
               {
                 modules: true,
                 importLoaders: 3,
                 // javascriptEnabled: true,
                 sourceMap: isEnvProduction
                   ? shouldUseSourceMap
                   : isEnvDevelopment
               },
               "less-loader"
             ),
             // Don't consider CSS imports dead code even if the
             // containing package claims to have no side effects.
             // Remove this when webpack adds a warning or an error for this.
             // See https://github.com/webpack/webpack/issues/6571
             sideEffects: true
           },
           {
             test: lessRegex,
             // exclude: lessModuleRegex,
             include: /node_modules/,
             use: getStyleLoaders(
               {
                 importLoaders: 3,
                 // javascriptEnabled: true,
                 sourceMap: isEnvProduction
                   ? shouldUseSourceMap
                   : isEnvDevelopment
               },
               "less-loader"
             ),
           },
           
           // Adds support for CSS Modules, but using SASS
           // using the extension .module.scss or .module.sass
           {
             test: lessModuleRegex,
             use: getStyleLoaders(
               {
                 importLoaders: 3,
                 sourceMap: isEnvProduction
                   ? shouldUseSourceMap
                   : isEnvDevelopment,
                 modules: true,
                 getLocalIdent: getCSSModuleLocalIdent
               },
               "less-loader"
             )
           },

注意上面的less-loader配置了2次，第一次主要是为了exclude antd。从而可以正确加载antd的样式。

修改getStyleLoaders方法
当前版本CRA生成的webpack.config.js文件加载css loader等都是通过getStyleLoaders方法（line74左右）实现的。但这个方法有点小问题，像上面那样配置了第二个参数“less-loader”,并没有被该方法使用。所以如下修改改方法

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap,
          modifyVars: { '@primary-color': '#2577E0' },
          javascriptEnabled: true,
        },
      });
    }
    return loaders;
  };

增加了最后的if (preprocessor)的判断，触发less-loader及antd修改主题的相关配置。
到这里webpack的相关配置修改就完成了。
最后：

Antd的按需加载
npm install babel-plugin-import

先安装babel插件
然后在项目的根目录下（就是和package.json相同的层级）新建文件babel.config.js，里面的内容如下

module.exports = {
  plugins: [
    ["import", { libraryName: "antd", style: true}] // `style: true` 会加载 less 文件
  ]
};

以上，Create-React-App新建项目，引入antd及按需加载，使用less作为业务代码的样式文件，并实现css模块化配置完成。

 */