'use strict'
var packageJson = require('./package.json');

fis.pcat({
    combo: !0,
    ssiDomain: {
        // "/3g/pconline/xxxx/index.html":"http://g.pconline.com.cn"
    },
    domain: {
        dev: ''
    },
    api: {
        cmsUpLoad: ""
    },
    packageJson: packageJson,
    // 自动给 css 属性添加前缀，让标准的 css3 支持更多的浏览器.
    // 详细配置参考:https://github.com/ai/browserslist#queries
    autoprefixerConfig: {
        "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
        "cascade": true
    },
    // es6、es7 或者 jsx 编译成 es5
    // 默认开启了 preset-2015 preset-stage-3 preset-react
    // https://github.com/fex-team/fis-parser-babel-6.x
    babelConfig: {},

    // typescript 编译成js
    // https://github.com/fex-team/fis3-parser-typescript
    typescriptConfig: {
        // 解析 <xml> 为对应的 react 语句。如果设置 1, 则保留
        jsx: 2,
        // 如果要提示所有提示信息，请开启
        showNotices: false,
        // 1: commonjs
        // 2: amd
        // 3: umd
        // 4: system
        module: 1,
        // 0: es3
        // 1: es5
        // 2: es6
        target: 0,
        // 配置是否输出 sourcemap
        sourceMap: false
    },
    // 压缩 js 代码。
    // https://github.com/fex-team/fis-optimizer-uglify-js
    uglifyJsConfig: {

    },

    // 压缩 css 代码 配置
    //https://github.com/fex-team/fis-optimizer-clean-css
    cleanCssConfig: {},
})