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
    autoprefixerConfig: {
        "browsers": ["Android >= 4.1", "iOS >= 9", "ie >= 8", "firefox >= 50"],
        "cascade": true
    },
    // es6、es7 或者 jsx 编译成 es5
    // 默认开启了 preset-2015 preset-stage-3 preset-react
    babelConfig: {},
})