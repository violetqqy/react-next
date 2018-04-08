'use strict';

const config = {};

config.global = {
  apiMicro: 'http://10.2.10.10/pci-micro/',
  apiUser: 'http://10.2.10.10/pci-user/',
  apiHealth: 'http://10.2.10.10/pro-health/',
  apiOperation: 'http://172.18.27.62:8080/pci-operation/',
  domain: 'http://10.2.101.149:3008',
  root: '/pci-wechat',
  filedir: '/Users/wangbing/project/pci-wechat-h5',
  appId: 'wxee8d9fc7f496d8b1',
  appSecret: '4ee061a42331ea76af1430e02e4f6fbe'
};

config.setRedirectUrl = (url, state) => {
  let uri = encodeURIComponent(url);
  let returnUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.global.appId}&redirect_uri=${uri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
  return returnUrl;
};

config.setCookies = (res, key, value) => {
  res.cookie(key, value, {
    maxAge: 7200000,
    httpOnly: true,
    signed: true
  });
};

config.renderClient = (req, res, callback) => {
  const openId = req.signedCookies.openId || '';
  const code = req.query.code || '';
  const redirect_uri = config.global.domain + req.path;
  if (openId || code) {
    console.log(`[${new Date()}][OPENID]: ${openId}`);
    console.log(`[${new Date()}][CODE]: ${code}`);
    callback();
  } else {
    console.log(`[${new Date()}][REURL]: ${redirect_uri}`);
    const reurl = config.setRedirectUrl(redirect_uri);
    return res.redirect(reurl);
  }
};

module.exports = config;
