const app = require('./app')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path/win32')
process.on('uncaughtException',err => {
  console.log("UNCAUGHT EXCEPTION! SHUTTING DOWN...");
  console.log(err.name, err.message);
})
const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" })

const port = process.env.PORT || 3000
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)
mongoose.connect(DB, {
  useNewUrlParser: true,
})
  .then(() => 'database connection established')
  .catch((err) => console.log("ERROR"))
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
})
process.on('unhandledRejection', err => {
  console.log("UNHANDLED REJECTION SHUTTING DOWN...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  })
})
