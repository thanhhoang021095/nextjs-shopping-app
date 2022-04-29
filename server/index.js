require('dotenv').config();

const next = require('next')
const cacheableResponse = require('cacheable-response')
const express = require('express')
// const routes = require('../common/routes')
const cookieParser = require('cookie-parser')
// const config = require('../next.config');
// const configEnv = config.env;
// console.log(config.env);
const port = process.env.PORT || 6060
const dev = process.env.ENV_NAME === 'dev' ? 'true' : 'false'
const app = next({ dev })
const handler = app.getRequestHandler()
const path = require('path')

const ssrCache = cacheableResponse({
  ttl: 10000,
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams),
  }),
  send: ({ data, res }) => res.send(data),
})

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }))

    server.use(cookieParser())
    server.use(handler).listen(port)
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
