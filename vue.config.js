const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const name = 'SinoGear';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

const options = {
	antDir: path.join(__dirname, './node_modules/ant-design-vue'),
	stylesDir: path.join(__dirname, './src/themes'),
	varFile: path.join(__dirname, './src/themes/variables.less'),
	mainLessFile: path.join(__dirname, './src/themes/default/index.less'),
	themeVariables: [
		'@primary-color',
		'@sg-primary-color',
		'@sg-left-top-logo-title-color',
		'@sg-top-header-bg',
		'@sg-header-right-content-color',
		'@sg-global-menu-font-color',
		'@sg-global-menu-bg',
		'@sg-global-menu-item-selected-bg',
		'@sg-global-menu-item-selected-border-right-color',
		'@sg-global-menu-item-selected-font-color',
		'@sg-global-menu-item-hover-font-color',
		'@sg-global-menu-item-active-font-color',
		'@sg-global-menu-sub-bg',
		'@sg-sider-header-bg',
		'@sg-header-bg',
		'@sg-left-top-logo-bg',
	],
};

const proxy = {
	'/api/auth/password/login': {
		target: 'http://192.168.14.103:9008',
		changeOrigin: true,
	},
	'/captcha/render': {
		target: 'http://192.168.14.103:9008',
		changeOrigin: true,
    },
	'/api': {
		target: 'http://192.168.14.103:9008/leaf6-uni-cloud-uc-service', // 需改为真实后端
		changeOrigin: true,
	},
	'/api/micro-app/management': {
        target: 'http://192.168.13.100:8020', // 子应用[系统管理]后端接口地址, 根据实际情况按需配置, 如与主应用后端接口相同前缀，可不配置
        changeOrigin: true
    },
};

const hash = process.env.NODE_ENV === 'production' ? 'chunkhash:8' : 'hash:8';
const fileName = hash ? `[name]-[${hash}].js` : '[name].js';
const disableDynamicImport = true;

module.exports = {
	publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [path.resolve(__dirname, './src/themes/default.less')],
		},
	},
	devServer: {
		host: '0.0.0.0', // 允许外部ip访问
		port: 8000, // 端口
		disableHostCheck: true,
		compress: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		proxy: noProxy ? undefined : proxy,
	},
	css: {
		loaderOptions: {
			less: {
				lessOptions: {
					modifyVars: {},
					javascriptEnabled: true,
				},
			},
		},
	},
	configureWebpack(webpackConfig) {
		if (process.env.NO_CHUNK === 'false' || !disableDynamicImport) {
			// 配置第三方依赖包入口
			webpackConfig.entry.vendor = Object.keys(packageJson.dependencies); // 获取生产环境依赖库
			// 配置 chunk 输出的文件命名格
			webpackConfig.output.chunkFilename = fileName;
			webpackConfig.plugins.push(
				new webpack.optimize.CommonsChunkPlugin({
					name: ['vendor', 'runtime'],
					filename: fileName,
				})
			)
		}
		Object.assign(webpackConfig, {
			entry: {
				app: ['babel-polyfill', './src/main.js'],
			},
			name: name,
			// 开发生产共同配置
			resolve: {
				alias: {
					'@': path.resolve(__dirname, './src'),
					vue: 'vue/dist/vue.js',
					// '@c': path.resolve(__dirname, './src/components'),
					// '@p': path.resolve(__dirname, './src/pages')
				}, // 别名配置
			},
		});
		webpackConfig.module.rules.push({
			test: /\.js$/,
			loader: 'babel-loader',
			include: [path.resolve('node_modules/vcolorpicker')],
		});
		webpackConfig.plugins.push(
			new AntDesignThemePlugin(options),
			new webpack.DefinePlugin({
        'process.env': {
          'contextPath': JSON.stringify(process.env.contextPath),
          'mockContextPath': JSON.stringify(process.env.mockContextPath),
          'NO_PROXY': JSON.stringify(process.env.NO_PROXY)
        }
			}),
			new HtmlWebpackPlugin({
				inject: 'true',
				templateContent: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
              <meta name="renderer" content="webkit">
              <meta name="viewport" content="width=device-width,initial-scale=1.0">
              <link rel="icon" href="./favicon.png">
              <title>SinoGear For Vue</title>
              <script src="./config.js" type="text/javascript"></script>
            </head>
            <body>
              <noscript>
                <strong>We're sorry but 'SinoGear For Vue' doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
              </noscript>
              <div id="app"></div>
              <link rel="stylesheet/less" type="text/css" href="/color.less" />
              <script>
                window.less={ async: false, env: 'production' }
              </script>
              <script src="./less.min.js"></script>
            </body>
          </html>
        `,
			})
		)
	},
};
