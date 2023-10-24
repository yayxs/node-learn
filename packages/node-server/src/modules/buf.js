
const fs = require('fs')
const str = `hello world`

// const buf = new Buffer(str)


/**
 * 字符串-->Buffer 编码
 */
const buf =  Buffer.from(str,'utf8');

console.log(buf) // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>


console.log(buf.toString('hex')) // 68656c6c6f20776f726c64
console.log(buf.toString('base64')) // aGVsbG8gd29ybGQ=

const rs =  fs.createReadStream('test.md');

let data = ''

rs.on('data',(chunk)=>{
    data += chunk
})

rs.on('end',()=>{
    console.log(data)
})

// console.log(rs)