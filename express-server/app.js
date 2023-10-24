// 引入express 模块
const express = require('express');
const utility = require('utility')

// 调用express实例 一个函数
const app = express();

const APP_PORT  =3000

/**
 * handler 函数
 */

app.get('/',(request ,response)=>{
  const {  q } = request.query
  console.log(q)


  const val  =utility.md5(q)
  response.send(val)
})

app.listen(APP_PORT, () => {
  console.log(`http://localhost:${APP_PORT}`);
});


// app.use(async (req,res,next)=>{
//     console.log('first')
//    await  next()

//     console.log('first-end')
// })

// app.use((req,res,next)=>{
//     console.log('sec')
//     next()

//     console.log('sec-end')
// })


// app.use (async (req,res,next)=>{
//     console.log('async')
//     await next()
//     await new Promise( (resolve)=>{
//         setTimeout(()=>{
//             console.log(`wait`)
//         },1000)
//     } )

//     console.log('async end');
// } )


// app.use((req,res,next)=>{
//     console.log('third')
//     next()

//     console.log('third-end')
// })

// app.get('/',(req,res)=>res.send('hello'))


// const  http = require('http')

// const url = require('url')

// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const passport = require('passport');


// // 引入users.js
// const users = require('../routes/api/users');
// const profiles = require('../routes/api/profiles');

// // DB config
// const db = require('../config/keys').mongoURI;

// // 使用body-parser中间件
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Connect to mongodb
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // passport 初始化
// app.use(passport.initialize());

// require('../config/passport')(passport);

// // 使用routes
// app.use('/api/users', users);
// app.use('/api/profiles', profiles);

// const port = process.env.PORT || 3000;


/**
 * 创建http服务
 */
// const server = http.createServer(async (req,res)=>{
//   // 获取get参数
//   const pathname  = url.parse(req.url).pathname
// })