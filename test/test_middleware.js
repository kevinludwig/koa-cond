const Koa = require('koa'),
    request = require('supertest'),
    cond = require('../');

describe('test middleware', async () => {
    let app;
    beforeEach(() => {
        app = new Koa();
    });

    it('should execute ifMiddleware', async () => {
        app.use(cond(ctx => ctx.request.is('application/json'),
            (ctx) => { ctx.body = {type: 'json'} },
            (ctx) => { ctx.body = {type: 'other'} }));
        await request(app.listen())
            .post('/')
            .send({foo: 'bar'})
            .expect({type: 'json'});
    });

    it('should execute else middleware', async () => {
        app.use(cond((ctx) => ctx.request.is('application/octet-stream'),
            (ctx) => { ctx.body = {type: 'octet'} },
            (ctx) => { ctx.body = {type: 'json'} }));
        await request(app.listen())
            .post('/')
            .send({foo: 'bar'})
            .expect({type: 'json'});
    });

    it('should execute next middleware when else not present', async () => {
        app.use(cond((ctx) => ctx.request.is('application/octet-stream'),
            (ctx) => { ctx.body = {type: 'octet'} }));
        app.use(async (ctx) => {
            ctx.body = 'woot woot';
        });
        await request(app.listen())
            .post('/')
            .send({foo: 'bar'})
            .expect('woot woot');
    });
});
