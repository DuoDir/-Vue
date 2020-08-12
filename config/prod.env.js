'use strict'

let params=process.argv[2];
let pathItem = "";

switch (params) {
  case "dev":
    pathItem = '"http://dev.olayc.cn"';//阿里云开发
    break;
  case "test":
    pathItem = '"http://test.olayc.cn"';//阿里云测试
    break;
  case "uat":
    pathItem = '"https://uat.olayc.cn"';//阿里云UAT
    break;
  case "prod":
    pathItem = '"https://prod.olayc.cn"';//阿里云生产
    break;
  default:
    pathItem = '"http://dev.olayc.cn"';//阿里云生产
    break;
}

module.exports = {
  NODE_ENV: '"production"',
  pathItem
}
