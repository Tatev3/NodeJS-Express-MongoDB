 const express = require('express')
 const mongoose = require('mongoose')
 const path = require('path')
 const app = express ( )
 const exphbs = require('express-handlebars')
 const todoRoutes = require('./routes/todos')
 const dotenv = require('dotenv').config()

 
 
 const hbs = exphbs.create({
   defaultLayout: 'main',
   extname: 'hbs'
 })

 app.engine('hbs', hbs.engine)
 app.set('view engine', 'hbs')
 
 
 app.set('views', 'views')
 app.use(express.urlencoded({ extended: true }))
 app.use(express.static(path.join(__dirname, 'public')))
 
 app.use(todoRoutes)
async function start() {
  try {
    await mongoose.connect(
      //for security reasons added link in the env file. This is the link: 'mongodb+srv://tatevkarapetyan1291:K3xsOhDiA7vk8Ogk@cluster0.wydr61z.mongodb.net/MongoDBToDo' 
      process.env.MONGODB_URL, {
      pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT + '...');
    });
  } catch (e) {
    console.log(e)
  }
}

start()