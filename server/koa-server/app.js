
const Koa = require('koa')

const app = new Koa()


app.use( async (ctx,next)=>{
    console.log(`==1`)
    await next()

    console.log(`==5`)
} )



/**
 * 异步中间件
 */
 app.use(async (ctx, next) => {
    console.log('==2');
    await next();
    await new Promise(
        (resolve) => 
            setTimeout(
                () => {
                    console.log(`==3`);
                    resolve()
                }, 
            1000
        )
    );
    console.log('==4');
});

app.use( async (ctx,next)=>{
   ctx.body = `hello koa`
} )

app.listen(3000, () => console.log(`Example app listening on port 3000!`));