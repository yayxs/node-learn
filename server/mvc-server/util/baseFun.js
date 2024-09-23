/**
 * 统一化响应的数据
 * @param {*} res 
 * @param {*} code 
 * @param {*} message 
 * @param {*} dataInfo 
 * @param {*} httpStatus 
 */
function setResInfo(res,ret,message,dataInfo,httpStatus = 200){
    let retInfo = {}
    if(ret){
        retInfo = {
            code:0,
            message: message || 'success',
            data:dataInfo || {}
        }
    }else{
        retInfo = {
            code:-1,
            message: message || 'error',
            data:{}
        }
    }
    res.writeHead(httpStatus, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(retInfo));
    res.end();
    return;
}

module.exports ={
    setResInfo
}

