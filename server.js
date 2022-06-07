const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/echo/:para', (req, res) => {
    res.send('Echo!'+req.params.para)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
