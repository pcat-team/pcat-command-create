'use strict'
var packageJson = require('./package.json');

fis.pcat({
  combo:!0,
  ssiDomain:{
  	// "/3g/pconline/xxxx/index.html":"http://g.pconline.com.cn"
  },
  domain : {
      dev: ''
  },
  api:{
    cmsUpLoad:""
  },
  packageJson:packageJson
})

