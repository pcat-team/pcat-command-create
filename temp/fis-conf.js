'use strict'
var packageJson = require('./package.json');


fis.pcat({
  combo:!0,
  domain : {
      dev: '',
      qa: '',
      ol: ''
  },
  packageJson:packageJson
})

