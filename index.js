const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const mongodb = require('mongodb');
const mongodbclient = mongodb.MongoClient;
const port = process.env.PORT || 3000;
const mongourl = 'mongodb+srv://annu:annuk@123@cluster0.fxcgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
let db;

mongodbclient.connect(mongourl, (error, connection)=>{
    if(error) throw error;
    db = connection.db('internshipprogram')
    app.listen(port,(error)=>{
        console.log(`server is running${port}`)
        if(error) throw error;
    })
})

app.get('/',(req,res)=>{
    res.status(200).send("health ok");
})

app.get('/rest',(req,res)=>{
    db.collection('internshipprogram').find().toArray((error,result)=>{
        if(error) throw error;
        res.status(200).send(result)
    })
});
app.post('/city',(req,res) =>{
    db.collection('cities').insertMany(req.body,(error,result)=>{
        if (error) throw error;
        res.send("data inserted")
    })
  });
  app.get('/getCity',(req,res) =>{
      db.collection('location').find().toArray((error,result)=>{
        if(error) throw error;
        res.status(200).send(result) 
      })
  })
  
  app.get('/getCuisine',(req,res) =>{
    db.collection('cuisines').find().toArray((error,result)=>{
      if(error) throw error;
      res.status(200).send(result) 
    })
})

