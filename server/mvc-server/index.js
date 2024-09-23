const http = require('http')


const URL = require('url').URL


const  querStr = require('querystring')


const rp = require('request-promise')

const baseFun = require('./util/baseFun')


const baseMogoDb = require('./lib/baseMongodb')()

const routerMap = {


    '/v1/contents':{
        'controller' : 'content',
        'method' : 'list'
    },
    '/v1/test':{
        'controller' : 'content',
        'method' : 'test'
    }
}

const server = http.createServer(async (req,res) =>{

} )
/**
 * 启动服务
 */
 server.listen(3000, () => {
    console.log('server start http://127.0.0.1:3000');
});
