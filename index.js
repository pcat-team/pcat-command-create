'use strict'
const path = require('path')
const fse = require('fs-extra')
const fs = require('fs')
const read = require("read");
const projectPath = fis.project.getProjectPath()
const siteReg = /\/(pc(?:online|auto|lady|house|baby|games))\/*/i
const site = siteReg.test(projectPath) ? RegExp.$1 : ''

if (!site) return fis.log.info('Can\'t find site dirname'.red.bold);
var __path = projectPath.split(`/${site}`)
const dir = __path[1]||"/"

var tempFn = function(fn) {
    return fn.toString().replace(/.*?\/\*(.*?)\*\//gmi, '$1')
}

var packContent = {
    "name": "{{temp}}",
    "version": "1.0.0",
    "dir": dir,
    "site": site
}

exports.name = 'create <command> [options]'
    // exports.usage = '<commad> [option]'
exports.desc = 'create dir , widget or page for deferant works'
exports.options = {
    '-w,--widget <widget name> ': 'create widget',
    '-p,--page <page name> ': 'create static page',
    '-c,--cms <cms page name>': 'create cms page'
};
exports.run = function(argv, cli, env) {
    'use strict'
    if ((argv.h === true) || argv.help) {
        return cli.help(exports.name, exports.options);
    }
    var command = argv._
    var _name = argv.w || argv.widget
    var _page = argv.p || argv.page
    var _cms = argv.c || argv.cms


    if (_name) { // 组件
        read({ prompt: "组件名: " }, function(er, widgetName) {
            if (!widgetName) {
                console.error("请输入组件名！")
            } else {
                read({ prompt: "版本号: ", default: "1.0.0" }, function(er, version) {
                    if (!version) {
                        console.error("请输入版本号！")
                    } else {
                        read({ prompt: "描述关键字: " }, function(er,des) {
                            if (!des) {
                                console.error("请输入描述关键字！")
                            } else {
                                read({ prompt: "开发者: " }, function(er, author) {
                                    if (!author) {
                                        console.error("请输入开发者！")
                                    } else {

                                         let wDir = path.resolve(projectPath,"widget",widgetName,version);

                                          // 已存在则不能创建
                                          if(fs.existsSync(wDir))return fis.log.warn(`${widgetName} is exists\n` ,wDir.red.bold);

                                          // 创建同名html,js,css以及package.json
                                          var packageContent = {
                                            name:widgetName,
                                            version:version,
                                            author:author,
                                            des:des
                                          }
                                          
                                          var oFiles = {
                                            package:{
                                              name:"package.json",
                                              content:JSON.stringify(packageContent,function(key,value){return value},10)
                                            }
                                            ,html:{
                                              name:widgetName+".html",
                                              content:""
                                            }
                                            ,js:{
                                              name:widgetName+".js",
                                              content:""
                                            }
                                            ,css:{
                                              name:widgetName+".css",
                                              content:""
                                            }
                                          }
                                          ;Object.keys(oFiles).forEach(function(file){
                                            var name = oFiles[file].name;
                                            console.log(name)
                                            fse.outputFile(path.resolve(wDir,name),oFiles[file].content)
                                            fis.log.info(path.resolve(wDir,name).yellow.bold  + ' is created success!')
                                          })

                                          
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })


    } else if (_page) { // page
        let dir = projectPath + '/'
        let pDir = path.resolve(dir, './page/' + _page)
        if (fs.existsSync(pDir)) return fis.log.warn(`${_page} is exists\n`, wDir.red.bold);

        ;
        ['.html', '.css', '.js'].forEach(function(name) {
            let target = `./page/${_page}/${_page+name}`
            let read = `temp/page/dev/dev${name}`

            fse.readFile(path.resolve(__dirname, read), function(err, data) {
                err && fis.log.info(err.red.bold)
                fse.outputFile(path.resolve(dir, target), data)
                fis.log.info(path.resolve(dir, target).yellow.bold + ' is created success!')
            })
        })
    } else if (_cms) { // cms 类型
        let dir = projectPath + '/'
        let pDir = path.resolve(dir, './page/' + _cms)
        if (fs.existsSync(pDir)) return fis.log.warn(`${_cms} is exists\n`, wDir.red.bold);;
        ['.html', '.css', '.js'].forEach(function(name) {
            let target = `./page/${_cms}/${_cms+name}`
            let read = `${(name === '.html' ? 'ctemp/page_cms' : 'temp/page/dev/dev')}${name}`
            fse.readFile(path.resolve(__dirname, read), function(err, data) {
                err && fis.log.info(err.red.bold)
                fse.outputFile(path.resolve(dir, target), data)
                fis.log.info(path.resolve(dir, target).yellow.bold + ' is created success!')
            })
        })
    } else if (command[1]) { // 子系统
        // mkdirp([])
        let _name = command[1]
        let target = path.resolve(projectPath, _name)
        if (fs.existsSync(target)) return fis.log.warn(`${_name} is exists\n`, target.red.bold);
        fse.copy(path.resolve(__dirname, 'temp'), target, function(err) {
            if (err) return fis.log.error(err)
            fis.log.info(_name.yellow.bold + ' is created success!')
            packContent.name = _name
            console.log(path.resolve(target, 'package.json'))
            fse.outputJson(path.resolve(target, 'package.json'), packContent, function(err) {
                if (err) return fis.log.error(path.resolve(target, 'package.json').red.bold)
            })
        })
    }
    // console.log(command)
}
