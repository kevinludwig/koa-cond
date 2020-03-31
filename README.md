### koa-cond

Conditionally run middleware in Koa 2

### Install

```
npm install --save koa-cond
```

### API 

* `condition` a function which receives koa context and returns boolean
* `ifMiddleware` middleware to run if condition returns true
* `elseMiddleware` (optional) middleware to run if condition returns false

### Usage

```
const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    rawBody = require('koa-rawbody'),
    cond = require('koa-cond');

const app = Koa();

const rawBody = (ctx, next) => {
    /* capture request as buffer */
}

app.use(cond(
    (ctx) => ctx.request.is('application/octet-stream'),
    rawBody,
    bodyParser
));

// routes, etc.

app.listen(3000);
```

### License 

MIT

