import express  from "express"
const app = express()
const port = 8080

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

app.get('/', (req, res) => {
  res.status(200).send('server is up');
})