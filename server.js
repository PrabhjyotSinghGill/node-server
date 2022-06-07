const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/echo/:para', (req, res) => {
    res.send('Echo! '+req.params.para+' '+[1,2,3])
  })

app.get('/dob/:date/:month/:year', (req, res) => {
    res.send(req.params)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
