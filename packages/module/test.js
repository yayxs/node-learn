// is test.js

require('./test2')
console.log(module)
process.nextTick(() => {
  console.log(module)
})
