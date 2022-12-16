const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;  
const htmlText = `
  <!doctype html>
    <html>
      <head>
        <title>node test</title>
      </head>
      <body>
        <h1>hello</h1>
        <h4>express </h4>
      </body>
    </html>
`
app.get('/', (req, res) => {
  res.send(htmlText)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://${hostname}:${port}/`)
})