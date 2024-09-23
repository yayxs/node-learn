const http = require('http')


const URL = require('url').URL


const  querStr = require('querystring')


const rp = require('request-promise')


const baseMogoDb = require('./lib/baseMongodb')()

const server = http.createServer(async( req,res)=>{
    const { url:reqUrl ,headers :{ host: headersHost } } = req
    const { pathname } = new URL(reqUrl,`http://${ headersHost}`)
    if('/v1/contents' !==pathname ){


        return
    }


    let contents = await  queryData({},{limit:10})
} )


/**
 * 
 * @description db 数据查询
 * @param object queryOption 
 */
 async function queryData(queryOption) {
    const client = await baseMongo.getClient();
    const collection = client.db("nodejs_cloumn").collection("content");
    const queryArr = await collection.find(queryOption).toArray();
    
    return queryArr;
  }