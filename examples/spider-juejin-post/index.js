const axios = require('axios')
const { URL_LINK } = require('./config')

async function getData() {
  const res = await axios.get(URL_LINK)
  console.log('--', res.data)
}
getData()
