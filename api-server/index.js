const  http = require('http')

const URL = require('url').URL // url 模块来获取请求路径和 GET 字符串


const  baseMongoDb = require('./lib/baseMongodb')()


/**
 * 创建http服务
 */
const server = http.createServer(async (req,res)=>{
  // 获取get参数
  console.log(req.url) // /v1/userinfos?user_ids=1001,1002
  console.log(req.headers.host) // 127.0.0.1:5000
  
  const myUrl = new URL(req.url,`http://${req.headers.host}`)
  /**
   * {
  href: 'http://127.0.0.1:5000/v1/userinfos?user_ids=1001,1002',
  origin: 'http://127.0.0.1:5000',
  protocol: 'http:',
  username: '',
  password: '',
  host: '127.0.0.1:5000',
  hostname: '127.0.0.1',
  port: '5000',
  pathname: '/v1/userinfos',
  search: '?user_ids=1001,1002',
  searchParams: URLSearchParams { 'user_ids' => '1001,1002' },
  hash: ''
}
   */
  // console.log(myUrl)
  if('/v1/userinfos' !== myUrl.pathname){
    return setResInfo(res,false,'path not found',null ,404)
  }

  // get 请求的参数
  const userIds = myUrl.searchParams.get('user_ids')
  console.log(userIds)
  if(!userIds){
    return setResInfo(res,false,'params error')
  }
  // 从 db 查询数据，并获取，有可能返回空数据
  const userInfo = await queryData({'id' : { $in : userIds.split(',')}});
  return setResInfo(res, true, 'success', userInfo);
})

/**
 * 启动服务
 */
 server.listen(5000, () => {
  console.log('server start http://127.0.0.1:5000');
});

async function queryData(queryOption){
  const client = await baseMongoDb.getClient();
  const collection = client.db("nodejs_cloumn").collection("user");
  const queryArr = await collection.find(queryOption).toArray();
  return queryArr;
}

function setResInfo(res, ret, message, dataInfo, httpStatus=200) {
  let retInfo = {};
  if(!ret) {
    retInfo = {
      'ret' : -1,
      'message' : message ? message : 'error',
      'data' : {}
    };
  } else {
    retInfo = {
      'ret' : 0,
      'message' : message ? message : 'success',
      'data' : dataInfo ? dataInfo : {}
    };
  }
  res.writeHead(httpStatus, { 'Content-Type': 'text/plain' });
  res.write(JSON.stringify(retInfo));
  res.end();
  return;
}