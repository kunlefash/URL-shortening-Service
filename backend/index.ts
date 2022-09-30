const express = require("express")
const app = express()

// Database config
const connection = require('./config/db')
connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

// Routes Config
app.use(express.json({
  extended: false
})) //parse incoming request body in JSON format.
app.use('/', require('./routes/redirect'))
app.use('/api/url', require('./routes/url'))


app.listen(6511, ()=> {
  console.log("Backend server is running on port 6511 " );
});
export { };