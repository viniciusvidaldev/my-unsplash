import mongoose from "mongoose";

mongoose.connect('mongodb://root:root@localhost:27017/', {
  dbName: 'my_unsplash'
})
  .then(() => console.log('connected to database'))
  .catch(err => console.log(err))