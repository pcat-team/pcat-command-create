'use strict'
const path = require('path')
const fse  = require('fs-extra')
const fs   = require('fs')
const projectPath = fis.project.getProjectPath()
const siteReg = /\/(pc(?:online|auto|lady|house|baby|games))\/*/i
const site = siteReg.test(projectPath) ? RegExp.$1 : ''

if(!site)return fis.log.info('Can\'t find site dirname'.red.bold);
var __path = projectPath.split(`/${site}/`)
const dir  = __path[1]

var tempFn = function(fn){
  return fn.toString().replace(/.*?\/\*(.*?)\*\//gmi,'$1')
}
var packContent = {
  "name": "{{temp}}",
  "version": "0.0.1",
  "dir":dir,
  "site": site
}

exports.name = 'create <command> [options]'
// exports.usage = '<commad> [option]'
exports.desc = 'create dir , widget or page for deferant works'
exports.options = {
  '-w,--widget <widget name> ':'create widget',
  '-p,--page <page name> ':'create static page',
  '-c,--cms <cms page name>':'create cms page'
};
exports.run = function(argv, cli, env) {
  'use strict'
  if ((argv.h === true) || argv.help) {
    return cli.help(exports.name, exports.options);
  }
  var command = argv._
  var _name = argv.w || argv.widget
  var _page = argv.p || argv.page
  var _cms  = argv.c || argv.cms

  if(_name){ // 组件
    let dir = projectPath + '/'
    let wDir = path.resolve(dir,'./widget/'+_name + '/0.0.0')
    if(fs.existsSync(wDir))return fis.log.warn(`${_name} is exists\n` ,wDir.red.bold);
    ;[_name+'.html',_name+'.css',_name+'.js'].forEach(function(name){
    console.log(_name + name)
      fse.outputFile(path.resolve(dir,'./widget/'+_name + '/0.0.0/'+ name),'')
      fis.log.info(path.resolve(dir,'./widget/'+_name + '/0.0.0/'+ name).yellow.bold  + ' is created success!')
    })
  }else if(_page){ // page
    let dir = projectPath + '/'
    let pDir = path.resolve(dir,'./page/'+_page)
    if(fs.existsSync(pDir))return fis.log.warn(`${_page} is exists\n` ,wDir.red.bold);

    ;['.html','.css','.js'].forEach(function(name){
      let target = `./page/${_page}/${_page+name}`
      let read   = `temp/page/dev/dev${name}`
      
      fse.readFile(path.resolve(__dirname,read),function(err,data){
        err && fis.log.info(err.red.bold)
        fse.outputFile(path.resolve(dir,target),data)
        fis.log.info(path.resolve(dir,target).yellow.bold + ' is created success!')
      })
    })
  }else if(_cms){ // cms 类型
    let dir = projectPath + '/'
    let pDir = path.resolve(dir,'./page/'+_cms)
    if(fs.existsSync(pDir))return fis.log.warn(`${_cms} is exists\n` ,wDir.red.bold);
    ;['.html','.css','.js'].forEach(function(name){
      let target = `./page/${_cms}/${_cms+name}`
      let read   = `${(name === '.html' ? 'ctemp/page_cms' : 'temp/page/dev/dev')}${name}`
      fse.readFile(path.resolve(__dirname,read),function(err,data){
        err && fis.log.info(err.red.bold)
        fse.outputFile(path.resolve(dir,target),data)
        fis.log.info(path.resolve(dir,target).yellow.bold + ' is created success!')
      })
    })
  }else if(command[1]){ // 子系统
    // mkdirp([])
    let _name = command[1]
    let target = path.resolve(projectPath,_name)
    if(fs.existsSync(target))return fis.log.warn(`${_name} is exists\n` ,target.red.bold);
    fse.copy(path.resolve(__dirname,'temp'),target, function (err) {
      if (err) return fis.log.error(err)
      fis.log.info(_name.yellow.bold  + ' is created success!')
      packContent.name = _name
      fse.outputJson(path.resolve(target,'package.json'),packContent,function(err){
        if(err) return fis.log.error(path.resolve(target,'package.json').red.bold )
      })
    })
  }
  // console.log(command)
}