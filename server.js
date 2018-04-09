'use strict'

const express = require('express')
const next = require('next')

const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const axios = require('axios')

const data = require('./data')

const port = parseInt(process.env.PORT, 10) || 3008
const dev = process.env.NODE_ENV !== 'production'

const config = dev ? require('./config/config.dev') : require('./config/config')
const myRoutes = require('./config/router.json')

const app = next({
  dev
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new express()
    const router = express.Router()

    server.use(bodyParser.json())
    server.use(cookieParser('pci-wechat-h5'))

    server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))

    server.use('/static', path.join(__dirname, 'static'))

    server.use(router.get('/api', (req, res) => {
      return res.send(data)
    }))

    server.use(router.get('/tel', (req, res) => {
      return res.send({
        code: 0
      })
    }))

    myRoutes.clientRouter.forEach(route => {
      server.use(router.get(route.path, (req, res) => {
        const openId = req.signedCookies.openId || ''
        const code = req.query.code || ''
        const redirect_uri = config.global.domain + req.path
        if (openId || code) {
          console.log(`[${new Date()}][OPENID]: ${openId}`)
          console.log(`[${new Date()}][CODE]: ${code}`)
          return handle(req, res)
        } else {
          console.log(`[${new Date()}][REURL]: ${redirect_uri}`)
          const reurl = config.setRedirectUrl(redirect_uri)
          return res.redirect(reurl)
        }
      }))
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.get('*', (req, res) => {
      const accessToken = req.signedCookies.accessToken || ''
      const code = req.params.code || ''
      const redirect_uri = req.baseUrl
    })

    // server.get('/p/:id', (req, res) => {
    //   console.log(req.headers.referer)
    //   const actualPage = '/post'
    //   const queryParams = {
    //     id: req.params.id
    //   }
    //   app.render(req, res, actualPage, queryParams)
    // })
    // server.get('/', (req, res) => {
    //   const openId = req.signedCookies.openId || ''
    //   const code = req.query.code || ''
    //   const redirect_uri = global.config.domain + req.originalUrl
    //   if (openId) {
    //     console.log('[oid]' + openId)
    //     app.render(req, res, req.originalUrl, {
    //       openId: openId
    //     })
    //   } else if (code) {
    //     console.log('[get]:' + code)
    //     axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${global.config.appId}&secret=${global.config.secret}&code=${code}&grant_type=authorization_code`)
    //       .then(r => r.json())
    //       .then(data => {
    //         console.log(data)
    //         setCookies(res, 'openId', data.openid)
    //         return handle(req, res)
    //       })
    //   } else {
    //     console.log('[url]' + redirect_uri)
    //     const reurl = setRedirectUrl(redirect_uri)
    //     res.redirect(reurl)
    //   }
    // })
    // server.use(async (ctx) => {
    //   await handle(ctx.req, ctx.res)
    //   ctx.respond = false
    // })
    // server.use(async (ctx, next) => {
    //   ctx.res.statusCode = 200
    //   await next()
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

module.exports = app
