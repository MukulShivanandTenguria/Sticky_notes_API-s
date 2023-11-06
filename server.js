const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:"./config.env"})

const port =process.env.PORT || 3000
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)
mongoose.connect(DB,{
  useNewUrlParser: true,
}).then(() => 'database connection established')
app.listen(port,()=>{
  console.log(`App running on port ${port}`);
})