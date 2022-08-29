const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')






connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(
  bodyParser.urlencoded({
      extended: false
  })
);


//Available routes
app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))



app.get("/", (req, res) => {
  res.send('Hello Ashutosh!')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})