module.exports = (cond, ifMiddleware, elseMiddleware) => {
    return async (ctx, next) => {
        if (cond(ctx)) {
            await ifMiddleware(ctx, next);
        } else if (elseMiddleware) {
            await elseMiddleware(ctx, next);
        } else {
            await next();
        }
    };
}
