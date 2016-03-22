'use strict'
var packageJson = require('./package.json');


fis.pcat({
  combo:!0,
  domain : {
      dev: '',
      qa: {
        'static': 'http://ue.pc.com.cn',
        'img': 'http://ueimg.pc.com.cn',
        'page':'http://pcat.pc.com.cn/qa/page',
        'tpl':'http://pcat.pc.com.cn/qa/tpl'
      },
      ol: {
        'static': 'http://ue.3conline.com',
        'img': 'http://ueimg.3conline.com',
        'page':'http://pcat.pc.com.cn/ol/page',
        'tpl':'http://pcat.pc.com.cn/ol/tpl'
      }
  },
  packageJson:packageJson
})

