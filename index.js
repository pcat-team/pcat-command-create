'use strict'
const path = require('path')
const fse = require('fs-extra')
const fs = require('fs')
const read = require("read");
const projectPath = fis.project.getProjectPath()
const siteReg = /\/(geeknev||pc(?:online|auto|lady|house|baby|games))\/((pc)|(wap))\//i
// 网站
const site = siteReg.test(projectPath + "/") ? RegExp.$1 : ''
// 客户端 pc or wap
const client = siteReg.test(projectPath + "/") ? RegExp.$2 : ''

var __path = projectPath.split(`/${site}/${client}/`)
const dir = __path[1] || ""

var tempFn = function (fn) {
    return fn.toString().replace(/.*?\/\*(.*?)\*\//gmi, '$1')
}


exports.name = 'create <command> [options]'
// exports.usage = '<commad> [option]'
exports.desc = '项目脚手架，快速创建系统、模块、组件、页面等'
exports.options = {
    '-s,--system ': '创建子系统',
    '-m,--module': '创建js和css模块',
    '-w,--widget': '创建组件',
    '-p,--page <页面名>': '创建普通页面模板',
    '-c,--pcms <页面名>': '创建cms页面模板',
    '-z,--pzt <页面名>': '创建专题页面模板',
    '--copy <复制>': '暂时只支持复制页面'

};
exports.run = function (argv, cli, env) {
    'use strict'
    if ((argv.h === true) || argv.help) {
        return cli.help(exports.name, exports.options);
    }


    var command = argv._

    // 子系统
    var _system = argv.s || argv.system;
    // 模块
    var _module = argv.m || argv.module;
    // 组件
    var _widget = argv.w || argv.widget;
    // 普通页面
    var _page = argv.p || argv.page;
    // cms页面
    var _cms = argv.c || argv.pcms;
    // 专题
    var _pzt = argv.z || argv.pzt;

    // 复制
    var copy = argv.copy;

    // 是否为子系统更目录
    var isRoot = fis.util.exists(process.cwd() + "/fis-conf.js");

    /**
     *  判断是否指定参数，默认为true，不通过，没指定则返回帮助信息
     * @param  {String} param 参数
     * @return {Boolean}  有指定参数则返回false
     */
    function check(param) {
        if (typeof param == "boolean") {
            fis.log.warn("未指定创建名称！")
            cli.help(exports.name, exports.options);
            return true;
        } else {
            return false;
        }

    }

    // 是否包含中文
    function isChina(s) {
        var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
        if (!patrn.exec(s)) {
            return false;
        } else {
            return true;
        }
    }

    function checkEmpty(val){
        if(!val){
            fis.log.warn("不能为空".red.bold);
            return true;
        }
    }
    if (_system) {

        if (isRoot) {
            fis.log.warn("请不要在子系统下创建子系统！".red.bold);
            return;
        }

        read({ prompt: "网站名（非中文）：", default: "pcauto"}, function (er, site) {
            if (er) {
                console.log('');
                return;
            }

            if(checkEmpty(site)) return;

            if (isChina(site)) {
                fis.log.warn("网站名不能包含中文！".red.bold);
                return;
            }

            console.log(site);

            read({ prompt: "类型（非中文，如pc、wap等）：" }, function (er, client) {
                if (er) {
                    console.log('');
                    return;
                }

                if(checkEmpty(client)) return;

                if (isChina(client)) {
                    fis.log.warn("类型名不能包含中文！".red.bold);
                    return;
                }

                console.log(client);

                read({ prompt: "项目名（非中文）：" }, function (er, project) {
                    if (er) {
                        console.log('');
                        return;
                    }
                    if(checkEmpty(project)) return;

                    if (isChina(project)) {
                        fis.log.warn("项目名不能包含中文！".red.bold);
                        return;
                    }

                    console.log(project);

                    // 生成发布路径md5
                    const dir = (Math.random()*1e16 + new Date().getTime()).toString();
                    const base64 =  fis.util.base64(dir);

                    var packContent = {
                        "name": project,
                        "version": "1.0.0",
                        "site": site,
                        "client": client,
                        "base64":base64,
                        "dir": '',
                        "dependencies": {
            
                        }
                    }
            
                    // mkdirp([])
                    let target = path.resolve(projectPath, project)
                    if (fs.existsSync(target)) return fis.log.warn(target, `子系统:${project} 已存在！\n`.red.bold);
            
                    fse.copy(path.resolve(__dirname, 'temp'), target, function (err) {
                        if (err) return fis.log.error(err)
                        fis.log.info("子系统:" + project + ' 创建成功！'.green.bold)
                        console.log(path.resolve(target, 'package.json'))
                        fse.outputJson(path.resolve(target, 'package.json'), packContent, function (err) {
                            if (err) return fis.log.error(path.resolve(target, 'package.json').red.bold)
                        })
                    })



                })

            })

        })


        return;

        if (check(_system)) return;

        if (isChina(_system)) {
            fis.log.warn("子系统不能包含中文！".red.bold);
            return;
        }

        if (!site) {
            fis.log.warn("请在各网指定目录下创建子系统！".red.bold);
            return;
        }

        if (isRoot) {
            fis.log.warn("请不要在子系统下创建子系统！".red.bold);
            return;
        }


        var packContent = {
            "name": "{{temp}}",
            "version": "1.0.0",
            "client": client,
            "dir": dir,
            "site": site,
            "dependencies": {

            }
        }

        // mkdirp([])
        let target = path.resolve(projectPath, _system)
        if (fs.existsSync(target)) return fis.log.warn(target, `子系统:${_system} 已存在！\n`.red.bold);

        fse.copy(path.resolve(__dirname, 'temp'), target, function (err) {
            if (err) return fis.log.error(err)
            fis.log.info("子系统:" + _system + ' 创建成功！'.green.bold)
            packContent.name = _system
            console.log(path.resolve(target, 'package.json'))
            fse.outputJson(path.resolve(target, 'package.json'), packContent, function (err) {
                if (err) return fis.log.error(path.resolve(target, 'package.json').red.bold)
            })
        })


    } else {
        if (!site) {
            fis.log.warn("请在各网指定目录下创建！".red.bold);
            return;
        }

        if (!isRoot) {
            fis.log.warn("请在子系统根目录下创建！".red.bold);
            return;
        }


        // 创建模块
        if (_module) {


            read({ prompt: "模块类型(js or css or ui): " }, function (er, type) {

                if (er) {
                    console.log('');
                    return;
                }

                // 只能创建js或css模块
                type = type.toLowerCase();

                if (type == "js" || type == "css" || type == "ui") {


                    read({ prompt: "模块名（非中文）: " }, function (er, moduleName) {
                        if (er) {
                            console.log('');
                            return;
                        }
                        if (!moduleName) {
                            console.error("请输入模块名！")
                        } else {

                            if (isChina(moduleName)) {
                                fis.log.warn("模块名不能包含中文！".red.bold);
                                return;
                            }

                            // 如果是纯js或css模块，模块名前加上 “j” 或 “c”前缀

                            moduleName = type.substr(0, 1) + "-" + moduleName;


                            read({ prompt: "描述关键字: " }, function (er, des) {
                                if (er) {
                                    console.log('');
                                    return;
                                }
                                if (!des) {
                                    console.error("请输入描述关键字");
                                } else {
                                    read({ prompt: "开发者: " }, function (er, author) {
                                        if (er) {
                                            console.log('');
                                            return;
                                        }
                                        if (!author) {
                                            console.error("请输入开发者！")
                                        } else {

                                            let wDir = path.resolve(projectPath, "modules", moduleName);

                                            // 已存在则不能创建
                                            if (fs.existsSync(wDir)) return fis.log.warn(`模块：${moduleName} 已存在！\n`, wDir.red.bold);

                                            // 创建同名html,js,css以及package.json
                                            var packageContent = {
                                                name: moduleName,
                                                version: "1.0.0",
                                                author: author,
                                                main: moduleName + "." + (type == "ui" ? "js" : type),
                                                des: des
                                            }

                                            // 需要创建的文件列表
                                            var oFiles = {
                                                package: {
                                                    name: "package.json",
                                                    content: JSON.stringify(packageContent, function (key, value) {
                                                        return value
                                                    }, 10)
                                                }
                                            };

                                            // 有模板、样式、交互功能的模块
                                            if (type == "ui") {
                                                oFiles.file1 = {
                                                    name: moduleName + ".js",
                                                    content: ""
                                                }

                                                oFiles.file2 = {
                                                    name: moduleName + ".css",
                                                    content: ""
                                                }

                                                oFiles.tpl = {
                                                    name: moduleName + ".tpl",
                                                    content: ""
                                                }


                                                // 纯js或css模块
                                            } else {

                                                oFiles.file1 = {
                                                    name: moduleName + "." + type,
                                                    content: ""
                                                }
                                            }


                                            Object.keys(oFiles).forEach(function (file) {
                                                var name = oFiles[file].name;
                                                console.log(name)
                                                fse.outputFile(path.resolve(wDir, name), oFiles[file].content)
                                                fis.log.info("模块:" + path.resolve(wDir, name) + ' 创建成功！'.green.bold)
                                            })


                                        }
                                    })
                                }
                            })
                        }
                    })

                } else {
                    fis.log.info("请指定需要创建的模块文件类型！".red.bold);
                    return;
                }


            });

        }




        // 创建组件
        else if (_widget) {

            read({ prompt: "组件名（非中文）: " }, function (er, widgetName) {
                if (er) {
                    console.log('');
                    return;
                }


                if (!widgetName) {
                    console.error("请输入组件名！")
                } else {

                    if (isChina(widgetName)) {
                        fis.log.warn("组件名不能包含中文！".red.bold);
                        return;
                    }

                    read({ prompt: "版本号: ", default: "1.0.0" }, function (er, version) {
                        if (er) {
                            console.log('');
                            return;
                        }
                        if (!version) {
                            console.error("请输入版本号！")
                        } else {
                            read({ prompt: "描述关键字: " }, function (er, des) {
                                if (er) {
                                    console.log('');
                                    return;
                                }
                                if (!des) {
                                    console.error("请输入描述关键字！")
                                } else {
                                    read({ prompt: "开发者: " }, function (er, author) {
                                        if (er) {
                                            console.log('');
                                            return;
                                        }
                                        if (!author) {
                                            console.error("请输入开发者！")
                                        } else {

                                            let wDir = path.resolve(projectPath, "widget", widgetName, version);

                                            // 已存在则不能创建
                                            if (fs.existsSync(wDir)) return fis.log.warn(`组件:${widgetName} 已存在`.red.bold, wDir);

                                            // 创建同名html,js,css以及package.json
                                            var packageContent = {
                                                name: widgetName,
                                                version: version,
                                                author: author,
                                                des: des
                                            }

                                            var oFiles = {
                                                package: {
                                                    name: "package.json",
                                                    content: JSON.stringify(packageContent, function (key, value) {
                                                        return value
                                                    }, 10)
                                                },
                                                html: {
                                                    name: widgetName + ".html",
                                                    content: ""
                                                },
                                                js: {
                                                    name: widgetName + ".js",
                                                    content: ""
                                                },
                                                css: {
                                                    name: widgetName + ".css",
                                                    content: ""
                                                }
                                            };
                                            Object.keys(oFiles).forEach(function (file) {
                                                var name = oFiles[file].name;
                                                console.log(name)
                                                fse.outputFile(path.resolve(wDir, name), oFiles[file].content)
                                                fis.log.info(("组件:" + widgetName + ' 创建成功！\n\n').green.bold, path.resolve(wDir, name))
                                            })


                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })


        }

        // 创建页面
        else if (_page || _cms || _pzt) {



            let page = _page || _cms || _pzt;

            if (check(page)) return;

            if (isChina(page)) {
                fis.log.warn("页面名字不能包含中文！".red.bold);
                return;
            }

            let dir = projectPath + '/'
            let pDir = path.resolve(dir, './page/' + page)
            if (fs.existsSync(pDir)) return fis.log.warn(`页面:${page} 已经存在\n`.red.bold, pDir);

            let targetPath = __dirname;

            var tplFiles = {
                html: "temp/page/dev/dev.html",
                js: "temp/page/dev/dev.js",
                css: "temp/page/dev/dev.css"
            }



            // cms页面
            if (_cms) {

                tplFiles.html = "ctemp/tpl.html";

            }

            // 专题页面
            if (_pzt) {

                tplFiles.html = `ztemp/${site}/tpl.html`;
                tplFiles.js = `ztemp/${site}/tpl.js`;
                tplFiles.css = `ztemp/${site}/tpl.css`;

            }

            if (copy) {

                targetPath = dir;

                if (!fs.existsSync(`${targetPath}page/${copy}`)) {

                    fis.log.warn(`复制的页面[${targetPath}page/${copy}]不存在`.yellow.bold);
                    return;
                }

                tplFiles.html = `page/${copy}/${copy}.html`;
                tplFiles.js = `page/${copy}/${copy}.js`;
                tplFiles.css = `page/${copy}/${copy}.css`;
            }





            Object.keys(tplFiles).forEach(function (name) {

                let to = `./page/${page}/${page + "." + name}`;
                let read = `${tplFiles[name]}`;




                let targetFile = path.resolve(targetPath, read);

                if (!fs.existsSync(targetFile)) return;

                fse.readFile(targetFile, function (err, data) {
                    if (err) {
                        return fis.log.info(err);
                    }

                    fse.outputFile(path.resolve(dir, to), data)
                    fis.log.info(`${page}.${name} 创建成功！\n`.green.bold, path.resolve(dir, to))
                })
            })



        } else {
            return cli.help(exports.name, exports.options);
        }


    }


}