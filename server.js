// const koa = require('koa') const router = require('koa-route')
const express = require('express')
const next = require('next')

var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var axios = require('axios')

const data = require('./data')

const port = parseInt(process.env.PORT, 10) || 3008
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

function setRedirectUrl(url, state) {
  let uri = encodeURIComponent(url);
  let returnUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${global.config.appId}&redirect_uri=${uri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
  return returnUrl;
}

function setCookies(res, key, value) {
  res.cookie(key, value, {
    maxAge: 7200000,
    httpOnly: true,
    signed: true
  });
}

// function renderApp(res, req, pagePath) {   const openId =
// request.signedCookies.openId || ''   // const code = req.query.code || ''
// const redirect_uri = req.href.split('?')[0]   if (openId) {
// console.log('[oid]' + openId)     app.render(req, res)     // }     //  else
// if (code) {     //   console.log('[get]:' + code)     //   axios     //
// .get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${global.config
// .
// appId}&secret=${global.config.secret}&code=${code}&grant_type=authorization_c
// o de`)     //     .then(r => r.json())     //     .then(data => {     //
// console.log(data)     //       setCookies(res, 'openId', data.openid)     //
// return handle(req, res)     //     })   } else {     console.log('[url]' +
// redirect_uri)     const reurl = setRedirectUrl(redirect_uri)
// res.redirect(reurl)   } }

app
  .prepare()
  .then(() => {
    const server = new express()
    const router = express.Router()

    server.use(bodyParser.json());
    server.use(cookieParser('pci-wechat-h5'));

    server.use(router.get('/api', (req, res) => {
      return res.send(data)
    }))

    server.use(router.get('/', (req, res) => {
      const openId = req.signedCookies.openId || '';
      const code = req.query.code || '';
      console.log(req);
      const redirect_uri = global.config.domain + req.path;
      if (openId || code) {
        console.log('[oid]' + openId)
        console.log('[cod]' + code)
        return handle(req, res)
      } else {
        console.log('[url]' + redirect_uri)
        const reurl = setRedirectUrl(redirect_uri)
        return res.redirect(reurl)
      }
    }))

    server.use(router.get('/login', (req, res) => {
      const openId = req.signedCookies.openId || '';
      const code = req.query.code || '';
      console.log(req);
      const redirect_uri = global.config.domain + req.path;
      if (openId || code) {
        console.log('[oid]' + openId)
        console.log('[cod]' + code)
        return handle(req, res)
      } else {
        console.log('[url]' + redirect_uri)
        const reurl = setRedirectUrl(redirect_uri)
        return res.redirect(reurl)
      }
    }))

    server.get('*', (req, res) => {
      return handle(req, res)
    })
    // server.get('*', (req, res) => {    const accessToken =
    // req.signedCookies.accessToken || ''   const code = req.params.code || ''
    // const redirect_uri = req.baseUrl }) server.get('/p/:id', (req, res) => {
    // console.log(req.headers.referer)   const actualPage = '/post'   const
    // queryParams = {     id: req.params.id   }   app.render(req, res, actualPage,
    // queryParams) }) server.get('/', (req, res) => {   const openId =
    // req.signedCookies.openId || ''   const code = req.query.code || ''   const
    // redirect_uri = global.config.domain + req.originalUrl   if (openId) {
    // console.log('[oid]' + openId)     app.render(req, res, req.originalUrl,
    // {openId: openId})   } else if (code) {     console.log('[get]:' + code) axios
    // .get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${global.config
    // .
    // appId}&secret=${global.config.secret}&code=${code}&grant_type=authorization_c
    // o de`)       .then(r => r.json())       .then(data => { console.log(data)
    // setCookies(res, 'openId', data.openid) return handle(req, res)       }) }
    // else {     console.log('[url]' + redirect_uri)     const reurl =
    // setRedirectUrl(redirect_uri) res.redirect(reurl)   } }) server.use(async
    // (ctx) => {   await handle(ctx.req, ctx.res)   ctx.respond = false })
    // server.use(async (ctx, next) => {   ctx.res.statusCode = 200   await next()
    // })

    server.listen(port, (err) => {
      if (err) 
        throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.log(ex.stack)
    process.exit(1)
  })

  module.exports = app;