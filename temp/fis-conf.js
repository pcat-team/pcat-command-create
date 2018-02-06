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
    // 具体的 babel 配置参数可以参考 https://developit.github.io/babel-legacy-docs/
    babelConfig: {}
})