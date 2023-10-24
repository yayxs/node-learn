const fs = require('fs/promises')

;(async function () {
  const fileCont = await fs.readFile('./package.json', { encoding: 'utf-8' })
  console.log('fileCont', fileCont)
})()
